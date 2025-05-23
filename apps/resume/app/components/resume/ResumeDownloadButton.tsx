"use client"

import { PaperClipIcon } from "@heroicons/react/20/solid"

export function ResumeDownloadButton({ fileId }: { fileId: string }) {
  const handleDownload = () => {
    window.open(`/api/resume/download?id=${encodeURIComponent(fileId)}`, "_blank")
  }

  return (
    <PaperClipIcon onClick={handleDownload}aria-hidden="true" className="size-5 shrink-0 text-gray-400 hover:cursor-pointer" />
  )
}
