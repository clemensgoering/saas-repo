"use client"

import { useState } from "react"
import { Button } from "@repo/components/ui/button"

type LicenseGateProps = {
  userId: string
  cost: number
  onExecute: () => Promise<void>
  label: string
  className?: string
}

export function LicenseGate({ userId, cost, onExecute, label, className }: LicenseGateProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleClick = async () => {
    setLoading(true)
    setError("")

    const res = await fetch("/api/license/check", {
      method: "POST",
      body: JSON.stringify({ userId, cost }),
    })

    const data = await res.json()
    if (!res.ok || !data.success) {
      setError(data.error || "Unbekannter Fehler.")
    } else {
      await onExecute()
    }

    setLoading(false)
  }

  return (
    <div>
      <Button disabled={loading} onClick={handleClick} className={className}>
        {loading ? "Wird geprüft..." : label}
      </Button>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  )
}
