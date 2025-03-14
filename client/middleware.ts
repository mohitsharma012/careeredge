import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and the current path is not /auth/login or /auth/signup,
  // redirect the user to /auth/login
  // if (!session && !req.nextUrl.pathname.startsWith("/auth/")) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  // If user is signed in and the current path is /auth/login or /auth/signup,
  // redirect the user to /dashboard
  if (session && req.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // For admin routes, check if the user has admin privileges
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // If not logged in, redirect to admin login
    // if (!session) {
    //   return NextResponse.redirect(new URL("/admin/login", req.url));
    // }

    // // Check if user has admin role (you would need to implement this check)
    // const isAdmin = session.user?.user_metadata?.role === "admin";
    
    // // If logged in but not admin, redirect to dashboard
    // if (!isAdmin && req.nextUrl.pathname !== "/admin/login") {
    //   return NextResponse.redirect(new URL("/dashboard", req.url));
    // }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};