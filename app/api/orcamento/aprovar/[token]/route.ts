import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const orcamento = await db.orcamento.findFirst({
    where: { linkAprovacao: token },
    include: { itens: true, user: { select: { name: true, email: true } } },
  })

  if (!orcamento) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(orcamento)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const body = await req.json()
  const { action } = body // "APROVADO" | "RECUSADO"

  const orcamento = await db.orcamento.updateMany({
    where: { linkAprovacao: token },
    data: { status: action },
  })

  return NextResponse.json({ updated: orcamento.count })
}
