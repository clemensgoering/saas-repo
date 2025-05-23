import { supabaseServer } from "@supabase/server"


export async function checkAndConsumeCoins(userId: string, cost: number) {
  const supabase = await supabaseServer()
  const { data: wallet } = await supabase
    .from("Wallet")
    .select("coins")
    .eq("user_id", userId)
    .single()

  if (!wallet || wallet.coins < cost) {
    return { success: false, error: "Nicht genügend Coins." }
  }

  const { error } = await supabase
    .from("Wallet")
    .update({ coins: wallet.coins - cost })
    .eq("user_id", userId)

  if (error) return { success: false, error: "Konnte Coins nicht abziehen." }

  return { success: true }
}
