import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login");
  }
}

export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/message", "/search"],
}; //로그인을 해야지만 접근할 수 있는 페이지
