import { NextResponse } from "next/server";

export async function POST() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        await fetch(`${backendUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch {}
    return NextResponse.json({ ok: true });
}
