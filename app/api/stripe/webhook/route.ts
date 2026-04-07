import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/db"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.acacia" as any,
  })
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (!userId) break

      if (session.mode === "subscription") {
        await db.user.update({
          where: { id: userId },
          data: {
            plan: "PRO",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            stripePriceId: process.env.STRIPE_PRICE_ID_PRO,
          },
        })
      } else if (session.mode === "payment") {
        // Avulso de orçamento
        const type = session.metadata?.type
        const creditos = type === "pack" ? 5 : 1
        await db.user.update({
          where: { id: userId },
          data: { orcamentosCreditos: { increment: creditos } },
        })
      }
      break
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = (invoice as any).parent?.subscription_details?.subscription
      if (!subscriptionId) break
      await db.user.update({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          stripeCurrentPeriodEnd: new Date(invoice.period_end * 1000),
          plan: "PRO",
        },
      })
      break
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      await db.user.update({
        where: { stripeSubscriptionId: sub.id },
        data: {
          stripeCurrentPeriodEnd: new Date((sub as any).current_period_end * 1000),
        },
      }).catch(() => {})
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await db.user.update({
        where: { stripeSubscriptionId: sub.id },
        data: { plan: "FREE", stripeSubscriptionId: null },
      }).catch(() => {})
      break
    }
  }

  return NextResponse.json({ received: true })
}
