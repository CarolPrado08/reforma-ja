import Link from "next/link"
import { AlertCircle } from "lucide-react"

export function TrialBanner({ daysLeft }: { daysLeft: number }) {
  return (
    <div className="px-6 py-3 flex items-center justify-between text-sm" style={{background:"#639922", color:"white"}}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        <span>
          <strong>{daysLeft} dias</strong> restantes no seu trial gratuito
        </span>
      </div>
      <Link href="/settings/billing" className="underline font-semibold hover:opacity-80">
        Fazer upgrade →
      </Link>
    </div>
  )
}
