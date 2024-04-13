import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./constants/routes";

export function middleware(request: NextRequest) {
  // 로그인했다면 반드시 가지고 있는 쿠키들
  const hasSIdCookie = request.cookies.has("connect.sid");
  const hasLoggedInCookie = request.cookies.has("nosvc_logged_in");

  /** 로그인 시 접근 가능한 경로 */
  const loggedInPath = routes
    .filter((route) => route.type === "LOGGED_IN")
    .map((route) => route.path);
  /** 비로그인 시 접근 가능한 경로 */
  const loggedOutPath = routes
    .filter((route) => route.type === "LOGGED_OUT")
    .map((route) => route.path);

  // 로그인 시 접근이 가능한 페이지인 경우
  if (loggedInPath.includes(request.nextUrl.pathname)) {
    // 로그인된 경우 갖는 쿠키를 가지고 있지 않는 경우
    if (!(hasSIdCookie && hasLoggedInCookie)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 비로그인 시 접근이 가능한 페이지인 경우
  if (loggedOutPath.includes(request.nextUrl.pathname)) {
    // 로그인된 경우 갖는 쿠키를 가진 경우
    if (hasSIdCookie && hasLoggedInCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
