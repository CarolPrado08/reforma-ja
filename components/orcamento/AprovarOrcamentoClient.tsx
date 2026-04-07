"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle, XCircle, FileText } from "lucide-react"

export function AprovarOrcamentoClient({ orcamento }: { orcamento: any }) {
  const [status, setStatus] = useState<string>(orcamento.status)
  const [loading, setLoading] = useState<string | null>(null)

  const handleAction = async (action: "APROVADO" | "RECUSADO") => {
    setLoading(action)
    try {
      const res = await fetch(`/api/orcamento/aprovar/${orcamento.linkAprovacao}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error()
      setStatus(action)
      toast.success(action === "APROVADO" ? "Orçamento aprovado!" : "Orçamento recusado.")
    } catch {
      toast.error("Erro ao processar. Tente novamente.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{background:"#3B6D11"}}>
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold" style={{color:"#2C2C2A"}}>Orçamento de Reforma</h1>
          <p className="text-gray-500 mt-1">Preparado por {orcamento.user?.name ?? "Profissional"}</p>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" style={{color:"#3B6D11"}} />
              Detalhes do orçamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Cômodo", orcamento.comodo],
                ["Serviço", orcamento.tipoServico],
                ["Metragem", `${orcamento.metragem} m²`],
                ["Região", orcamento.regiao],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">{k}</p>
                  <p className="font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-1">
              <div className="flex justify-between"><span className="text-gray-500">Materiais</span><span>{orcamento.totalMateriais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Mão de obra</span><span>{orcamento.totalMaoDeObra.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span style={{color:"#3B6D11"}}>{orcamento.totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
            </div>
          </CardContent>
        </Card>

        {status === "RASCUNHO" || status === "ENVIADO" ? (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => handleAction("RECUSADO")}
              disabled={loading !== null}
            >
              <XCircle className="w-4 h-4 mr-2" />
              {loading === "RECUSADO" ? "..." : "Recusar"}
            </Button>
            <Button
              style={{background:"#3B6D11", color:"white"}}
              onClick={() => handleAction("APROVADO")}
              disabled={loading !== null}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {loading === "APROVADO" ? "..." : "Aprovar"}
            </Button>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              {status === "APROVADO" ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-700">Orçamento aprovado!</p>
                  <p className="text-gray-500 text-sm mt-1">O profissional será notificado.</p>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <p className="font-semibold text-red-600">Orçamento recusado.</p>
                  <p className="text-gray-500 text-sm mt-1">O profissional será notificado.</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
