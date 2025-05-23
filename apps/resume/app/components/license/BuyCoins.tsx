"use client"

import {  ButtonWhite } from "@repo/components/ui/button"

type BuyCoinsProps = {
  preset?: number[]
}

export function BuyCoins({ preset = [20, 50, 100] }: BuyCoinsProps) {
  const handleBuy = async (amount: number) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: amount }),
    })

    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {preset.map((amount) => (
        <ButtonWhite key={amount} onClick={() => handleBuy(amount/5)}>
          {amount} Coins ({(amount/5).toFixed(2)} €)
        </ButtonWhite>
      ))}
    </div>
  )
}
