import { supabaseServer } from "@supabase/server"

export async function logWalletAction({
    userId,
    type,
    coins,
    source,
    description,
}: {
    userId: string
    type: "add" | "use"
    coins: number
    source: string
    description: string
}) {

    const supabase = await supabaseServer()
    return supabase.from("Wallet_logs").insert({
        user_id: userId,
        type,
        coins,
        source,
        description,
    })
}
