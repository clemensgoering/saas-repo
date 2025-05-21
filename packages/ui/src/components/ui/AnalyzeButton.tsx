"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function AnalyzeButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const startAnalysis = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/resume/analyze?id=${id}`, { method: "POST" })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Analyse fehlgeschlagen (Status ${res.status})`)
      }

      router.refresh()
    } catch (err: any) {
      console.error("Analyse-Fehler:", err)
      setError(err.message || "Unbekannter Fehler bei der Analyse.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-1">
      <button
        onClick={startAnalysis}
        disabled={loading}
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
      >
        {loading ? "Analysiere…" : "Jetzt analysieren"}
      </button>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
