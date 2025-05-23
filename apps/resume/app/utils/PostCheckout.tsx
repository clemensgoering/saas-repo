"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function PostCheckoutRefresher() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      router.replace("/member/settings") // URL aufräumen
      router.refresh() // 🔁 Serverkomponenten neu laden
    }
  }, [searchParams, router])

  return null
}
