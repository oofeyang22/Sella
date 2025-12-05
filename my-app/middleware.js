
import { NextResponse } from 'next/server'
export function middleware(request) {
    const token = request.cookies.get('authjs.session-token')?.value || 
                  request.cookies.get('__Secure-authjs.session-token')?.value
    
    const { pathname } = request.nextUrl
    
    const isProtectedRoute = pathname.startsWith('/dashboard')
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
    const isRootPath = pathname === '/'
    
    // Handle root path
    if (isRootPath) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    
    // Redirect to login if trying to access protected route without token
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Redirect to dashboard if logged in and trying to access auth pages
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg|.*\\.svg|.*\\.ico).*)']
}