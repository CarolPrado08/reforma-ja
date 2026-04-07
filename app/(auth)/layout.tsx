import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { TrialBanner } from "@/components/paywall/TrialBanner"
import { isTrialActive, daysLeftInTrial } from "@/lib/subscription"
import { db } from "@/lib/db"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, trialEndsAt: true, stripeCurrentPeriodEnd: true },
  })

  if (!user) redirect("/login")

  const showTrialBanner = isTrialActive(user)
  const daysLeft = daysLeftInTrial(user)

  return (
    <div className="flex min-h-screen">
      <Sidebar user={session.user} />
      <main className="flex-1 flex flex-col">
        {showTrialBanner && <TrialBanner daysLeft={daysLeft} />}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  )
}
