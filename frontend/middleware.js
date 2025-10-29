import { NextResponse } from "next/server";
import axios from "axios";


export async function middleware(req){
    const { pathname } = req.nextUrl
    const base_api = process.env.NEXT_PUBLIC_API_URL
    console.log("Middleware เริ่มทำงาน", pathname)
    
    const response = await fetch(`${base_api}/myuser`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();
    const isLogin = data.isLogin;


    // zone middleeware เริ่มตรงนี้ 
    if (!isLogin && pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

}

export const config = {
  matcher: ["/", "/login", "/register"]
};