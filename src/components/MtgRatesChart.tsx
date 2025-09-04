"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface MtgData {
  date: Date; // Date object for consistency
  rate30: number;
  rate15: number;
}

const ranges = {
  "3m": 90,
  "9m": 270,
  "1y": 365,
  "5y": 1825,
  max: Infinity,
} as const;

type Mode = "rate30" | "rate15" | "both";
type RangeKey = keyof typeof ranges;

export default function MortgageChart() {
  const [data, setData] = useState<MtgData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("both");
  const [range, setRange] = useState<RangeKey>("1y");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/mtg-all");
        if (!res.ok) throw new Error("Failed to fetch Mortgage Rates data");
        const json = await res.json();

        const processed = json.map((d: any) => {
          const parsedDate = new Date(d.date);
          if (isNaN(parsedDate.getTime())) throw new Error(`Invalid date: ${d.date}`);
          return {
            date: parsedDate,
            rate30: Number(d.rate30),
            rate15: Number(d.rate15),
          };
        });

        setData(processed);
      } catch (err) {
        console.error("Error fetching Mortgage Rates data:", err);
        setError("Failed to load mortgage data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading mortgage data...</p>;
  if (error) return <p>{error}</p>;

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - ranges[range]);
  let filtered = range === "max" ? data : data.filter((d) => d.date >= cutoff);

  filtered = [...filtered].sort((a, b) => a.date.getTime() - b.date.getTime());

  const maxPoints = 400;
  if (filtered.length > maxPoints) {
    const step = Math.ceil(filtered.length / maxPoints);
    filtered = filtered.filter((_, i) => i % step === 0);
  }

  return (
    <div className="p-4 space-y-4" role="region" aria-label="Mortgage Rates Chart">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-12">
        
        {/* Mode selector */}
        <div className="flex gap-2 mr-auto">
          {(["rate30", "rate15", "both"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-pressed={mode === m}
            >
              {m === "rate30" ? "30yr" : m === "rate15" ? "15yr" : "Both"}
            </button>
          ))}
        </div>

        {/* Range selector */}
        <div className="flex gap-2">
          {Object.keys(ranges).map((key) => (
            <button
              key={key}
              onClick={() => setRange(key as RangeKey)}
              className={`px-3 py-1 rounded ${
                range === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-pressed={range === key}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filtered}
          margin={{ top: 16, right: 24, bottom: 8, left: 8 }}
          aria-label="Mortgage rates over time"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d: Date) =>
              d.toLocaleDateString(undefined, {
                year: "2-digit",
                month: "short",
              })
            }
            minTickGap={24}
          />
          <YAxis domain={["auto", "auto"]}>
            <text
              x={0}
              y={0}
              dx={-40}
              dy={200}
              transform="rotate(-90)"
              textAnchor="middle"
              fill="#555"
            >
              Mortgage Rate (%)
            </text>
          </YAxis>
          <Tooltip
            formatter={(value: number) => value.toFixed(2) + "%"}
            labelFormatter={(label: Date) =>
              label.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
          />
          <Legend />

          {(mode === "rate30" || mode === "both") && (
            <Line
              type="monotone"
              dataKey="rate30"
              stroke="#1c12e4"
              dot={false}
              name="30yr Mortgage Rate"
            />
          )}
          {(mode === "rate15" || mode === "both") && (
            <Line
              type="monotone"
              dataKey="rate15"
              stroke="#e41c12"
              dot={false}
              name="15yr Mortgage Rate"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}