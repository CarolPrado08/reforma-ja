type Plan = "FREE" | "TRIAL" | "PRO"

type UserForSubscription = {
  plan: Plan
  trialEndsAt: Date | null
  stripeCurrentPeriodEnd: Date | null
}

export function isTrialActive(user: UserForSubscription): boolean {
  if (user.plan !== "TRIAL") return false
  if (!user.trialEndsAt) return false
  return user.trialEndsAt > new Date()
}

export function isSubscribed(user: UserForSubscription): boolean {
  if (user.plan !== "PRO") return false
  if (!user.stripeCurrentPeriodEnd) return false
  return user.stripeCurrentPeriodEnd > new Date()
}

export function hasAccess(user: UserForSubscription): boolean {
  return isTrialActive(user) || isSubscribed(user)
}

export function daysLeftInTrial(user: UserForSubscription): number {
  if (!user.trialEndsAt) return 0
  const diff = user.trialEndsAt.getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const PLAN_LIMITS = {
  FREE: {
    orcamentos: 1,
    pdf: false,
    historico: false,
    linkAprovacao: false,
    comparativo: false,
    modoProfissional: false,
  },
  TRIAL: {
    orcamentos: Infinity,
    pdf: true,
    historico: true,
    linkAprovacao: true,
    comparativo: true,
    modoProfissional: true,
  },
  PRO: {
    orcamentos: Infinity,
    pdf: true,
    historico: true,
    linkAprovacao: true,
    comparativo: true,
    modoProfissional: true,
  },
} as const

export function checkUsageLimit(
  user: UserForSubscription,
  resource: keyof (typeof PLAN_LIMITS)["FREE"]
): boolean {
  const limits = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS] ?? PLAN_LIMITS.FREE
  const limit = limits[resource]
  if (typeof limit === "boolean") return limit
  if (typeof limit === "number") return limit === Infinity
  return false
}
