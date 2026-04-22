"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Building2, Save, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  empresa: {
    nomeEmpresa: string | null
    cnpj: string | null
    telefone: string | null
    logoUrl: string | null
    empresaConfigurada: boolean
  }
  isFirstSetup?: boolean
}

function PropostaPreview({ form }: { form: { nomeEmpresa: string; cnpj: string; telefone: string; logoUrl: string } }) {
  const hoje = new Date()
  const validade = new Date(hoje)
  validade.setDate(validade.getDate() + 15)
  const fmt = (d: Date) => d.toLocaleDateString("pt-BR")

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-xs" style={{ fontFamily: "Georgia, serif" }}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ background: "#f8faf5" }}>
        <div className="flex items-center gap-3">
          {form.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "#1a5c2a" }}>
              {form.nomeEmpresa ? form.nomeEmpresa[0].toUpperCase() : "R"}
            </div>
          )}
          <div>
            <p className="font-bold text-sm" style={{ color: "#1a5c2a" }}>{form.nomeEmpresa || "Nome da Empresa"}</p>
            {form.cnpj && <p className="text-gray-500" style={{ fontSize: 10 }}>CNPJ: {form.cnpj}</p>}
          </div>
        </div>
        <div className="text-right text-gray-500" style={{ fontSize: 10 }}>
          {form.telefone && <p>{form.telefone}</p>}
          <p>contato@empresa.com.br</p>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Título */}
        <div className="text-center mb-4">
          <p className="font-bold text-base tracking-wide" style={{ color: "#1a5c2a" }}>PROPOSTA DE ORÇAMENTO</p>
          <div className="flex justify-center gap-6 mt-1 text-gray-500" style={{ fontSize: 10 }}>
            <span>Emissão: {fmt(hoje)}</span>
            <span>Validade: {fmt(validade)}</span>
          </div>
        </div>

        {/* Dados do cliente */}
        <div className="mb-4 p-3 rounded-lg" style={{ background: "#f8faf5", border: "1px solid #e0ecd6" }}>
          <p className="font-semibold mb-1" style={{ color: "#2C2C2A" }}>Cliente</p>
          <p className="text-gray-700">João da Silva</p>
          <p className="text-gray-500">(11) 91234-5678</p>
        </div>

        {/* Tabela de itens */}
        <table className="w-full mb-4" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a5c2a" }}>
              {["Item", "Qtd", "Un.", "Preço Unit.", "Total"].map(h => (
                <th key={h} className="text-left px-2 py-1.5 text-white" style={{ fontSize: 10, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { item: "Material – Piso Cerâmica", qtd: "30", un: "m²", unit: "R$ 55,00", total: "R$ 1.650,00" },
              { item: "Mão de obra – Piso Cerâmica", qtd: "30", un: "m²", unit: "R$ 45,00", total: "R$ 1.350,00" },
              { item: "Margem de imprevisto (10%)", qtd: "1", un: "vb", unit: "R$ 300,00", total: "R$ 300,00" },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8faf5", borderBottom: "1px solid #e5e7eb" }}>
                <td className="px-2 py-1.5 text-gray-700">{row.item}</td>
                <td className="px-2 py-1.5 text-gray-700">{row.qtd}</td>
                <td className="px-2 py-1.5 text-gray-700">{row.un}</td>
                <td className="px-2 py-1.5 text-gray-700">{row.unit}</td>
                <td className="px-2 py-1.5 font-medium text-gray-800">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end mb-4">
          <div className="text-right">
            <p className="text-gray-500" style={{ fontSize: 10 }}>TOTAL GERAL</p>
            <p className="font-bold text-lg" style={{ color: "#1a5c2a" }}>R$ 3.300,00</p>
          </div>
        </div>

        {/* Condições */}
        <div className="p-3 rounded-lg" style={{ background: "#f8faf5", border: "1px solid #e0ecd6", fontSize: 10 }}>
          <p className="font-semibold mb-1 text-gray-700">Condições de pagamento</p>
          <p className="text-gray-500">50% na aprovação • 50% na conclusão do serviço</p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="px-6 py-3 border-t text-center text-gray-400" style={{ fontSize: 9 }}>
        <p>{form.nomeEmpresa || "Nome da Empresa"}{form.cnpj ? ` · CNPJ ${form.cnpj}` : ""}{form.telefone ? ` · ${form.telefone}` : ""}</p>
        <p className="mt-0.5">Gerado via ReformaJá · reforma-ja.vercel.app</p>
      </div>
    </div>
  )
}

function LogoUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem PNG ou JPG.")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 2MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [])

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Logo da empresa</label>
      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Logo" className="h-12 w-auto object-contain rounded" />
          <div className="flex-1">
            <p className="text-xs text-gray-500">Logo carregado</p>
          </div>
          <button type="button" onClick={() => onChange("")}
            className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors"
          style={{ borderColor: dragging ? "#1a5c2a" : "#d1d5db", background: dragging ? "#eaf3de" : "#fafaf8" }}
        >
          <Upload className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-600 text-center">
            Arraste uma imagem ou <span className="font-medium" style={{ color: "#1a5c2a" }}>clique para selecionar</span>
          </p>
          <p className="text-xs text-gray-400">PNG ou JPG · máx. 2MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }}
      />
    </div>
  )
}

export function EmpresaClient({ empresa, isFirstSetup }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nomeEmpresa: empresa.nomeEmpresa ?? "",
    cnpj: empresa.cnpj ?? "",
    telefone: empresa.telefone ?? "",
    logoUrl: empresa.logoUrl ?? "",
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nomeEmpresa.trim()) {
      toast.error("Nome da empresa é obrigatório")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/user/empresa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast.success("Dados da empresa salvos!")
      router.push("/dashboard")
      router.refresh()
    } catch {
      toast.error("Erro ao salvar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      {/* Formulário */}
      <div>
        {isFirstSetup && (
          <div className="mb-6 p-4 rounded-xl border" style={{ background: "#eaf3de", borderColor: "#b5d98a" }}>
            <p className="text-sm font-medium" style={{ color: "#1a5c2a" }}>
              Quase lá! Configure os dados da sua empresa para gerar propostas profissionais.
            </p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" style={{ color: "#1a5c2a" }} />
              Dados da empresa
            </CardTitle>
            <p className="text-sm text-gray-500">Aparecem no PDF das suas propostas e no preview ao lado.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={salvar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da empresa <span className="text-red-500">*</span>
                </label>
                <input type="text" value={form.nomeEmpresa} onChange={set("nomeEmpresa")}
                  placeholder="Ex: Silva Reformas e Construções"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                <input type="text" value={form.cnpj} onChange={set("cnpj")}
                  placeholder="00.000.000/0001-00"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                <input type="text" value={form.telefone} onChange={set("telefone")}
                  placeholder="(11) 99999-9999"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>

              <LogoUpload value={form.logoUrl} onChange={(v) => setForm(f => ({ ...f, logoUrl: v }))} />

              <Button type="submit" disabled={loading} className="w-full" style={{ background: "#1a5c2a", color: "#fff" }}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Salvando..." : isFirstSetup ? "Salvar e ir para o dashboard" : "Salvar alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview ao vivo */}
      <div className="xl:sticky xl:top-6">
        <p className="text-sm font-medium text-gray-500 mb-3">Pré-visualização da proposta</p>
        <PropostaPreview form={form} />
        <p className="text-xs text-gray-400 mt-2 text-center">
          Dados fictícios para demonstração · atualiza em tempo real
        </p>
      </div>
    </div>
  )
}
