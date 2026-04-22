import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const empresaSchema = z.object({
  nomeEmpresa: z.string().min(1, "Nome da empresa é obrigatório"),
  cnpj: z.string().optional(),
  telefone: z.string().optional(),
  logoUrl: z.string().url().optional().or(z.literal("")),
})

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = empresaSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 })

  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      ...parsed.data,
      logoUrl: parsed.data.logoUrl || null,
      empresaConfigurada: true,
    },
    select: { nomeEmpresa: true, cnpj: true, telefone: true, logoUrl: true, empresaConfigurada: true },
  })

  return NextResponse.json(user)
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { nomeEmpresa: true, cnpj: true, telefone: true, logoUrl: true, empresaConfigurada: true },
  })

  return NextResponse.json(user)
}
