import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"

export async function GET(req: NextRequest) {
  const supabase = await supabaseServer()
  const { searchParams } = new URL(req.url)
  const fileId = searchParams.get("id")

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !fileId) {
    return NextResponse.json({ error: "Unauthorized or missing file name" }, { status: 401 })
  }

  // (Optional) prüfen, ob die Datei wirklich dem User gehört
  const { data: resume } = await supabase
    .from("Resumes")
    .select("file_name")
    .eq("file_id", fileId)
    .eq("user_id", user.id)
    .single()

  if (!resume) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { data: signedUrl } = await supabase.storage
    .from("resumes")
    .createSignedUrl(fileId, 60)

  if (!signedUrl) {
    return NextResponse.json({ error: "Signierter Link fehlgeschlagen" }, { status: 500 })
  }

  return NextResponse.redirect(signedUrl.signedUrl, 307)
}
