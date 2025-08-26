import { NextResponse } from "next/server";

interface UsDebtRecord {
  record_date: string;
  debt_held_public_amt: string;
  intragov_hold_amt: string;
  tot_pub_debt_out_amt: string;
  src_line_nbr: string;
  record_fiscal_year: string;
  record_fiscal_quarter: string;
  record_calendar_year: string;
  record_calendar_month: string;
  record_calendar_day: string;
}

interface UsDebtApiResponse {
  data: UsDebtRecord[];
  meta: unknown;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&format=json&page[number]=1&page[size]=1"
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch debt data" },
        { status: res.status }
      );
    }

    const raw: UsDebtApiResponse = await res.json();

    if (!raw.data || raw.data.length === 0) {
      return NextResponse.json(
        { error: "No debt data available" },
        { status: 500 }
      );
    }

    const latest = raw.data[0];

    const parsed = {
      record_date: latest.record_date,
      debt_held_public_amt: parseFloat(latest.debt_held_public_amt),
      intragov_hold_amt: parseFloat(latest.intragov_hold_amt),
      tot_pub_debt_out_amt: parseFloat(latest.tot_pub_debt_out_amt),
      src_line_nbr: parseInt(latest.src_line_nbr, 10),
      record_fiscal_year: parseInt(latest.record_fiscal_year, 10),
      record_fiscal_quarter: parseInt(latest.record_fiscal_quarter, 10),
      record_calendar_year: parseInt(latest.record_calendar_year, 10),
      record_calendar_month: parseInt(latest.record_calendar_month, 10),
      record_calendar_day: parseInt(latest.record_calendar_day, 10),
    };

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
