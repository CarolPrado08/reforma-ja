import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface PaywallGateProps {
  title?: string
  description?: string
  children: React.ReactNode
  locked: boolean
}

export function PaywallGate({ title, description, children, locked }: PaywallGateProps) {
  if (!locked) return <>{children}</>

  return (
    <div className="relative">
      <div className="opacity-20 pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="max-w-sm w-full shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{background:"#F0F5EB"}}>
              <Lock className="w-6 h-6" style={{color:"#3B6D11"}} />
            </div>
            <CardTitle>{title ?? "Recurso PRO"}</CardTitle>
            <CardDescription>{description ?? "Faça upgrade para acessar este recurso."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/settings/billing">
              <Button className="w-full" style={{background:"#3B6D11", color:"white"}}>
                Ver planos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
