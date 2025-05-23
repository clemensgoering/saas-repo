"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LicenseGate } from "../license/LicenseGate"

export function AnalyzeButton({ userId, resumeId }: { userId: string, resumeId: string }) {
  const [label, setLabel] = useState("Jetzt Analysieren")
  const [error, setError] = useState("")
  const router = useRouter()

  const startAnalysis = async () => {
    setLabel("Wird analysisert..")
    setError("")

    try {
      const res = await fetch(`/api/resume/analyze?id=${resumeId}`, { method: "POST" })
      let errorMsg = `Analyse fehlgeschlagen (Status ${res.status})`
      if (!res.ok) {
        const data = await res.clone().json()
        if (data?.error) {
          errorMsg = data.error
        }
        throw new Error(data.error || errorMsg)
      }

      router.refresh()
    } catch (err: any) {
      console.error("Analyse-Fehler:", err)
      setError(err.message || "Unbekannter Fehler bei der Analyse.")
    } finally {
      setLabel("Jetzt Analysieren")
    }
  }

  return (
    <div className="space-y-1">
      <LicenseGate
        userId={userId}
        cost={5}
        label={label}
        onExecute={startAnalysis}
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
