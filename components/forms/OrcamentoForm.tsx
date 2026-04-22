"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { orcamentoSchema, type OrcamentoInput } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { COMODOS, TIPOS_SERVICO, REGIOES, COMPARATIVO_MATERIAIS } from "@/lib/orcamento-calculator"
import { toast } from "sonner"
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react"

const STEPS = ["Cômodo", "Serviço", "Metragem", "Região", "Revisão"]

type Props = { user: any; modo: "MORADOR" | "PROFISSIONAL" }

export function OrcamentoForm({ user, modo }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const form = useForm<OrcamentoInput>({
    resolver: zodResolver(orcamentoSchema),
    defaultValues: { margemImprevisto: 0.1 },
  })

  const { watch, setValue, handleSubmit, formState: { errors } } = form
  const values = watch()

  const selectedMaterial = COMPARATIVO_MATERIAIS.find(m => m.key === values.tipoServico)

  const onSubmit = async (data: OrcamentoInput) => {
    setLoading(true)
    try {
      const res = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, modo }),
      })
      if (res.status === 402) {
        toast.error("Limite atingido. Adquira mais orçamentos nas configurações.")
        router.push("/settings/billing")
        return
      }
      if (!res.ok) throw new Error("Erro ao criar orçamento")
      toast.success("Orçamento criado com sucesso!")
      router.push("/dashboard")
    } catch {
      toast.error("Erro ao criar orçamento. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Etapa {step + 1} de {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Step 0: Cômodo */}
          {step === 0 && (
            <div>
              <CardHeader className="px-0 pt-0"><CardTitle>Qual cômodo?</CardTitle></CardHeader>
              <div className="grid grid-cols-3 gap-2">
                {COMODOS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setValue("comodo", c)}
                    className={`py-2 px-3 rounded-lg border text-sm transition-all ${values.comodo === c ? "border-green-600 bg-green-50 text-green-700 font-medium" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Tipo Serviço */}
          {step === 1 && (
            <div>
              <CardHeader className="px-0 pt-0"><CardTitle>Tipo de serviço</CardTitle></CardHeader>
              <div className="space-y-2">
                {TIPOS_SERVICO.map(({ label, key }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setValue("tipoServico", key)}
                    className={`w-full py-3 px-4 rounded-lg border text-left text-sm transition-all ${values.tipoServico === key ? "border-green-600 bg-green-50 text-green-700 font-medium" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {selectedMaterial && (
                <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm">
                  <p className="font-medium text-blue-700">Sobre {selectedMaterial.nome}</p>
                  <p className="text-blue-600 mt-1">Durabilidade: {selectedMaterial.durabilidade} • Instalação: {selectedMaterial.dificuldade}</p>
                  <p className="text-blue-600">Indicado para: {selectedMaterial.indicado}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Metragem */}
          {step === 2 && (
            <div>
              <CardHeader className="px-0 pt-0"><CardTitle>Metragem (m²)</CardTitle></CardHeader>
              <input
                type="number"
                min="1"
                max="10000"
                step="0.5"
                placeholder="Ex: 25"
                value={values.metragem || ""}
                onChange={(e) => setValue("metragem", parseFloat(e.target.value))}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-gray-400 text-xs mt-2">Área total a ser reformada em metros quadrados</p>
              {errors.metragem && <p className="text-red-500 text-xs mt-1">{errors.metragem.message}</p>}

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Margem de imprevisto: {(values.margemImprevisto * 100).toFixed(0)}%</p>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={values.margemImprevisto}
                  onChange={(e) => setValue("margemImprevisto", parseFloat(e.target.value))}
                  className="w-full"
                  style={{accentColor:"#3B6D11"}}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span><span>25%</span><span>50%</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Região */}
          {step === 3 && (
            <div>
              <CardHeader className="px-0 pt-0"><CardTitle>Sua região</CardTitle></CardHeader>
              <div className="grid grid-cols-2 gap-2">
                {REGIOES.map(({ label, key }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setValue("regiao", key)}
                    className={`py-3 px-4 rounded-lg border text-sm transition-all ${values.regiao === key ? "border-green-600 bg-green-50 text-green-700 font-medium" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Revisão */}
          {step === 4 && (
            <div>
              <CardHeader className="px-0 pt-0"><CardTitle>Revisão do orçamento</CardTitle></CardHeader>
              <div className="space-y-2 text-sm">
                {[
                  ["Perfil", modo === "MORADOR" ? "Morador" : "Profissional"],
                  ["Cômodo", values.comodo],
                  ["Serviço", TIPOS_SERVICO.find(t => t.key === values.tipoServico)?.label ?? values.tipoServico],
                  ["Metragem", `${values.metragem} m²`],
                  ["Região", REGIOES.find(r => r.key === values.regiao)?.label ?? values.regiao],
                  ["Margem imprevisto", `${(values.margemImprevisto * 100).toFixed(0)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
              {modo === "PROFISSIONAL" && (
                <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: "#eaf3de", border: "1px solid #b5d98a" }}>
                  <p className="font-medium" style={{ color: "#1a5c2a" }}>Link de aprovação será gerado</p>
                  <p className="text-xs mt-1" style={{ color: "#27500a" }}>
                    Após criar, você receberá um link único para enviar ao seu cliente aprovar o orçamento.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            style={{background:"#3B6D11", color:"white"}}
          >
            Próximo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={loading}
            style={{background:"#3B6D11", color:"white"}}
          >
            <Calculator className="w-4 h-4 mr-2" />
            {loading ? "Calculando..." : "Calcular orçamento"}
          </Button>
        )}
      </div>
    </form>
  )
}
