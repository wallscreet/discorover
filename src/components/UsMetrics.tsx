"use client"

import React, { useEffect, useState } from "react";

interface DebtData {
  record_date: string;
  tot_pub_debt_out_amt: number;
}

interface SofrData {
  date: string;
  sofr: number;
}

interface FedFundsData {
  date: string;
  ffrate: number;
}

interface MortgageData {
  date: string;
  rate: number;
}

function UsMetrics() {
  const [debt, setDebt] = useState<DebtData | null>(null);
  const [sofr, setSofr] = useState<SofrData | null>(null);
  const [ffr, setFfr] = useState<FedFundsData | null>(null);
  const [mortgage, setMortgage] = useState<MortgageData | null>(null);

  useEffect(() => {
    async function fetchDebt() {
      try {
        const res = await fetch("/api/usdebt");
        const data = await res.json();
        setDebt(data);
      } catch (err) {
        console.error("Failed to fetch debt:", err);
      }
    }

    async function fetchSofr() {
      try {
        const res = await fetch("/api/sofr");
        const data = await res.json();
        setSofr(data);
      } catch (err) {
        console.error("Failed to fetch SOFR:", err);
      }
    }

    async function fetchFfr() {
      try {
        const res = await fetch("/api/fedfunds");
        const data = await res.json();
        setFfr(data);
      } catch (err) {
        console.error("Failed to fetch Fed Funds Rate:", err);
      }
    }

    async function fetchMortgage() {
      try {
        const res = await fetch("/api/mtg-30yr");
        const data = await res.json();
        setMortgage(data);
      } catch (err) {
        console.error("Failed to fetch Mortgage Rate:", err);
      }
    }

    fetchDebt();
    fetchSofr();
    fetchFfr();
    fetchMortgage();
  }, []);

  return (
    <div className="rounded-xl w-full flex grid grid-cols-5 gap-4 p-4 mt-8">

      <div className="rounded-xl row-span-2 col-span-5 row-start-1 col-start-1 flex flex-col items-center justify-center shadow-xl border-b border-slate-400 mb-6">
        <p className="font-semibold text-2xl pb-5 text-center text-[#0c122d]">
          U.S. National Debt
        </p>
        <p className="font-semibold text-3xl sm:text-4xl pb-4 text-red-800 text-center mb-2">
          {debt
            ? debt.tot_pub_debt_out_amt.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })
            : "Loading..."}
        </p>
      </div>

      <div className="rounded-xl row-span-2 col-span-1 row-start-3 col-start-2 flex flex-col items-center justify-center shadow-lg">
        <p className="text-2xl sm:text-3xl font-semibold pb-4 text-center text-[#0c122d]">
          {mortgage ? `${mortgage.rate.toFixed(2)}%` : "Loading..."}
        </p>
        <p className="text-sm text-center text-[#214469]">30yr Mortgage</p>
      </div>

      <div className="rounded-xl row-span-2 col-span-1 row-start-3 col-start-3 flex flex-col items-center justify-center shadow-lg">
        <p className="text-2xl sm:text-3xl font-semibold pb-4 text-center text-[#0c122d]">
          {ffr ? `${ffr.ffrate.toFixed(2)}%` : "Loading..."}
        </p>
        <p className="text-sm text-center text-[#214469]">Fed Funds Rate</p>
      </div>

      <div className="rounded-xl row-span-2 col-span-1 row-start-3 col-start-4 flex flex-col items-center justify-center shadow-lg">
        <p className="text-2xl sm:text-3xl font-semibold pb-4 text-center text-[#0c122d]">
          {sofr ? `${sofr.sofr.toFixed(2)}%` : "Loading..."}
        </p>
        <p className="text-sm text-center text-[#214469]">SOFR</p>
      </div>
    </div>
  );
}

export default UsMetrics;
