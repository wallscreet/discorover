import { NextResponse } from "next/server";

interface RawMtgData {
  Date: string;
  "30yr Mortgage Rate": number;
  "15yr Mortgage Rate": number;
}

interface MtgData {
  date: string;
  rate30: number;
  rate15: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/mortgage-all");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Mortgage Rates data" },
        { status: res.status }
      );
    }

    const raw: RawMtgData[] = await res.json();

    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: "No Mortgage Rates data available" },
        { status: 500 }
      );
    }

    const data: MtgData[] = raw.map((item) => ({
      date: item.Date,
      rate30: item["30yr Mortgage Rate"],
      rate15: item["15yr Mortgage Rate"],
    }));

    // data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}