import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
import OpenAI from "openai"
import pdfParse from "pdf-parse"

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
    console.log(error);
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  // Datei laden (lokales Beispiel – bei Supabase Storage hier ersetzen)
const { data: fileData, error: fileError } = await supabase.storage
  .from("resumes")
  .download(resumeId)

if (fileError || !fileData) {
  return NextResponse.json({ error: "Datei konnte nicht geladen werden." }, { status: 500 })
}

const buffer = await fileData.arrayBuffer()
const text = (await pdfParse(Buffer.from(buffer))).text

  // GPT-Analyse starten
  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Du bist ein Karriereberater. Analysiere den Lebenslauf, erkenne Stärken, Schwächen und gib Verbesserungen.",
      },
      {
        role: "user",
        content: `Hier ist der Lebenslauf:\n\n${text}`,
      },
    ],
  })

const choice = gptResponse.choices?.[0]
console.log(choice);
if (!choice || !choice.message?.content) {
  return NextResponse.json({ error: "GPT-Antwort ungültig." }, { status: 500 })
}

const analysis = choice.message.content
  // Ergebnis speichern
  await supabase
    .from("Analysis")
    .update({ analysis })
    .eq("user_id", resume.id)
    .eq("file_id", user.id)

  return NextResponse.json({ success: true, analysis })
}
