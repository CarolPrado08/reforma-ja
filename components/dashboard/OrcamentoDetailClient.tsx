"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { FileDown, Link, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { PaywallGate } from "@/components/paywall/PaywallGate"
import { PLAN_LIMITS } from "@/lib/subscription"

export function OrcamentoDetailClient({ orcamento, userPlan }: { orcamento: any; userPlan: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(orcamento.status)
  const [loading, setLoading] = useState(false)
  const canUsePdf = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS]?.pdf ?? false

  const updateStatus = async (newStatus: string) => {
    setLoading(true)
    try {
      await fetch(`/api/orcamentos/${orcamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      setStatus(newStatus)
      toast.success("Status atualizado!")
    } catch {
      toast.error("Erro ao atualizar status")
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    if (!orcamento.linkAprovacao) return
    const url = `${window.location.origin}/orcamento/aprovar/${orcamento.linkAprovacao}`
    navigator.clipboard.writeText(url)
    toast.success("Link copiado!")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold" style={{color:"#2C2C2A"}}>
          {orcamento.comodo} — {orcamento.tipoServico}
        </h1>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Metragem", `${orcamento.metragem} m²`],
              ["Região", orcamento.regiao],
              ["Modo", orcamento.modo],
              ["Margem imprevisto", `${(orcamento.margemImprevisto * 100).toFixed(0)}%`],
            ].map(([k, v]) => (
              <div key={k} className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">{k}</p>
                <p className="font-medium mt-0.5">{v}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between"><span className="text-gray-500">Materiais</span><span>{orcamento.totalMateriais.toLocaleString("pt-BR", {style:"currency",currency:"BRL"})}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Mão de obra</span><span>{orcamento.totalMaoDeObra.toLocaleString("pt-BR", {style:"currency",currency:"BRL"})}</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total geral</span><span style={{color:"#3B6D11"}}>{orcamento.totalGeral.toLocaleString("pt-BR", {style:"currency",currency:"BRL"})}</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Ações</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-16">Status:</span>
            <Select value={status} onValueChange={updateStatus} disabled={loading}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RASCUNHO">Rascunho</SelectItem>
                <SelectItem value="ENVIADO">Enviado</SelectItem>
                <SelectItem value="APROVADO">Aprovado</SelectItem>
                <SelectItem value="RECUSADO">Recusado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {orcamento.linkAprovacao && (
            <Button variant="outline" className="w-full" onClick={copyLink}>
              <Link className="w-4 h-4 mr-2" />
              Copiar link de aprovação
            </Button>
          )}

          <PaywallGate
            locked={!canUsePdf}
            title="PDF Profissional"
            description="Gere propostas PDF com logo. Disponível no plano PRO."
          >
            <Button className="w-full" variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </PaywallGate>
        </CardContent>
      </Card>
    </div>
  )
}
