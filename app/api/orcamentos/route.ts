import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { orcamentoSchema } from "@/lib/validations"
import { calcularOrcamento } from "@/lib/orcamento-calculator"
import { PLAN_LIMITS } from "@/lib/subscription"
import { randomBytes } from "crypto"

function nanoid(size: number): string {
  return randomBytes(size).toString("base64url").slice(0, size)
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const orcamentos = await db.orcamento.findMany({
    where: { userId: session.user.id },
    include: { itens: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orcamentos)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, orcamentosCreditos: true, tipo: true },
  })

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  // Check limits for FREE users
  if (user.plan === "FREE") {
    const count = await db.orcamento.count({ where: { userId: session.user.id } })
    if (count >= PLAN_LIMITS.FREE.orcamentos && user.orcamentosCreditos <= 0) {
      return NextResponse.json({ error: "LIMIT_REACHED", creditos: 0 }, { status: 402 })
    }
    if (count >= PLAN_LIMITS.FREE.orcamentos && user.orcamentosCreditos > 0) {
      await db.user.update({
        where: { id: session.user.id },
        data: { orcamentosCreditos: { decrement: 1 } },
      })
    }
  }

  const body = await req.json()
  const parsed = orcamentoSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 })

  const data = parsed.data
  const calc = calcularOrcamento(data.tipoServico, data.metragem, data.regiao, data.margemImprevisto)
  const modo = user.tipo ?? "MORADOR"

  const orcamento = await db.orcamento.create({
    data: {
      userId: session.user.id,
      modo,
      nomeCliente: data.nomeCliente || null,
      telefoneCliente: data.telefoneCliente || null,
      comodo: data.comodo,
      tipoServico: data.tipoServico,
      metragem: data.metragem,
      regiao: data.regiao,
      margemImprevisto: data.margemImprevisto,
      totalMateriais: calc.totalMateriais,
      totalMaoDeObra: calc.totalMaoDeObra,
      totalGeral: calc.totalGeral,
      linkAprovacao: modo === "PROFISSIONAL" ? nanoid(16) : null,
      itens: {
        create: [
          {
            nome: `Material - ${data.tipoServico}`,
            tipo: "MATERIAL",
            quantidade: data.metragem,
            unidade: "m²",
            precoUnitario: calc.totalMateriais / data.metragem,
            total: calc.totalMateriais,
          },
          {
            nome: `Mão de obra - ${data.tipoServico}`,
            tipo: "MAO_DE_OBRA",
            quantidade: data.metragem,
            unidade: "m²",
            precoUnitario: calc.totalMaoDeObra / data.metragem,
            total: calc.totalMaoDeObra,
          },
        ],
      },
    },
    include: { itens: true },
  })

  return NextResponse.json(orcamento, { status: 201 })
}
