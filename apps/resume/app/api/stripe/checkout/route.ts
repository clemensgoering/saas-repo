import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { quantity } = await req.json()
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: 100 * quantity, // 1€ = 100 Cent
          product_data: {
            name: `${quantity} Coins`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
      coins: quantity.toString(),
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/member/settings?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/member/settings?checkout=cancel`,
  })

  return NextResponse.json({ url: session.url })
}
