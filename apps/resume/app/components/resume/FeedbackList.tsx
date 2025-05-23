"use client"

import { cn } from "@lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

type FeedbackItem = {
    question: string
    answer: string | null
    created_at: string
}

export function FeedbackList({ items }: { items: FeedbackItem[] | null }) {

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

    if (!items?.length) {
        return <p className="text-sm text-muted-foreground">Noch keine Feedbackfragen gestellt.</p>
    }

    return (
        <div className="grid grid-cols-1 items-start gap-4">
            <section className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Bisherige Fragen & Antworten</h3>

                <div className="lg:col-start-3">
                    {/* Activity feed */}
                    <ul role="list" className="mt-6 space-y-6">
                        {items?.map((item, index) => {
                            const isOpen = openIndex === index
                            return (
                                <li key={index} className="relative flex gap-x-4">
                                    <div
                                        className={cn(
                                            index === items.length - 1 ? 'h-6' : '-bottom-6',
                                            'absolute top-0 left-0 flex w-6 justify-center',
                                        )}
                                    >
                                        <div className="w-px bg-gray-200" />
                                    </div>

                                    <>
                                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                                            
                                                <div className="size-1.5 rounded-full bg-transparent ring-1 ring-gray-300" />
                                            
                                        </div>
                                        <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
                                            <div className="flex justify-between gap-x-4">
                                                <div className="py-0.5 text-xs/5 text-gray-500">
                                                    <span className="font-medium text-gray-900">{item.question}</span>
                                                </div>
                                                <time dateTime={item.created_at} className="flex-none py-0.5 text-xs/5 text-gray-500">
                                                    {item.created_at}
                                                </time>
                                                <button
                                                    className="flex justify-between items-center w-full text-left"
                                                    onClick={() => toggle(index)}
                                                >
                                                    <span className="font-medium"></span>
                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                                                    />
                                                </button>
                                            </div>
                                            {isOpen && (<p className="text-sm/6 text-gray-500 text-muted-foreground whitespace-pre-wrap">{item.answer}</p>)}
                                        </div>
                                    </>

                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>

            </section>
        </div>
    )
}
