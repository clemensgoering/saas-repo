"use client"
import Image from 'next/image'

import { useState } from "react"
import { supabaseBrowser } from "@supabase/client"
import { useRouter } from "next/navigation"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [isRegistering, setIsRegistering] = useState(false)


    const router = useRouter()

    const handleGoogleLogin = async () => {
        const { error } = await supabaseBrowser.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`, // optional: eigene Redirect-Seite
            },
        })

        if (error) {
            console.error("Google Login fehlgeschlagen:", error.message)
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        if (isRegistering) {
            const { error } = await supabaseBrowser.auth.signUp({ email, password })
            if (error) {
                setMessage(error.message)
            } else {
                setMessage(isRegistering ? "Registrierung erfolgreich." : "Erfolgreich eingeloggt.")

            }
        } else {
            const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
            if (error) {
                setMessage(error.message)
            } else {
                if (!isRegistering) router.push("/member/dashboard/")
            }
        }
        setLoading(false)
    }


    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" width={10} height={10} />
                <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleAuth}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input type="password" name="password" id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input id="remember-me" name="remember-me" type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                            <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">Remember me</label>
                            </div>

                            <div className="text-sm/6">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={loading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? "Einloggen..." : "Anmelden"}</button>
                        </div>
                    </form>
                    {message && <p className="text-sm text-center text-muted-foreground mt-2">{message}</p>}
                    <div>
                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm/6 font-medium">
                                <span className="bg-white px-6 text-gray-900">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            <button
                                onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                                    <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                                    <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                                </svg>
                                <span className="text-sm/6 font-semibold">Google</span>
                            </button>

                        </div>
                    </div>
                </div>

                <p className="text-sm text-center text-muted-foreground mt-2">
                    {isRegistering ? "Du hast bereits ein Konto?" : "Noch kein Konto?"}{" "}
                    <button
                        type="button"
                        className="text-primary underline underline-offset-2"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? "Zum Login" : "Registrieren"}
                    </button>
                </p>
            </div>
        </div>

    )
}


