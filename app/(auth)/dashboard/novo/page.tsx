import { OrcamentoForm } from "@/components/forms/OrcamentoForm"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function NovoOrcamentoPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, orcamentosCreditos: true, tipo: true, empresaConfigurada: true },
  })

  if (!user) redirect("/login")

  if (user.tipo === "PROFISSIONAL" && !user.empresaConfigurada) {
    redirect("/settings/empresa")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{color:"#2C2C2A"}}>Novo Orçamento</h1>
      <OrcamentoForm user={user} modo={user.tipo ?? "MORADOR"} />
    </div>
  )
}
