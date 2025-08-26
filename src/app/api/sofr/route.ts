import { NextResponse } from "next/server";

interface RawSofrData {
  Date: string;
  SOFR: number;
  Year: number;
  Month: number;
  Day: number;
}

interface SofrData {
  date: string;
  sofr: number;
  year: number;
  month: number;
  day: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/sofr");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch SOFR data" },
        { status: res.status }
      );
    }

    const raw: unknown = await res.json();

    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: "No SOFR data available" },
        { status: 500 }
      );
    }

    const data: SofrData[] = (raw as RawSofrData[]).map((item) => ({
      date: item.Date,
      sofr: item.SOFR,
      year: item.Year,
      month: item.Month,
      day: item.Day,
    }));

    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
