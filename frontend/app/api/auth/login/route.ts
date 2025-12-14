import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json(); // { email, password }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
    }

    try {
        const res = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            // spring setting cookies?
            credentials: "include",
        });

        if (!res.ok) {
            const err = await res.text();
            return NextResponse.json({ error: err || "Login failed" }, { status: res.status });
        }

        // return user in json:
        const user = await res.json();
        return NextResponse.json(user, { status: 200 });
    } catch (e) {
        console.error("Login error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
