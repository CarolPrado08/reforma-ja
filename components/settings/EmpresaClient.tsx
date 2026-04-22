"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Building2, Save } from "lucide-react"
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
    setForm((f) => ({ ...f, [key]: e.target.value }))

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
    <div className="max-w-lg">
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
          <p className="text-sm text-gray-500">
            Essas informações aparecem no PDF das suas propostas.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={salvar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nomeEmpresa}
                onChange={set("nomeEmpresa")}
                placeholder="Ex: Silva Reformas e Construções"
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
              <input
                type="text"
                value={form.cnpj}
                onChange={set("cnpj")}
                placeholder="00.000.000/0001-00"
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={form.telefone}
                onChange={set("telefone")}
                placeholder="(11) 99999-9999"
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do logo</label>
              <input
                type="url"
                value={form.logoUrl}
                onChange={set("logoUrl")}
                placeholder="https://..."
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-gray-400 mt-1">
                Cole o link de uma imagem hospedada (PNG ou JPG, fundo transparente recomendado).
              </p>
            </div>

            {form.logoUrl && (
              <div className="p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Prévia do logo:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.logoUrl} alt="Logo da empresa" className="h-12 object-contain" />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              style={{ background: "#1a5c2a", color: "#fff" }}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Salvando..." : isFirstSetup ? "Salvar e ir para o dashboard" : "Salvar alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
