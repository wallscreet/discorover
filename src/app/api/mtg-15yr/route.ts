import { NextResponse } from "next/server";

interface RawMtg15Data {
  Date: string;
  "30yr Mortgage Rate": number;
}

interface Mtg15Data {
  date: string;
  rate: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/mortgage-15yr");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch 15yr Mortgage Rates data" },
        { status: res.status }
      );
    }

    const raw: RawMtg15Data[] = await res.json();

    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: "No Mortgage Rates data available" },
        { status: 500 }
      );
    }

    const data: Mtg15Data[] = raw.map((item) => ({
      date: item.Date,
      rate: item["30yr Mortgage Rate"],
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