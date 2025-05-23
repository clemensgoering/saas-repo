import { supabaseServer } from "@supabase/server"

export async function CoinHistoryList({ userId }: { userId: string }) {
    const supabase = await supabaseServer()

    const { data } = await supabase
        .from("Wallet_logs")
        .select("type, coins, source, description, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

    if (!data?.length) return <p className="text-sm">Keine Einträge vorhanden.</p>

    return (
        <ul className="space-y-3 mt-4 text-sm">
            {data.map((entry, idx) => (
                <li key={idx} className="border p-3 rounded-md bg-muted/10">
                    <div className="flex justify-between">
                        <span className="font-medium">
                            {entry.description || entry.source}
                        </span>
                        <span className={`font-mono ${entry.coins >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {entry.coins > 0 ? "+" : ""}{entry.coins} Coins
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {new Date(entry.created_at).toLocaleString("de-DE")}
                    </p>
                </li>
            ))}
        </ul>
    )
}
