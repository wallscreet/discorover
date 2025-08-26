import { NextResponse } from "next/server";

interface RawMtg30Data {
  Date: string;
  "30yr Mortgage Rate": number;
  Year: number;
  Month: number;
  Day: number;
}

interface Mtg30Data {
  date: string;
  rate: number;
  year: number;
  month: number;
  day: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/mortgage-30yr");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch 30yr Mortgage Rates data" },
        { status: res.status }
      );
    }

    const raw: RawMtg30Data[] = await res.json();

    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: "No Mortgage Rates data available" },
        { status: 500 }
      );
    }

    const data: Mtg30Data[] = raw.map((item) => ({
      date: item.Date,
      rate: item["30yr Mortgage Rate"],
      year: item.Year,
      month: item.Month,
      day: item.Day,
    }));

    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = data[0];

    return NextResponse.json(latest);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}