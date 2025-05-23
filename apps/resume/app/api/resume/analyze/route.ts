import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
import OpenAI from "openai"
import { extractTextFromPdfBuffer } from "../../../components/ResumeLoader";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: NextRequest) {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const resumeId = searchParams.get("id")

  if (!resumeId) {
    return NextResponse.json({ error: "Missing resume ID" }, { status: 400 })
  }

  const { data: resume, error } = await supabase
    .from("Resumes")
    .select("*")
    .eq("file_id", resumeId)
    .eq("user_id", user.id)
    .single()

  if (error || !resume) {
    return NextResponse.json({ error: error?.message }, { status: 404 })
  }

  const { data: fileData, error: fileError } = await supabase.storage
    .from("resumes")
    .download(resume.file_id)

  if (fileError || !fileData) {
    return NextResponse.json({ error: "Datei konnte nicht geladen werden." }, { status: 500 })
  }
  
  const buffer = Buffer.from(await fileData.arrayBuffer())
  const text = await extractTextFromPdfBuffer(buffer)

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Du bist ein Karriereberater. Analysiere den Lebenslauf, erkenne Stärken, Schwächen und gib Verbesserungsvorschläge.",
      },
      {
        role: "user",
        content: `Hier ist ein Lebenslauf:\n\n${text}`,
      },
    ],
  })

  const analysis = gptResponse.choices?.[0]?.message?.content ?? null
  if (!analysis) {
    return NextResponse.json({ error: "Analyse fehlgeschlagen." }, { status: 500 })
  } 

const { data, error: analysisError } = await supabase
  .from('Analysis')
  .upsert({ user_id: user.id, 
            file_id: resumeId, 
            analysis: analysis, 
            created_at: new Date().toISOString() })
  
  if (analysisError) {
    return NextResponse.json({ error: analysisError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, text })
}

