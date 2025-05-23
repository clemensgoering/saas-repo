import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { SectionHeader } from "@repo/components/SectionHeader"
import { ResumeQuestion } from "../../../components/resume/ResumeQuestion"
import { cn } from "@lib/utils"
import { FeedbackList } from "../../../components/resume/FeedbackList"


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
      <FeedbackList items={feedback}/>
    </div>

  )
}
