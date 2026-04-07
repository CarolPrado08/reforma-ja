import Stripe from "stripe"

let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.acacia" as any,
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop]
  },
})

export async function createCheckoutSession(userId: string, userEmail: string) {
  const session = await (getStripe()).checkout.sessions.create({
    customer_email: userEmail,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_PRO!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
    metadata: { userId },
  })
  return session
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await (getStripe()).billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  })
  return session
}

export async function createPaymentIntentOrcamento(
  userId: string,
  type: "single" | "pack"
) {
  const amount = type === "single" ? 990 : 2990 // cents
  const paymentIntent = await (getStripe()).paymentIntents.create({
    amount,
    currency: "brl",
    metadata: { userId, type },
  })
  return paymentIntent
}
