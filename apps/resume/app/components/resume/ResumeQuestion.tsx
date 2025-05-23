"use client"

import { SetStateAction, useState } from "react"
import { Textarea } from "@repo/components/ui/Textarea"
import { LicenseGate } from "../license/LicenseGate"

export function ResumeQuestion({ userId, resumeId }: { userId: string, resumeId: string }) {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [label, setLabel] = useState("Frage stellen")
    const [error, setError] = useState("")

    const askQuestion = async () => {
        if (!question.trim()) return

        setLabel("Frage wird gestellt...")
        setAnswer("")

        const res = await fetch("/api/resume/question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeId, question }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || "Unbekannter Fehler bei der Anfrage.")
        }

        setAnswer(data.reply)
        setLabel("Frage stellen")
    }

    return (
        <div className="mt-8 space-y-4">
            {answer && (
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Antwort</label>
                    <Textarea value={answer} readOnly rows={6} />
                </div>
            )}
            <label className="block text-sm font-medium">Frage zur Analyse</label>
            <Textarea
                placeholder="Z. B. Wie kann ich meinen Lebenslauf für eine Führungsposition verbessern?"
                value={question}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setQuestion(e.target.value)}
                rows={3}
            />
            <div className="mt-2 flex justify-end">
                      <LicenseGate
                        userId={userId}
                        cost={5}
                        label={label}
                        onExecute={askQuestion}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      />
                {error && (
                    <p className="text-sm text-red-500">
                        Fehler: {error}
                    </p>
                )}
            </div>


        </div>
    )
}
