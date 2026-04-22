import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { AprovarOrcamentoClient } from "@/components/orcamento/AprovarOrcamentoClient"

export default async function AprovarOrcamentoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const orcamento = await db.orcamento.findFirst({
    where: { linkAprovacao: token },
    include: {
      itens: true,
      user: {
        select: {
          name: true,
          email: true,
          nomeEmpresa: true,
          cnpj: true,
          logoUrl: true,
          telefone: true,
        },
      },
    },
  })

  if (!orcamento) notFound()

  return <AprovarOrcamentoClient orcamento={orcamento as any} />
}
