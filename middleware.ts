import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const valid = await verifyAdminToken(token);
    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
