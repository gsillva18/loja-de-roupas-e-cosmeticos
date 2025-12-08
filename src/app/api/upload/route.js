import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { base64, filename } = await req.json();

        const buffer = Buffer.from(base64, "base64");

        const blob = await put(filename, buffer, {
            access: "public",
        });

        return NextResponse.json({
            url: blob.url,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro no upload", details: error.message },
            { status: 500 }
        );
    }
}
