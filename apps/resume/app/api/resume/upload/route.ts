import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
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
  const file_id = uuid()
  // OPTIONAL: Text extrahieren via pdf-parse
  // const text = (await pdfParse(buffer)).text

  // Speichern in DB (z. B. Tabelle "resumes")
  const { error } = await supabase.from("Resumes").insert({
    user_id: user.id,
    file_id: file_id,
    file_name: file.name,
    created_at: new Date().toISOString(),
    // raw_text: text, // optional
  })

  if(error){
     return NextResponse.json({ success: false })
  }

  await supabase
    .storage
    .from('resumes')
    .upload(file_id, file, {
      cacheControl: '3600',
      upsert: false
    })

  return NextResponse.json({ success: true })
}
