"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Building2, Save, Upload, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FormData = { nomeEmpresa: string; cnpj: string; telefone: string; logoUrl: string }

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

/* ─── Documento PDF ─────────────────────────────────────────────────────── */
function PdfDocument({ form }: { form: FormData }) {
  const hoje = new Date()
  const validade = new Date(hoje)
  validade.setDate(validade.getDate() + 15)
  const fmt = (d: Date) => d.toLocaleDateString("pt-BR")

  return (
    <div style={{
      width: "100%",
      background: "#fff",
      fontFamily: "'Georgia', serif",
      fontSize: 11,
      color: "#1a1a1a",
      boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
      borderRadius: 2,
    }}>
      {/* Cabeçalho da empresa */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 28px 16px", borderBottom: "2px solid #1a5c2a",
        background: "#f8faf5",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {form.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.logoUrl} alt="Logo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
          ) : (
            <div style={{
              height: 44, width: 44, borderRadius: 8, background: "#1a5c2a",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0,
            }}>
              {form.nomeEmpresa ? form.nomeEmpresa[0].toUpperCase() : "R"}
            </div>
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: 13, color: "#1a5c2a", margin: 0 }}>
              {form.nomeEmpresa || "Nome da Empresa"}
            </p>
            {form.cnpj && (
              <p style={{ fontSize: 9, color: "#666", margin: "2px 0 0" }}>CNPJ: {form.cnpj}</p>
            )}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 9, color: "#666", lineHeight: 1.6 }}>
          {form.telefone && <p style={{ margin: 0 }}>{form.telefone}</p>}
          <p style={{ margin: 0 }}>contato@empresa.com.br</p>
        </div>
      </div>

      {/* Título e datas */}
      <div style={{ textAlign: "center", padding: "14px 28px", borderBottom: "1px solid #e5e7eb" }}>
        <p style={{ fontWeight: 700, fontSize: 12, letterSpacing: 1.5, color: "#1a5c2a", margin: 0 }}>
          PROPOSTA DE ORÇAMENTO
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 4, fontSize: 9, color: "#888" }}>
          <span>Emissão: {fmt(hoje)}</span>
          <span>Válido até: {fmt(validade)}</span>
        </div>
      </div>

      <div style={{ padding: "16px 28px" }}>
        {/* Cliente */}
        <div style={{
          marginBottom: 14, padding: "10px 12px", borderRadius: 6,
          background: "#f8faf5", border: "1px solid #d6eacc",
        }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>Cliente</p>
          <p style={{ fontWeight: 600, fontSize: 11, margin: 0 }}>João da Silva</p>
          <p style={{ fontSize: 10, color: "#666", margin: "2px 0 0" }}>(11) 91234-5678</p>
        </div>

        {/* Tabela */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12, fontSize: 10 }}>
          <thead>
            <tr>
              {["Descrição", "Qtd", "Un.", "Preço Unit.", "Total"].map((h, i) => (
                <th key={h} style={{
                  background: "#1a5c2a", color: "#fff", padding: "7px 8px",
                  textAlign: i === 0 ? "left" : "right", fontWeight: 600, fontSize: 9,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { desc: "Material — Piso Cerâmica", qtd: "30", un: "m²", unit: "R$ 55,00", total: "R$ 1.650,00" },
              { desc: "Mão de obra — Piso Cerâmica", qtd: "30", un: "m²", unit: "R$ 45,00", total: "R$ 1.350,00" },
              { desc: "Margem de imprevisto (10%)", qtd: "1", un: "vb", unit: "R$ 300,00", total: "R$ 300,00" },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8faf5", borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "6px 8px", color: "#333" }}>{row.desc}</td>
                <td style={{ padding: "6px 8px", textAlign: "right", color: "#333" }}>{row.qtd}</td>
                <td style={{ padding: "6px 8px", textAlign: "right", color: "#333" }}>{row.un}</td>
                <td style={{ padding: "6px 8px", textAlign: "right", color: "#333" }}>{row.unit}</td>
                <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 500, color: "#222" }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: "#eaf3de" }}>
              <td colSpan={4} style={{ padding: "8px", fontWeight: 700, fontSize: 10, color: "#1a5c2a" }}>TOTAL GERAL</td>
              <td style={{ padding: "8px", textAlign: "right", fontWeight: 700, fontSize: 12, color: "#1a5c2a" }}>R$ 3.300,00</td>
            </tr>
          </tfoot>
        </table>

        {/* Condições */}
        <div style={{
          padding: "8px 12px", borderRadius: 6, marginBottom: 20,
          background: "#f8faf5", border: "1px solid #d6eacc", fontSize: 9, color: "#555",
        }}>
          <span style={{ fontWeight: 700, color: "#333" }}>Condições de pagamento: </span>
          50% na aprovação · 50% na conclusão do serviço
        </div>

        {/* Assinaturas */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
            Assinaturas
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {["Cliente", "Profissional responsável"].map((label) => (
              <div key={label}>
                <div style={{ borderBottom: "1.5px solid #333", marginBottom: 6, height: 36 }} />
                <p style={{ fontSize: 9, color: "#555", margin: 0, fontWeight: 600 }}>{label}</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ flex: 1, borderBottom: "1px solid #aaa", marginRight: 8 }}>
                    <p style={{ fontSize: 8, color: "#aaa", margin: "4px 0 0" }}>Nome completo</p>
                  </div>
                  <div style={{ width: 72, borderBottom: "1px solid #aaa" }}>
                    <p style={{ fontSize: 8, color: "#aaa", margin: "4px 0 0" }}>Data</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div style={{
        padding: "8px 28px", borderTop: "1px solid #e5e7eb",
        background: "#f8faf5", textAlign: "center", fontSize: 8, color: "#aaa",
      }}>
        <p style={{ margin: 0 }}>
          {form.nomeEmpresa || "Nome da Empresa"}
          {form.cnpj ? ` · CNPJ ${form.cnpj}` : ""}
          {form.telefone ? ` · ${form.telefone}` : ""}
        </p>
        <p style={{ margin: "2px 0 0" }}>Gerado via ReformaJá · reforma-ja.vercel.app</p>
      </div>
    </div>
  )
}

/* ─── Viewer de PDF ─────────────────────────────────────────────────────── */
function PdfViewer({ form }: { form: FormData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", borderRadius: 10, overflow: "hidden", border: "1px solid #3a3a3a" }}>
      {/* Toolbar */}
      <div style={{
        background: "#3c3c3c", padding: "8px 16px",
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
      }}>
        <FileText style={{ color: "#ccc", width: 14, height: 14 }} />
        <span style={{ color: "#ccc", fontSize: 12, fontWeight: 500 }}>Pré-visualização do PDF</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#888", background: "#2a2a2a", padding: "2px 8px", borderRadius: 4 }}>
          Ao vivo
        </span>
      </div>

      {/* Área de rolagem com fundo escuro */}
      <div style={{
        background: "#525659", flex: 1, overflowY: "auto",
        padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      }}>
        <PdfDocument form={form} />
        <p style={{ color: "#999", fontSize: 10, textAlign: "center", margin: 0 }}>
          Dados fictícios · atualiza em tempo real
        </p>
      </div>
    </div>
  )
}

/* ─── Upload de logo ────────────────────────────────────────────────────── */
function LogoUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Selecione PNG ou JPG."); return }
    if (file.size > 2 * 1024 * 1024) { toast.error("Imagem deve ter no máximo 2MB."); return }
    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
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
          <p className="flex-1 text-xs text-gray-500">Logo carregado</p>
          <button type="button" onClick={() => onChange("")} className="text-gray-400 hover:text-red-500 transition-colors">
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
            Arraste ou <span className="font-medium" style={{ color: "#1a5c2a" }}>clique para selecionar</span>
          </p>
          <p className="text-xs text-gray-400">PNG ou JPG · máx. 2MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }} />
    </div>
  )
}

/* ─── Componente principal ──────────────────────────────────────────────── */
export function EmpresaClient({ empresa, isFirstSetup }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    nomeEmpresa: empresa.nomeEmpresa ?? "",
    cnpj: empresa.cnpj ?? "",
    telefone: empresa.telefone ?? "",
    logoUrl: empresa.logoUrl ?? "",
  })

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nomeEmpresa.trim()) { toast.error("Nome da empresa é obrigatório"); return }
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6" style={{ minHeight: "calc(100vh - 160px)" }}>

      {/* ── Coluna esquerda: formulário ── */}
      <div className="flex flex-col gap-4">
        {isFirstSetup && (
          <div className="p-4 rounded-xl border" style={{ background: "#eaf3de", borderColor: "#b5d98a" }}>
            <p className="text-sm font-medium" style={{ color: "#1a5c2a" }}>
              Quase lá! Configure os dados da sua empresa para gerar propostas profissionais.
            </p>
          </div>
        )}

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" style={{ color: "#1a5c2a" }} />
              Dados da empresa
            </CardTitle>
            <p className="text-sm text-gray-500">Aparecem no PDF e no preview ao lado em tempo real.</p>
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

      {/* ── Coluna direita: viewer de PDF ── */}
      <div className="xl:sticky xl:top-6" style={{ height: "calc(100vh - 160px)" }}>
        <PdfViewer form={form} />
      </div>
    </div>
  )
}
