import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings für, {user.email}!</h1>
      {/* Upload-Formular folgt hier */}
    </div>
  )
}
