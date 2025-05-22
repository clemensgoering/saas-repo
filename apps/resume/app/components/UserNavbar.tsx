
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function UserNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigate = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (

    <>
      <Link href="/member/dashboard" className="rounded-full py-2.5 text-sm font-medium">
        Dashboard
      </Link>
      <div className="relative">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full py-2.5 text-sm font-medium"
          >
            Resume
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <button
                onClick={() => navigate("/member/resume/overview")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Übersicht
              </button>
              <button
                onClick={() => navigate("/member/resume/upload")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Hochladen
              </button>
            </div>
          )}
        </div>
      </div>
      <Link href="/member/settings" className="rounded-full py-2.5 text-sm font-medium">
        Settings
      </Link>
    </>
  )
}
