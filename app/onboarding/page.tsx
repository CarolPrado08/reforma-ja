"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Wrench } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function escolher(tipo: "MORADOR" | "PROFISSIONAL") {
    setLoading(true)
    await fetch("/api/user/tipo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo }),
    })
    if (tipo === "PROFISSIONAL") {
      router.push("/settings/empresa")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafaf8" }}>
      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#1a5c2a" }}>
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#0f1923" }}>Bem-vindo ao ReformaJá</h1>
          <p className="text-gray-500 mt-2 text-sm">Como você vai usar a plataforma?</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => escolher("MORADOR")}
            disabled={loading}
            className="group p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 hover:shadow-md disabled:opacity-50"
            style={{ borderColor: "#e5e7eb", background: "#fff" }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#eaf3de" }}>
              <Home className="w-5 h-5" style={{ color: "#1a5c2a" }} />
            </div>
            <p className="font-semibold text-sm" style={{ color: "#0f1923" }}>Sou morador</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Quero estimar o custo da minha reforma e acompanhar orçamentos.
            </p>
          </button>

          <button
            onClick={() => escolher("PROFISSIONAL")}
            disabled={loading}
            className="group p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 hover:shadow-md disabled:opacity-50"
            style={{ borderColor: "#e5e7eb", background: "#fff" }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#eaf3de" }}>
              <Wrench className="w-5 h-5" style={{ color: "#1a5c2a" }} />
            </div>
            <p className="font-semibold text-sm" style={{ color: "#0f1923" }}>Sou profissional</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Gero propostas para clientes com link de aprovação e PDF com minha marca.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
