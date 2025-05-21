import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuid } from "uuid"
//import * as pdfParse from "pdf-parse" // optional später

export async function POST(req: NextRequest) {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("resume") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuid()}.pdf`
  const uploadPath = path.join(process.cwd(), "uploads", filename)

  // Lokales Speichern (Demo-Zweck – optional in S3/Supabase Storage)
  await writeFile(uploadPath, buffer)

  // OPTIONAL: Text extrahieren via pdf-parse
  // const text = (await pdfParse(buffer)).text

  // Speichern in DB (z. B. Tabelle "resumes")
  await supabase.from("resumes").insert({
    user_id: user.id,
    file_name: filename,
    uploaded_at: new Date().toISOString(),
    // raw_text: text, // optional
  })

  return NextResponse.json({ success: true })
}
