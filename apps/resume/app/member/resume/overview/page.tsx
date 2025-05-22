import { cn } from "@lib/utils"
import { supabaseServer } from "@supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AnalyzeButton } from "../../../components/AnalyzeButton"
import { SectionHeader } from "@repo/components/SectionHeader"


export default async function SettingsPage() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const { data: resumes, error } = await supabase
        .from("Resumes")
        .select("*")
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
                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                    {/* Left column */}
                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="section-1-title">
                            <h2 id="section-1-title" className="sr-only">
                                Section title
                            </h2>
                            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                                <div className="p-6">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    File
                                                </th>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Created At
                                                </th>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Analyzed
                                                </th>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Process
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resumes?.map((resume, index) => (
                                                <tr key={index}>
                                                    <td
                                                        className={cn(
                                                            index === 0 ? '' : 'border-t border-gray-200',
                                                            'px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                                        )}
                                                    >
                                                        {resume.file_name}
                                                    </td>
                                                    <td
                                                        className={cn(
                                                            index === 0 ? '' : 'border-t border-gray-200',
                                                            'px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                                        )}
                                                    >
                                                        {new Date(resume.created_at).toLocaleString("de-DE")}
                                                    </td>
                                                    <td
                                                        className={cn(
                                                            index === 0 ? '' : 'border-t border-gray-200',
                                                            'px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                                        )}
                                                    >
                                                        {resume.analysis ? (
                                                            <Link href={`/member/resume/${resume.id}`} className="rounded-full py-2.5 text-sm font-medium">
                                                                Details
                                                            </Link>
                                                        ) : ("")}
                                                    </td>
                                                    <td
                                                        className={cn(
                                                            index === 0 ? '' : 'border-t border-transparent',
                                                            'relative py-3.5 pl-3 text-sm font-medium sm:pr-6',
                                                        )}
                                                    >
                                                        <AnalyzeButton id={resume.file_id} />
                                                        {index !== 0 ? <div className="absolute -top-px right-6 left-0 h-px bg-gray-200" /> : null}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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


        </div>
    )
}
