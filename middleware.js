import { NextResponse } from "next/server";

export function middleware(request){
  const { pathname } = request.nextUrl;

  // if (pathname === "/contact") {
  //   return NextResponse.redirect(new URL("/", request.url));   // {middleware}
  // }

  return NextResponse.next();
};
