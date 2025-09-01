import { NextResponse } from "next/server";

interface RawUsedCarData {
    Date: string;
    "Used Auto CPI": number;
    "Used Auto Price Real": number;
    "Used Auto Price Nominal": number;
}

interface NewCarData {
    date: string;
    cpi: number;
    priceReal: number;
    priceNominal: number;
}

export async function GET() {
    try {
        const res = await fetch("https://api.discorover.com/used-cars?start_date=1971-01-01");

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch used car data"},
                { status: res.status }
            );
        }

        const raw: RawUsedCarData[] = await res.json();

        const data: NewCarData[] = raw.map((item) => ({
            date: item.Date,
            cpi: item["Used Auto CPI"],
            priceReal: item["Used Auto Price Real"],
            priceNominal: item["Used Auto Price Nominal"],
        }));

        return NextResponse.json(data);
    
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error", details: String(err) },
            { status: 500 }
        );
    }
}