
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const isPublicPath = 
    pathname === "/login" || 
    pathname === "/register" || 
    pathname === "/tracking" || 
    pathname.startsWith("/api/tracking/");
  
  // API routes other than tracking require auth
  const isApiRoute = pathname.startsWith("/api/") && !pathname.startsWith("/api/tracking/");
  
  // Get the token from the cookies
  const token = request.cookies.get("token")?.value;
  
  // For login/register paths, redirect to dashboard if already logged in
  if (isPublicPath && token) {
    const user = verifyToken(token);
    
    // Only redirect if the token is valid
    if (user && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL(`/dashboard/${user.id}`, request.url));
    }
  }
  
  // For protected routes, redirect to login if not authenticated
  if (!isPublicPath && !token) {
    const url = new URL("/login", request.url);
    
    // Add the current pathname as a return_to parameter
    url.searchParams.set("return_to", pathname);
    
    return NextResponse.redirect(url);
  }
  
  // For API routes, return 401 if not authenticated
  if (isApiRoute && !token) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|public/).*)",
  ],
};
