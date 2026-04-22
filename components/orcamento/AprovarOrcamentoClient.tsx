"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle, XCircle, Phone, User, MapPin, Ruler, Calendar, Clock } from "lucide-react"
import { TIPOS_SERVICO, REGIOES } from "@/lib/orcamento-calculator"

export function AprovarOrcamentoClient({ orcamento }: { orcamento: any }) {
  const [status, setStatus] = useState<string>(orcamento.status)
  const [loading, setLoading] = useState<string | null>(null)

  const empresa = orcamento.user ?? {}
  const emissao = new Date(orcamento.createdAt)
  const validade = new Date(emissao)
  validade.setDate(validade.getDate() + 15)
  const fmt = (d: Date) => d.toLocaleDateString("pt-BR")

  const labelServico = TIPOS_SERVICO.find(t => t.key === orcamento.tipoServico)?.label ?? orcamento.tipoServico
  const labelRegiao = REGIOES.find(r => r.key === orcamento.regiao)?.label ?? orcamento.regiao

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
    <div className="min-h-screen py-10 px-4" style={{ background: "#f5f5f3" }}>
      <div className="max-w-2xl mx-auto">

        {/* Cabeçalho da empresa */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="flex items-center justify-between px-6 py-5 border-b" style={{ background: "#f8faf5" }}>
            <div className="flex items-center gap-4">
              {empresa.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={empresa.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
              ) : (
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ background: "#1a5c2a" }}>
                  {(empresa.nomeEmpresa || empresa.name || "R")[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-bold text-base" style={{ color: "#1a5c2a" }}>
                  {empresa.nomeEmpresa || empresa.name || "Profissional"}
                </p>
                {empresa.cnpj && (
                  <p className="text-xs text-gray-500">CNPJ: {empresa.cnpj}</p>
                )}
              </div>
            </div>
            <div className="text-right text-xs text-gray-500 space-y-0.5">
              {empresa.telefone && (
                <p className="flex items-center justify-end gap-1">
                  <Phone className="w-3 h-3" />{empresa.telefone}
                </p>
              )}
              {empresa.email && <p>{empresa.email}</p>}
            </div>
          </div>

          {/* Título e datas */}
          <div className="px-6 py-4 border-b text-center">
            <p className="font-bold tracking-wide text-sm" style={{ color: "#1a5c2a" }}>PROPOSTA DE ORÇAMENTO</p>
            <div className="flex justify-center gap-6 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Emissão: {fmt(emissao)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Válido até: {fmt(validade)}</span>
            </div>
          </div>

          {/* Dados do cliente */}
          {(orcamento.nomeCliente || orcamento.telefoneCliente) && (
            <div className="px-6 py-4 border-b" style={{ background: "#fafaf8" }}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cliente</p>
              <div className="flex items-center gap-4">
                {orcamento.nomeCliente && (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                    <User className="w-4 h-4 text-gray-400" />{orcamento.nomeCliente}
                  </span>
                )}
                {orcamento.telefoneCliente && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Phone className="w-4 h-4 text-gray-400" />{orcamento.telefoneCliente}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Detalhes do orçamento */}
          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Escopo do serviço</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { icon: <MapPin className="w-3 h-3" />, label: "Cômodo", value: orcamento.comodo },
                { icon: null, label: "Serviço", value: labelServico },
                { icon: <Ruler className="w-3 h-3" />, label: "Metragem", value: `${orcamento.metragem} m²` },
                { icon: null, label: "Região", value: labelRegiao },
              ].map(({ icon, label, value }) => (
                <div key={label} className="rounded-lg p-3" style={{ background: "#f8faf5" }}>
                  <p className="text-gray-400 text-xs flex items-center gap-1">{icon}{label}</p>
                  <p className="font-medium text-sm mt-0.5 text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Tabela de valores */}
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#1a5c2a" }}>
                    <th className="text-left px-4 py-2.5 text-white font-semibold text-xs">Item</th>
                    <th className="text-right px-4 py-2.5 text-white font-semibold text-xs">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">Materiais</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {orcamento.totalMateriais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100" style={{ background: "#fafaf8" }}>
                    <td className="px-4 py-3 text-gray-700">Mão de obra</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {orcamento.totalMaoDeObra.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                  </tr>
                  {orcamento.margemImprevisto > 0 && (
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-500">
                        Margem de imprevisto ({(orcamento.margemImprevisto * 100).toFixed(0)}%)
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500">
                        {(orcamento.totalGeral - orcamento.totalMateriais - orcamento.totalMaoDeObra)
                          .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </td>
                    </tr>
                  )}
                  <tr style={{ background: "#f0f5eb" }}>
                    <td className="px-4 py-3 font-bold text-gray-800">Total Geral</td>
                    <td className="px-4 py-3 text-right font-bold text-lg" style={{ color: "#1a5c2a" }}>
                      {orcamento.totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Condições de pagamento */}
            <div className="mt-4 p-3 rounded-lg text-xs text-gray-500" style={{ background: "#f8faf5", border: "1px solid #e0ecd6" }}>
              <span className="font-semibold text-gray-600">Condições de pagamento: </span>
              50% na aprovação · 50% na conclusão do serviço
            </div>
          </div>
        </div>

        {/* Ações */}
        {status === "RASCUNHO" || status === "ENVIADO" ? (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 h-12"
              onClick={() => handleAction("RECUSADO")} disabled={loading !== null}>
              <XCircle className="w-5 h-5 mr-2" />
              {loading === "RECUSADO" ? "Processando..." : "Recusar proposta"}
            </Button>
            <Button className="h-12" style={{ background: "#1a5c2a", color: "white" }}
              onClick={() => handleAction("APROVADO")} disabled={loading !== null}>
              <CheckCircle className="w-5 h-5 mr-2" />
              {loading === "APROVADO" ? "Processando..." : "Aprovar proposta"}
            </Button>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              {status === "APROVADO" ? (
                <>
                  <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
                  <p className="font-bold text-lg text-green-700">Proposta aprovada!</p>
                  <p className="text-gray-500 text-sm mt-1">O profissional foi notificado e entrará em contato em breve.</p>
                </>
              ) : (
                <>
                  <XCircle className="w-14 h-14 text-red-400 mx-auto mb-3" />
                  <p className="font-bold text-lg text-red-600">Proposta recusada.</p>
                  <p className="text-gray-500 text-sm mt-1">O profissional foi notificado.</p>
                </>
              )}
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Gerado via ReformaJá · reforma-ja.vercel.app
        </p>
      </div>
    </div>
  )
}
