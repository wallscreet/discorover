import { NextResponse } from "next/server";

interface RawNewCarData {
    Date: string;
    "New Auto CPI": number;
    "New Auto Price Real": number;
    "New Auto Price Nominal": number;
}

interface NewCarData {
    date: string;
    cpi: number;
    priceReal: number;
    priceNominal: number;
}

export async function GET() {
    try {
        const res = await fetch("https://api.discorover.com/new-cars?start_date=1971-01-01");

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch new car data"},
                { status: res.status }
            );
        }

        const raw: RawNewCarData[] = await res.json();

        const data: NewCarData[] = raw.map((item) => ({
            date: item.Date,
            cpi: item["New Auto CPI"],
            priceReal: item["New Auto Price Real"],
            priceNominal: item["New Auto Price Nominal"],
        }));

        return NextResponse.json(data);
    
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error", details: String(err) },
            { status: 500 }
        );
    }
}