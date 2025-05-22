import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@supabase/server"
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import OpenAI from "openai"

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`

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
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .eq("user_id", user.id)
    .single()

  if (error || !resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  const { data: fileData, error: fileError } = await supabase.storage
    .from("resumes")
    .download(resume.file_name)

  if (fileError || !fileData) {
    return NextResponse.json({ error: "Datei konnte nicht geladen werden." }, { status: 500 })
  }

  const buffer = await fileData.arrayBuffer()
  const pdf = await getDocument({ data: buffer }).promise

  let text = ""
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map((item: any) => item.str).join(" ") + "\n"
  }

  if (!text || text.trim().length < 100) {
    return NextResponse.json({ error: "Text konnte nicht extrahiert werden." }, { status: 422 })
  }

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

  await supabase
    .from("resumes")
    .update({ analysis })
    .eq("id", resume.id)

  return NextResponse.json({ success: true, analysis })
}

