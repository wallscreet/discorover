'use client';

import { useState } from 'react';

interface InflationScaledResult {
  from_year: number;
  to_year: number;
  original_amount: number;
  scaled_amount: number;
}

export default function InflationScaler() {
  const [fromYear, setFromYear] = useState(1980);
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState<InflationScaledResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/scale-for-inflation?from_year=${fromYear}&to_year=${toYear}&amount=${amount}`
      );
      if (!res.ok) throw new Error("Failed to fetch result");
      const data: InflationScaledResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-[#0c122d] font-medium">From Year</label>
            <input
              type="number"
              value={fromYear}
              onChange={(e) => setFromYear(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-[#0c122d] font-medium">To Year</label>
            <input
              type="number"
              value={toYear}
              onChange={(e) => setToYear(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#0c122d] font-medium">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {result && (
          <div className="p-3 border rounded-lg bg-gray-50 text-[#0c122d]">
            <p>
              ${result.original_amount.toFixed(2)} in {result.from_year} ≈{" "}
              <strong className="text-[#0c122d]">
                ${result.scaled_amount.toFixed(2)}
              </strong>{" "}
              in {result.to_year}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Scale"}
        </button>
      </form>
    </div>
  );
}
