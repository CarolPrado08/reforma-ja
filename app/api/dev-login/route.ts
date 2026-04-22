import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { randomBytes } from "crypto"

// Apenas em desenvolvimento
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  const tipo = (req.nextUrl.searchParams.get("tipo") ?? "MORADOR") as "MORADOR" | "PROFISSIONAL"
  const email = `dev-${tipo.toLowerCase()}@localhost.dev`

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: tipo === "PROFISSIONAL" ? "Dev Profissional" : "Dev Morador",
      plan: "PRO",
      tipo,
      empresaConfigurada: tipo === "PROFISSIONAL",
      nomeEmpresa: tipo === "PROFISSIONAL" ? "Empresa Teste Ltda" : null,
      cnpj: tipo === "PROFISSIONAL" ? "00.000.000/0001-00" : null,
      telefone: tipo === "PROFISSIONAL" ? "(11) 99999-9999" : null,
    },
  })

  // Cria sessão no banco (padrão do PrismaAdapter)
  const sessionToken = randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias

  await db.session.upsert({
    where: { sessionToken },
    update: {},
    create: { sessionToken, userId: user.id, expires },
  })

  const res = NextResponse.redirect(new URL("/dashboard", req.url))
  res.cookies.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
  })

  return res
}
