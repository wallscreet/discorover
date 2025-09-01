import { NextResponse } from "next/server";

interface RawCommodityData {
  Date: string;
  "Bacon 1lb": number;
  "Bacon 1lb (Real)": number;
  "Eggs Per Dozen": number;
  "Eggs Per Dozen (Real)": number;
  "Milk Per Gallon": number;
  "Milk Per Gallon (Real)": number;
  "Bread 1lb": number;
  "Bread 1lb (Real)": number;
  "Ground Beef 1lb": number;
  "Ground Beef 1lb (Real)": number;
  "Coffee 1lb": number;
  "Coffee 1lb (Real)": number;
  "Gas Per Gallon": number;
  "Gas Per Gallon (Real)": number;
  "Electric Per kWh": number;
  "Electric Per kWh (Real)": number;
}

interface CommodityData {
  date: string;
  bacon: number;
  baconReal: number;
  eggs: number;
  eggsReal: number;
  milk: number;
  milkReal: number;
  bread: number;
  breadReal: number;
  beef: number;
  beefReal: number;
  coffee: number;
  coffeeReal: number;
  gas: number;
  gasReal: number;
  electric: number;
  electricReal: number;
}

export async function GET() {
  try {
    const res = await fetch("https://api.discorover.com/all-commodity-prices");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch commodity data" },
        { status: res.status }
      );
    }

    const raw: RawCommodityData[] = await res.json();

    const data: CommodityData[] = raw.map((item) => ({
      date: item.Date,
      bacon: item["Bacon 1lb"],
      baconReal: item["Bacon 1lb (Real)"],
      eggs: item["Eggs Per Dozen"],
      eggsReal: item["Eggs Per Dozen (Real)"],
      milk: item["Milk Per Gallon"],
      milkReal: item["Milk Per Gallon (Real)"],
      bread: item["Bread 1lb"],
      breadReal: item["Bread 1lb (Real)"],
      beef: item["Ground Beef 1lb"],
      beefReal: item["Ground Beef 1lb (Real)"],
      coffee: item["Coffee 1lb"],
      coffeeReal: item["Coffee 1lb (Real)"],
      gas: item["Gas Per Gallon"],
      gasReal: item["Gas Per Gallon (Real)"],
      electric: item["Electric Per kWh"],
      electricReal: item["Electric Per kWh (Real)"],
    }));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
