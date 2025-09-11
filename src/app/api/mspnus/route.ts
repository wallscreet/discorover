import { NextResponse } from 'next/server';

interface RawData {
    Date: string;
    "Median New Home Price": number;
}

interface MedianHomePriceData {
    Date: string;
    medianPriceNew: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const res = await fetch('https://api.discorover.com/mspnus');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch New Home Price data' },
                { status: res.status }
            );
        }

        const raw: RawData[] = await res.json();
        
        const data: MedianHomePriceData[] = raw.map((item) => ({
            Date: item.Date,
            medianPriceNew: item["Median New Home Price"],
        }));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}