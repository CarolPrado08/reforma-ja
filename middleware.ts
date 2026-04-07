import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/app", "/settings"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (!isProtected) return NextResponse.next()

  const sessionToken =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token")

  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
