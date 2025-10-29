import { NextResponse } from "next/server";

export async function middleware(req){
    const { pathname } = req.nextUrl
    console.log("Middleware เริ่มทำงาน", pathname)
}

// export const config = {
//   matcher: ["/"]
// };