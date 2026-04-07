"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Check, CreditCard, Zap } from "lucide-react"

export function BillingClient({ user }: { user: any }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (type: string) => {
    setLoading(type)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error("Erro ao processar pagamento")
    } finally {
      setLoading(null)
    }
  }

  const handlePortal = async () => {
    setLoading("portal")
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error("Erro ao abrir portal")
    } finally {
      setLoading(null)
    }
  }

  const isPro = user.plan === "PRO"
  const isTrial = user.plan === "TRIAL"
  const isFree = user.plan === "FREE"

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{color:"#2C2C2A"}}>Plano & Cobrança</h1>
        <p className="text-gray-500 mt-1">Gerencie seu plano e forma de pagamento</p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plano atual</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <Badge
              style={{
                background: isPro ? "#3B6D11" : isTrial ? "#639922" : "#6B7280",
                color: "white",
              }}
            >
              {user.plan}
            </Badge>
            {isTrial && user.trialEndsAt && (
              <p className="text-sm text-gray-500 mt-1">
                Trial expira em {new Date(user.trialEndsAt).toLocaleDateString("pt-BR")}
              </p>
            )}
            {isPro && user.stripeCurrentPeriodEnd && (
              <p className="text-sm text-gray-500 mt-1">
                Próxima cobrança: {new Date(user.stripeCurrentPeriodEnd).toLocaleDateString("pt-BR")}
              </p>
            )}
            {isFree && (
              <p className="text-sm text-gray-500 mt-1">
                Créditos de orçamento: {user.orcamentosCreditos}
              </p>
            )}
          </div>
          {isPro && (
            <Button variant="outline" onClick={handlePortal} disabled={loading === "portal"}>
              <CreditCard className="w-4 h-4 mr-2" />
              Gerenciar assinatura
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Upgrade to PRO */}
      {!isPro && (
        <Card className="border-2" style={{borderColor:"#3B6D11"}}>
          <CardHeader>
            <CardTitle>Plano PRO — R$39/mês</CardTitle>
            <CardDescription>Para profissionais autônomos e construtoras</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {[
                "Orçamentos ilimitados",
                "PDF com logo profissional",
                "Histórico completo",
                "Link de aprovação para cliente",
                "Comparativo de materiais",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              style={{background:"#3B6D11", color:"white"}}
              onClick={() => handleCheckout("pro")}
              disabled={loading === "pro"}
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading === "pro" ? "Redirecionando..." : isTrial ? "Fazer upgrade agora" : "Assinar PRO"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Avulso para FREE */}
      {isFree && (
        <Card>
          <CardHeader>
            <CardTitle>Comprar orçamentos avulsos</CardTitle>
            <CardDescription>Para moradores que precisam de mais orçamentos</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Card className="border">
              <CardContent className="pt-4 text-center">
                <p className="font-bold text-2xl">R$9,90</p>
                <p className="text-gray-500 text-sm">1 orçamento</p>
                <Button
                  className="w-full mt-3"
                  variant="outline"
                  onClick={() => handleCheckout("single")}
                  disabled={loading === "single"}
                >
                  {loading === "single" ? "..." : "Comprar"}
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2" style={{borderColor:"#639922"}}>
              <CardContent className="pt-4 text-center">
                <Badge className="mb-2" style={{background:"#639922", color:"white"}}>Melhor valor</Badge>
                <p className="font-bold text-2xl">R$29,90</p>
                <p className="text-gray-500 text-sm">Pack com 5 orçamentos</p>
                <Button
                  className="w-full mt-3"
                  style={{background:"#639922", color:"white"}}
                  onClick={() => handleCheckout("pack")}
                  disabled={loading === "pack"}
                >
                  {loading === "pack" ? "..." : "Comprar pack"}
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
