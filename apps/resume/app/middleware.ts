import { updateSession } from '@supabase/middleware'
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // z. B. Weiterleitung, Auth, Sessionprüfung
  return NextResponse.next()
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}