"use client"

import { useRef, useState } from "react"

export function ResumeUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState("")

  const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "text/rtf"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    console.log(selected?.type)
    if (selected && !allowedTypes.includes(selected.type)) {
      setStatus("Nur PDF, DOCX, RTF oder TXT-Dateien sind erlaubt.")
      setFile(null)
      return
    }
    setFile(selected)
    setStatus("")
  }


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
      setStatus("Upload erfolgreich.")
      // weitere Logik starten, z. B. Text extrahieren
    } else {
      setStatus("Fehler beim Upload.")
    }
  }

  return (

    <div className="bg-white">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">Upload your Resume</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full">
            <input
              id="file"
              name="file"
              placeholder="file.*"
              aria-label="File"
              accept=".pdf,.docx,.txt,.rtf"
              onChange={handleFileChange}
              ref={inputRef}
              type="file"
              className="block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <button onClick={handleUpload} disabled={!file}
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
