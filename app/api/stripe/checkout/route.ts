import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createCheckoutSession, createPaymentIntentOrcamento } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { type } = body

  if (type === "pro") {
    const checkout = await createCheckoutSession(session.user.id, session.user.email)
    return NextResponse.json({ url: checkout.url })
  }

  if (type === "single" || type === "pack") {
    const paymentIntent = await createPaymentIntentOrcamento(session.user.id, type)
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 })
}
