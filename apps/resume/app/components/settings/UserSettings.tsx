"use client"

import { useState } from "react"
import { Button, ButtonWhite } from "@repo/components/ui/button"
import { supabase } from "@supabase/supabase"

export function UserSettings({ userMail } : { userMail?: string }) {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [repeat, setRepeat] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setStatus("")
    setLoading(true)

    if (next !== repeat) {
      setStatus("❌ Neue Passwörter stimmen nicht überein.")
      setLoading(false)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Reauth mit aktuellem Passwort
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email!,
      password: current,
    })

    if (signInError) {
      setStatus("❌ Aktuelles Passwort ist falsch.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: next,
    })

    setStatus(error ? `❌ Fehler: ${error.message}` : "✅ Passwort erfolgreich geändert.")
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              value={userMail}
              disabled
              className="bg-gray-100 block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
            Current Password
          </label>
          <div className="mt-2">
            <input
              id="current"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
            New Password
          </label>
          <div className="mt-2">
            <input
              id="next"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
            Repeat
          </label>
          <div className="mt-2">
            <input
              id="repeat"
              type="password"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <Button className="w-full mx-auto" onClick={handleUpdate} disabled={loading}>
            {loading ? "Ändere Passwort..." : "Passwort ändern"}
          </Button>
          {status && <p className="text-sm mt-2">{status}</p>}
        </div>

      </div>
    </div>
  )
}


