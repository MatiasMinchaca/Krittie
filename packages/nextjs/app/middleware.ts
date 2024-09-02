import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);

    const token = cookies["next-auth.session-token"] || cookies["__Secure-next-auth.session-token"];

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
