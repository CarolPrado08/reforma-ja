import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { EmpresaClient } from "@/components/settings/EmpresaClient"

export default async function EmpresaPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { tipo: true, nomeEmpresa: true, cnpj: true, telefone: true, logoUrl: true, empresaConfigurada: true },
  })

  if (!user) redirect("/login")
  if (user.tipo !== "PROFISSIONAL") redirect("/dashboard")

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#2C2C2A" }}>Minha empresa</h1>
        <p className="text-gray-500 text-sm mt-1">
          Dados que aparecem nas suas propostas e PDFs profissionais.
        </p>
      </div>
      <EmpresaClient empresa={user} isFirstSetup={!user.empresaConfigurada} />
    </div>
  )
}
