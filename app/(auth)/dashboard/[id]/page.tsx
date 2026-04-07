import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import { OrcamentoDetailClient } from "@/components/dashboard/OrcamentoDetailClient"

export default async function OrcamentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { id } = await params
  const orcamento = await db.orcamento.findFirst({
    where: { id, userId: session.user.id },
    include: { itens: true },
  })

  if (!orcamento) notFound()

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  })

  return <OrcamentoDetailClient orcamento={orcamento as any} userPlan={user?.plan ?? "FREE"} />
}
