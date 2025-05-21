// components/AuthProvider.tsx
'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@auth/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}