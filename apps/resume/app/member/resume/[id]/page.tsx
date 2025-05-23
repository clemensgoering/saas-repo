import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { AnalyzeButton } from "../../../components/AnalyzeButton"
import { SectionHeader } from "@repo/components/SectionHeader"
import { ResumeQuestion } from "../../../components/ResumeQuestion"

export default async function ResumeDetailPage({ params }: { params: { id: string } }) {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")
  const { data: resume, error: userError } = await supabase
    .from("Resumes")
    .select("*")
    .eq("file_id", params.id)
    .eq("user_id", user.id)
    .single()

  const { data: analysis, error: analysisError } = await supabase
    .from("Analysis")
    .select("*")
    .eq("file_id", params.id)
    .eq("user_id", user.id)
    .single()

  const { data: feedback } = await supabase
    .from("Feedback")
    .select("question, answer, created_at")
    .eq("file_id", params.id)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (!analysis) return redirect("/member")

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
      <SectionHeader title={"Resume"} subtitle={"Overview"} />
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                {analysis.analysis ? (
                  <div className="prose dark:prose-invert max-w-none bg-background">
                    <h2 className="text-lg font-semibold mb-2">Analyse</h2>
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{analysis.analysis}</pre>
                  </div>
                ) : ("")}
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <h2 id="section-2-title" className="sr-only">
              {resume.file_name}
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                Hochgeladen am {new Date(resume.created_at).toLocaleString("de-DE")}
                <ResumeQuestion userId={user.id} resumeId={resume.file_id} />
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Abschnitt fuer Feedback */}
      <div className="grid grid-cols-1 items-start gap-4">
        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Bisherige Fragen & Antworten</h3>

          {feedback?.length === 0 ? (
            <p className="text-sm text-muted-foreground">Noch keine Fragen gestellt.</p>
          ) : (
            <ul className="space-y-4 border rounded-md p-4 bg-muted/10">
              {feedback?.map((item, index) => (
                <li key={index} className="text-sm">
                  <p className="font-medium text-foreground">Frage:</p>
                  <p className="mb-2">{item.question}</p>
                  <p className="font-medium text-foreground">Antwort:</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">{item.answer}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    gestellt am {new Date(item.created_at).toLocaleString("de-DE")}
                  </p>
                  {index < feedback.length - 1 && <hr className="mt-4 border-muted" />}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>

  )
}
