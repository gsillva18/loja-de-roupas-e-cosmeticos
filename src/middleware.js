import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    console.log("Estou chegando no middleware!")
    /*
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const precisaAuth =
        pathname.startsWith("/") ||
        pathname.startsWith("/clientes") ||
        pathname.startsWith("/produto") ||
        pathname.startsWith("/usuario");


    if (precisaAuth && !token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    //comente esse aqui depois
    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/login", req.url));
        if (token.role !== "admin")
            return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }
    
    console.log("Estou saíndo no middleware!")
    return NextResponse.next();
    */
}

export const config = {
    matcher: [
        "/:path*",
        "/clientes/:path*",
        "/produto/:path*",
        "/usuario/:path*",
    ],
};