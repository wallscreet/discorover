import { NextResponse } from 'next/server';

interface RawCarPricesData {
    Date: string;
    "New Auto CPI": number;
    "New Auto Price Real": number;
    "New Auto Price Nominal": number;
    "Used Auto CPI": number;
    "Used Auto Price Real": number;
    "Used Auto Price Nominal": number;
}

interface CarPricesData {
    date: string;
    newCpi: number;
    newPriceReal: number;
    newPriceNominal: number;
    usedCpi: number;
    usedPriceReal: number;
    usedPriceNominal: number;
}

export async function GET() {
    try {
        const res = await fetch('https://api.discorover.com/all-car-prices?start_date=1971-01-01');

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch car prices data' },
                { status: res.status }
            );
        }

        const raw: RawCarPricesData[] = await res.json();

        const data: CarPricesData[] = raw.map((item) => ({
            date: item.Date,
            newCpi: item["New Auto CPI"],
            newPriceReal: item["New Auto Price Real"],
            newPriceNominal: item["New Auto Price Nominal"],
            usedCpi: item["Used Auto CPI"],
            usedPriceReal: item["Used Auto Price Real"],
            usedPriceNominal: item["Used Auto Price Nominal"],
        }));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal server error', details: String(err) },
            { status: 500 }
        );
    }
}