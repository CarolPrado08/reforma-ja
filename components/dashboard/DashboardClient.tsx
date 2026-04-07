"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  RASCUNHO: { label: "Rascunho", color: "#6B7280", icon: Clock },
  ENVIADO: { label: "Enviado", color: "#3B6D11", icon: FileText },
  APROVADO: { label: "Aprovado", color: "#16A34A", icon: CheckCircle },
  RECUSADO: { label: "Recusado", color: "#DC2626", icon: XCircle },
}

export function DashboardClient({ orcamentos, user }: { orcamentos: any[]; user: any }) {
  const totalGasto = orcamentos.reduce((acc, o) => acc + o.totalGeral, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{color:"#2C2C2A"}}>Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Seus orçamentos de reforma</p>
        </div>
        <Link href="/dashboard/novo">
          <Button style={{background:"#3B6D11", color:"white"}}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo Orçamento
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total de orçamentos</p>
            <p className="text-3xl font-bold mt-1">{orcamentos.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Aprovados</p>
            <p className="text-3xl font-bold mt-1 text-green-600">
              {orcamentos.filter((o) => o.status === "APROVADO").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Valor total estimado</p>
            <p className="text-3xl font-bold mt-1">
              {totalGasto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      {orcamentos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-600 mb-1">Nenhum orçamento ainda</h3>
            <p className="text-gray-400 text-sm mb-4">Crie seu primeiro orçamento de reforma agora.</p>
            <Link href="/dashboard/novo">
              <Button style={{background:"#3B6D11", color:"white"}}>Criar orçamento</Button>
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
                            {o.metragem}m² • {o.regiao} • {format(new Date(o.createdAt), "dd/MM/yyyy", { locale: ptBR })}
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
