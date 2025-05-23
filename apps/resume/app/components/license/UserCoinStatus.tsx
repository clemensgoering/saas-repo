import { supabaseServer } from "@supabase/server"

export async function UserCoinStatus() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return "";

    const { data } = await supabase.from("Wallet").select("coins").eq("user_id", user.id).single()

    return (
        <span className="w-full text-left px-4 py-2 text-sm">
            Coins: <span className="font-semibold text-foreground">{data?.coins ?? 0}</span>
        </span>
    )
}

export async function UserCoinStatusIcon() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return "";

    const { data } = await supabase.from("Wallet").select("coins").eq("user_id", user.id).single()

    return (
        <span className="w-full text-left px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md">
            Coins: <span className="font-semibold text-foreground">{data?.coins ?? 0}</span>
        </span>
    )
}
