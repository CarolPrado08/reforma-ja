import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { DashboardClient } from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, orcamentosCreditos: true, tipo: true, nomeEmpresa: true },
  })

  const orcamentos = await db.orcamento.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { itens: true },
  })

  return <DashboardClient orcamentos={orcamentos} user={user} />
}
