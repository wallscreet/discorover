import { NextRequest, NextResponse } from "next/server";

interface InflationScaledResult {
    from_year: number;
    to_year: number;
    original_amount: number;
    scaled_amount: number;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const from_year = searchParams.get("from_year") || "1980";
    const to_year = searchParams.get("to_year") || new Date().getFullYear().toString();
    const amount = searchParams.get("amount") || "100";
    
    const res = await fetch(
        `https://api.discorover.com/scale-for-inflation?from_year=${from_year}&to_year=${to_year}&amount=${amount}`
    );
    
    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch scaled value" }, { status: res.status });
    }
    
    const data: InflationScaledResult = await res.json();
    
    return NextResponse.json(data);
}

