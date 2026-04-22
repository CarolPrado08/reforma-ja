import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { tipo } = await req.json()
  if (tipo !== "MORADOR" && tipo !== "PROFISSIONAL") {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 })
  }

  const user = await db.user.update({
    where: { id: session.user.id },
    data: { tipo },
  })

  return NextResponse.json({ tipo: user.tipo })
}
