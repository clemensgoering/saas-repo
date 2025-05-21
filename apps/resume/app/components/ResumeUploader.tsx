"use client"

import { useRef, useState } from "react"

export function ResumeUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState("")

  const handleUpload = async () => {
    if (!file) return
    setStatus("Wird hochgeladen …")

    const formData = new FormData()
    formData.append("resume", file)

    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      setStatus("Upload erfolgreich. Analyse folgt …")
      // weitere Logik starten, z. B. Text extrahieren
    } else {
      setStatus("Fehler beim Upload.")
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              
      />
      <button onClick={handleUpload} disabled={!file}>Hochladen & analysieren</button>
      {status && <p className="text-sm text-muted-foreground">{status}</p>}
    </div>
  )
}
