// components/AuthProvider.tsx
'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '../../../supabase/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}