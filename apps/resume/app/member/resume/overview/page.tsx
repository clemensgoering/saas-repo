import { cn } from "@lib/utils"
import { supabaseServer } from "@supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AnalyzeButton } from "../../../components/resume/AnalyzeButton"
import { SectionHeader } from "@repo/components/SectionHeader"
import { ResumeDownloadButton } from "../../../components/resume/ResumeDownloadButton"
import { PaperClipIcon } from "@heroicons/react/20/solid"


export default async function SettingsPage() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect("/login")


    const { data: resumes, error } = await supabase
        .from("Resumes")
        .select(`user_id,
                file_id,
                file_name,
                created_at,
                Analysis (
                    file_id
                )
            `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="min-h-screen">

            {resumes?.length === 0 && (
                <p className="text-muted-foreground">Noch keine Uploads vorhanden.</p>
            )}

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <SectionHeader title={"Resume"} subtitle={"Overview"} />
                
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start gap-4">
                    <section aria-labelledby="section-1-title">
                        <h2 id="section-1-title" className="sr-only">
                            Section title
                        </h2>
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                            <div className="p-6">
                                <div className="mt-6">
                                    <dl className="divide-y divide-gray-100">
                                        
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Overview</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">All uploaded documents. Only PDF files are prohibited</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                At this section you are able to review all your uploaded files. Provided documents can be analyzed and
                                                details reviewed at the follow up page. Costs for individual actions can be found at the settings page.
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
                                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                            {resumes?.map((resume, index) => (
                                                <li key={index} className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <ResumeDownloadButton fileId={resume.file_id} />
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">{resume.file_name}</span>
                                                            <span className="shrink-0 text-gray-400">2.4mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 shrink-0">
                                                        {resume.Analysis ? (
                                                            <Link href={`/member/resume/${resume.file_id}`}
                                                                className={"block w-full rounded-md bg-indigo-200 " +
                                                                    "px-3.5 py-2.5 text-center text-sm font-semibold text-white " +
                                                                    "shadow-xs hover:bg-indigo-400 focus-visible:outline-2 " +
                                                                    "focus-visible:outline-offset-2 focus-visible:outline-indigo-400"}>
                                                                Details
                                                            </Link>
                                                        ) : ("")}
                                                    </div>
                                                    <div className="ml-4 shrink-0">
                                                        <AnalyzeButton userId={user.id} resumeId={resume.file_id} />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    )
}
