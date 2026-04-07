import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { BillingClient } from "@/components/settings/BillingClient"

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      trialEndsAt: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      orcamentosCreditos: true,
    },
  })

  if (!user) redirect("/login")

  return <BillingClient user={user} />
}
