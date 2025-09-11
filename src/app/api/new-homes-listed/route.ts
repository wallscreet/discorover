import { NextResponse } from 'next/server';

interface RawData {
    Date: string;
    "New SF Homes": number;
}

interface NewHomesListedData {
    Date: string;
    newHomesListed: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const res = await fetch('https://api.discorover.com/new-sf-homes-for-sale');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch New Homes Listed data' },
                { status: res.status }
            );
        }

        const raw: RawData[] = await res.json();
        
        const data: NewHomesListedData[] = raw.map((item) => ({
            Date: item.Date,
            newHomesListed: item["New SF Homes"],
        }));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}