import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path=request.nextUrl.pathname
    const isPublicPath=path==='/login' || path==='/signup' || path==='/verifyemail' || path==='/forgotpassword' || path==='/resetpassword'
   const token= request.cookies.get('token')?.value || ''

   //path is public and having token then should not visit the signup and login
//    if(isPublicPath && token){
//     return NextResponse.redirect(new URL('/',request.nextUrl))
//    }

   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
   }
}

export const config={
    matcher:[
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/resetpassword'
    ]
}

