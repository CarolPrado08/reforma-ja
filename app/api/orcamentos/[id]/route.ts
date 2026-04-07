import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const orcamento = await db.orcamento.findFirst({
    where: { id, userId: session.user.id },
    include: { itens: true },
  })

  if (!orcamento) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(orcamento)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const orcamento = await db.orcamento.updateMany({
    where: { id, userId: session.user.id },
    data: { status: body.status },
  })

  return NextResponse.json({ updated: orcamento.count })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.orcamento.deleteMany({
    where: { id, userId: session.user.id },
  })

  return NextResponse.json({ deleted: true })
}
