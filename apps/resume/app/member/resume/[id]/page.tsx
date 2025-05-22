import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { AnalyzeButton } from "../../../components/AnalyzeButton"

export default async function ResumeDetailPage({ params }: { params: { id: string } }) {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("file_id", params.id)
    .eq("user_id", user.id)
    .single()

  if (!resume) return redirect("/member")

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{resume.file_name}</h1>
        <p className="text-sm text-muted-foreground">
          Hochgeladen am {new Date(resume.uploaded_at).toLocaleString("de-DE")}
        </p>
      </div>

      {resume.analysis ? (
        <div className="prose dark:prose-invert max-w-none border rounded-md p-4 bg-background">
          <h2 className="text-lg font-semibold mb-2">Analyse</h2>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{resume.analysis}</pre>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          Noch keine Analyse vorhanden.{" "}
          <AnalyzeButton id={resume.id} />
        </div>
      )}
    </div>
  )
}
