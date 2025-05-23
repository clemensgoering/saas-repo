import { NextRequest, NextResponse } from "next/server"
import { checkAndConsumeCoins } from "../../../utils/check-and-consume"

export async function POST(req: NextRequest) {
  const { userId, cost } = await req.json()

  const result = await checkAndConsumeCoins(userId, cost)
  if (!result.success) {
    return NextResponse.json(result, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
