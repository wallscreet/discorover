import { NextResponse } from 'next/server';

interface CpiData {
    Date: string;
    CPI: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const res = await fetch('https://api.discorover.com/cpi');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch CPI data' },
                { status: res.status }
            );
        }

        const data: CpiData[] = await res.json();

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}