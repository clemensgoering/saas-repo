import { supabaseServer } from "@supabase/server"
import { redirect } from "next/navigation"
import { ResumeUploader } from "../../../components/ResumeUploader"
import { Incentives } from "@repo/components/Incentives"
import { FAQ } from "@repo/components/FAQ"
import { SectionHeader } from "@repo/components/SectionHeader"

export default async function UploadPage() {
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="min-h-screen">
      <div className=" mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <SectionHeader title={"Resume"} subtitle={"Upload"} />
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="sr-only">
                Section title
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="p-6">
                  <ResumeUploader />
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                Section title
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="p-6">{/* Your content */}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
        <Incentives/>
        <FAQ/>
      
    </div>
  )
}
