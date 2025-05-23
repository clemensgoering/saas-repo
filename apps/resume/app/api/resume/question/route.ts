import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
import OpenAI from "openai"
import { extractTextFromPdfBuffer } from "../../../components/resume/ResumeLoader"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: NextRequest) {
  const supabase = await supabaseServer()
  const body = await req.json()
  const { resumeId, question } = body

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !resumeId || !question) {
    return NextResponse.json({ error: "Fehlende Daten." }, { status: 400 })
  }
  // Resume holen
  const { data: fileData, error: fileError } = await supabase.storage
    .from("resumes")
    .download(resumeId)

  if (fileError || !fileData) {
    return NextResponse.json({ error: "Datei konnte nicht geladen werden." }, { status: 500 })
  }
  
  const buffer = Buffer.from(await fileData.arrayBuffer())
  const text = await extractTextFromPdfBuffer(buffer)

  // Analyse holen
  const { data: analysisEntry } = await supabase
    .from("Analysis")
    .select("analysis")
    .eq("file_id", resumeId)
    .eq("user_id", user.id)
    .single()

  if (!analysisEntry?.analysis) {
    return NextResponse.json({ error: "Keine Analyse gefunden." }, { status: 404 })
  }

  const chatResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Du bist ein Karrierecoach. Du beantwortest Fragen auf Basis einer bestehenden Lebenslaufanalyse. Es sollen nur Fragen in diesem Kontext beantwortet werden",
      },
      {
        role: "assistant",
        content: `Dies ist der Lebenslauf des Nutzers:\n\n${text}`,
      },
      {
        role: "assistant",
        content: `Dies ist die bisherige Analyse des Lebenslaufs:\n\n${analysisEntry.analysis}`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  })

  const reply = chatResponse.choices?.[0]?.message?.content ?? null
  if (!reply) {
    return NextResponse.json({ error: "Analyse fehlgeschlagen." }, { status: 500 })
  }

  const { error: feedbackError } = await supabase.from("Feedback").insert({
    user_id: user.id,
    file_id: resumeId,
    created_at: new Date().toISOString(),
    question,
    answer: reply,
  })

  if (feedbackError) {
    return NextResponse.json({ error: "Analyse fehlgeschlagen." }, { status: 500 })
  }

  return NextResponse.json({ reply })
}
