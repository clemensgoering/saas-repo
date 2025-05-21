"use client"

import { useSession } from "@supabase/auth-helpers-react"
import { supabaseBrowser } from "@supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const session = useSession()
  const router = useRouter()

  async function handleLogout() {
    await supabaseBrowser.auth.signOut()
    router.refresh() // reload, damit Middleware greift
  }

  if (!session) {
    return (
      <Link href="/login">
        Login
      </Link>
    )
  }

  return (
    <div className="flex gap-3 items-center">
      <Link href="/member">
        Dashboard
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
