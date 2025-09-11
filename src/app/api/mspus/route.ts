import { NextResponse } from 'next/server';

interface RawData {
    Date: string;
    "Median Home Sales Price": number;
}

interface MedianHomePriceData {
    Date: string;
    medianPrice: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const res = await fetch('https://api.discorover.com/mspus');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Median Sales Price data' },
                { status: res.status }
            );
        }

        const raw: RawData[] = await res.json();
        const data: MedianHomePriceData[] = raw.map((item) => ({
            Date: item.Date,
            medianPrice: item["Median Home Sales Price"],
        }));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}