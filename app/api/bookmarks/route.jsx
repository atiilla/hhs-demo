import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("https://start.me/p/ZnNmKG.json?xpv=1");
    const data = await response.json();
    return NextResponse.json(data.page.columns);
}
