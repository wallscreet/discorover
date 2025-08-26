import { NextResponse } from "next/server";

interface RawFedFundsData {
  Date: string;
  "Fed Funds Rate": number;
  Year: number;
  Month: number;
  Day: number;
}

interface FedFundsData {
  date: string;
  ffrate: number;
  year: number;
  month: number;
  day: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/fed-funds");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Fed Funds data" },
        { status: res.status }
      );
    }

    const raw: RawFedFundsData[] = await res.json();

    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: "No Fed Funds data available" },
        { status: 500 }
      );
    }

    const data: FedFundsData[] = raw.map((item) => ({
      date: item.Date,
      ffrate: item["Fed Funds Rate"],
      year: item.Year,
      month: item.Month,
      day: item.Day,
    }));

    // Sort by date descending and return only the latest record
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
