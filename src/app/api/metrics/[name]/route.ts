import { NextResponse } from "next/server";

interface RawMetricData {
  Date: string;
  value: number;
  Year?: number;
  Month?: number;
  Day?: number;
}

interface MetricData {
  date: string;
  value: number;
  year?: number;
  month?: number;
  day?: number;
}

const METRIC_ENDPOINTS: Record<string, string> = {
  "fed-funds": "https://api.discorover.com/fed-funds",
  "sofr": "https://api.discorover.com/sofr",
  "mortgage-rate": "https://api.discorover.com/mortgage-rate",
  "national-debt": "https://api.discorover.com/national-debt",
};

export async function GET(req: Request, { params }: { params: { name: string } }) {
  const { name } = params;

  const endpoint = METRIC_ENDPOINTS[name];
  if (!endpoint) {
    return NextResponse.json({ error: "Unknown metric" }, { status: 404 });
  }

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${name} data` },
        { status: res.status }
      );
    }

    const raw: RawMetricData[] = await res.json();
    if (!Array.isArray(raw) || raw.length === 0) {
      return NextResponse.json(
        { error: `${name} data is empty` },
        { status: 500 }
      );
    }

    const data: MetricData[] = raw.map((item) => ({
      date: item.Date,
      value: item.value,
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
