import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { supabaseServer } from "@supabase/server"
import { logWalletAction } from "../../../utils/log-wallet"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  const supabase = await supabaseServer()

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: "Ungültiger Webhook" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id
    const coins = parseInt(session.metadata?.coins || "0", 10)

    if (userId && coins > 0) {
      const { error: addError } = await supabase
        .from("Wallet")
        .update({ coins: supabase.rpc("add_coins", { user_id: userId, amount: coins }) })
        .eq("user_id", userId)
        
      if (addError) {
        return NextResponse.json({ error: "Ungültiger Webhook -4901" }, { status: 402 })
      }

      const { error: walletError } = await logWalletAction({
        userId,
        type: "add",
        coins,
        source: "stripe",
        description: "Stripe Checkout Zahlung",
      })
      
      if (walletError) {
        return NextResponse.json({ error: "Ungültiger Webhook -4902" }, { status: 402 })
      }

    }
  }

  return NextResponse.json({ received: true })
}
