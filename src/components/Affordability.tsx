"use client";

import React, { useState, useEffect } from "react";

interface AffordabilityData {
  year: number;
  hoiPpi: number;
  estHoiPremium: number;
  cpi: number;
  scaledPremium: number;
  medianHomePrice: number;
  medianIncome: number;
  mortgageRate: number;
  avgLoanAmount: number;
  monthlyPi: number;
  annualPi: number;
  annualPii: number;
  monthlyPii: number;
  mortgageRatio: number;
}

export default function PastAffordabilityCard() {
  const [year, setYear] = useState<number>(2023);
  const [allData, setAllData] = useState<AffordabilityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/affordability");
        const json = await res.json();

        if (!Array.isArray(json)) {
          console.error("Unexpected API response:", json);
          setAllData([]);
          setError("API returned unexpected data format.");
          return;
        }

        setAllData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
        setAllData([]);
        setError("Failed to fetch affordability data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const minYear = allData.length ? Math.min(...allData.map(d => d.year)) : 1971;
  const maxYear = allData.length ? Math.max(...allData.map(d => d.year)) : 2023;

  const clampYear = (y: number) => Math.min(Math.max(y, minYear), maxYear);

  const data: AffordabilityData | undefined = Array.isArray(allData)
    ? allData.find((d) => d.year === year)
    : undefined;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Year selector */}
      <div className="flex gap-2">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          onBlur={(e) => {
            const newYear = clampYear(Number(e.target.value));
            if (newYear !== Number(e.target.value)) {
              alert(`Year must be between ${minYear} and ${maxYear}`);
            }
            setYear(newYear);
          }}
          className="border rounded-xl p-2 w-24 bg-white"
        />

        <button className="bg-white rounded-xl px-4 py-2 border" onClick={() => setYear(prev => clampYear(prev - 1))}>
          ◀ Prev
        </button>
        <button className="bg-white rounded-xl px-4 py-2 border" onClick={() => setYear(prev => clampYear(prev + 1))}>
          Next ▶
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Data card */}
      {data ? (
        // <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        //   <h2 className="text-xl font-bold mb-4 text-center">
        //     Home Affordability in {data.year}
        //   </h2>
        //   <ul className="space-y-2 text-slate-800">
        //     <li>
        //       <strong>Median Income:</strong> ${data.medianIncome.toLocaleString()}
        //     </li>
        //     <li>
        //       <strong>Mortgage Rate:</strong> {data.mortgageRate.toFixed(2)}%
        //     </li>
        //     <li>
        //       <strong>Median Home Price:</strong> ${data.medianHomePrice.toLocaleString()}
        //     </li>
        //     <li>
        //       <strong>Average Loan Amount:</strong> ${data.avgLoanAmount.toLocaleString()}
        //     </li>
        //     <li>
        //       <strong>Monthly PI Payment:</strong> ${data.monthlyPi.toLocaleString()}
        //     </li>
        //     <li>
        //       <strong>Monthly HOI Premium:</strong> $
        //       {(data.estHoiPremium / 12).toLocaleString(undefined, {
        //         minimumFractionDigits: 2,
        //         maximumFractionDigits: 2,
        //       })}
        //     </li>
        //     <li>
        //       <strong>Monthly PII Payment:</strong> ${data.monthlyPii.toLocaleString()}
        //     </li>
        //     <li>
        //       <strong>Mortgage Ratio:</strong> {(data.mortgageRatio * 100).toFixed(1)}%
        //     </li>
        //   </ul>
        // </div>
        <div className="w-full bg-gradient-to-t from-white to-slate-400 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2 text-center text-slate-800">
            Home Affordability in {data.year}
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Median Income</p>
              <p className="text-sm font-semibold">${data.medianIncome.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Mortgage Rate</p>
              <p className="text-sm font-semibold">{data.mortgageRate.toFixed(2)}%</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Median Home Price</p>
              <p className="text-sm font-semibold">${data.medianHomePrice.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Loan Amount (80%)</p>
              <p className="text-sm font-semibold">${data.avgLoanAmount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Monthly PI</p>
              <p className="text-sm font-semibold">${data.monthlyPi.toLocaleString()}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Mortgage Ratio</p>
              <p className="text-sm font-semibold">{(data.mortgageRatio * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Monthly HOI Premium</p>
              <p className="text-sm font-semibold">${(data.estHoiPremium / 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Monthly PI + Insurance</p>
              <p className="text-sm font-semibold">${data.monthlyPii.toFixed(2)}</p>
            </div>
          </div>
        </div>

      ) : !loading && !error ? (
        <p>No data found for year {year}.</p>
      ) : null}
    </div>
  );
}
