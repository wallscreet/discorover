import { NextResponse } from 'next/server';

interface RawData {
    Date: string;
    "Mortgages DQ": number;
}

interface MtgDqData {
    Date: string;
    mortgagesDq: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const res = await fetch('https://api.discorover.com/dq-sfr-mtg');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Mortgage DQ data' },
                { status: res.status }
            );
        }

        const raw: RawData[] = await res.json();
        
        const data: MtgDqData[] = raw.map((item) => ({
            Date: item.Date,
            mortgagesDq: item["Mortgages DQ"],
        }));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}