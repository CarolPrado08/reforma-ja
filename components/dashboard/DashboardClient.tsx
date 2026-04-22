"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, FileText, Clock, CheckCircle, XCircle, Send, Building2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  RASCUNHO: { label: "Rascunho", color: "#6B7280", icon: Clock },
  ENVIADO:  { label: "Enviado",  color: "#3B6D11", icon: Send },
  APROVADO: { label: "Aprovado", color: "#16A34A", icon: CheckCircle },
  RECUSADO: { label: "Recusado", color: "#DC2626", icon: XCircle },
}

type Props = {
  orcamentos: any[]
  user: { tipo?: string | null; nomeEmpresa?: string | null } | null
}

export function DashboardClient({ orcamentos, user }: Props) {
  const isProfissional = user?.tipo === "PROFISSIONAL"
  const totalGeral = orcamentos.reduce((acc, o) => acc + o.totalGeral, 0)
  const aprovados = orcamentos.filter((o) => o.status === "APROVADO").length
  const pendentes = orcamentos.filter((o) => o.status === "ENVIADO").length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{color:"#2C2C2A"}}>
            {isProfissional ? "Minhas propostas" : "Meus orçamentos"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isProfissional
              ? user?.nomeEmpresa ? `${user.nomeEmpresa} · Histórico de propostas` : "Histórico de propostas para clientes"
              : "Suas estimativas de reforma"}
          </p>
        </div>
        <Link href="/dashboard/novo">
          <Button style={{background:"#3B6D11", color:"white"}}>
            <PlusCircle className="w-4 h-4 mr-2" />
            {isProfissional ? "Nova proposta" : "Novo orçamento"}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">{isProfissional ? "Total de propostas" : "Total de orçamentos"}</p>
            <p className="text-3xl font-bold mt-1">{orcamentos.length}</p>
          </CardContent>
        </Card>

        {isProfissional ? (
          <>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Aprovadas pelos clientes</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{aprovados}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Aguardando resposta</p>
                <p className="text-3xl font-bold mt-1" style={{color:"#d97706"}}>{pendentes}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Aprovados</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{aprovados}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Valor total estimado</p>
                <p className="text-3xl font-bold mt-1">
                  {totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* List */}
      {orcamentos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            {isProfissional
              ? <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              : <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />}
            <h3 className="font-semibold text-gray-600 mb-1">
              {isProfissional ? "Nenhuma proposta ainda" : "Nenhum orçamento ainda"}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {isProfissional
                ? "Crie sua primeira proposta e envie o link de aprovação ao cliente."
                : "Crie seu primeiro orçamento de reforma agora."}
            </p>
            <Link href="/dashboard/novo">
              <Button style={{background:"#3B6D11", color:"white"}}>
                {isProfissional ? "Criar proposta" : "Criar orçamento"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orcamentos.map((o) => {
            const s = statusConfig[o.status] || statusConfig.RASCUNHO
            const Icon = s.icon
            return (
              <Link key={o.id} href={`/dashboard/${o.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:"#F0F5EB"}}>
                          <FileText className="w-5 h-5" style={{color:"#3B6D11"}} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{o.comodo} — {o.tipoServico}</p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {o.metragem}m² · {o.regiao} · {format(new Date(o.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-sm">
                          {o.totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                          style={{borderColor: s.color, color: s.color}}
                        >
                          <Icon className="w-3 h-3" />
                          {s.label}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
