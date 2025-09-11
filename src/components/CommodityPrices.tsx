"use client";

import React, { useEffect, useState, useMemo } from "react";
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

interface CommodityData {
  date: string;
  bacon: number | null;
  baconReal: number | null;
  eggs: number | null;
  eggsReal: number | null;
  milk: number | null;
  milkReal: number | null;
  bread: number | null;
  breadReal: number | null;
  beef: number | null;
  beefReal: number | null;
  coffee: number | null;
  coffeeReal: number | null;
  gas: number | null;
  gasReal: number | null;
  electric: number | null;
  electricReal: number | null;
  chicken: number | null;
  chickenReal: number | null;
}

const COMMODITY_OPTIONS = [
  { label: "Eggs (Dozen)", key: "eggs", realKey: "eggsReal" },
  { label: "Bacon (1lb)", key: "bacon", realKey: "baconReal" },
  { label: "Milk (Gallon)", key: "milk", realKey: "milkReal" },
  { label: "Bread (1lb)", key: "bread", realKey: "breadReal" },
  { label: "Ground Beef (1lb)", key: "beef", realKey: "beefReal" },
  { label: "Coffee (1lb)", key: "coffee", realKey: "coffeeReal" },
  { label: "Gas (Gallon)", key: "gas", realKey: "gasReal" },
  { label: "Electric (kWh)", key: "electric", realKey: "electricReal" },
  { label: "Chicken (1lb)", key: "chicken", realKey: "chickenReal" },
] as const;

type CommodityOption = typeof COMMODITY_OPTIONS[number];

export default function CommodityChart() {
  const [data, setData] = useState<CommodityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<CommodityOption>(COMMODITY_OPTIONS[0]);

  useEffect(() => {
    fetch("/api/all-commodity-prices")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: CommodityData[]) => {
        setData(json);
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));
  }, []);

  const rawChartData = useMemo(() => {
    if (!data.length) return [] as { date: number | null; nominal: number | null; real: number | null }[];
    return data.map((row) => {
      const parsed = Date.parse(row.date);
      const date = Number.isNaN(parsed) ? null : parsed;
      const nominalVal = row[selected.key as keyof CommodityData];
      const realVal = row[selected.realKey as keyof CommodityData];

      const nominal = nominalVal === undefined ? null : (nominalVal as number | null);
      const real = realVal === undefined ? null : (realVal as number | null);

      return { date, nominal, real };
    });
  }, [data, selected]);

  const chartData = useMemo(() => {
    return rawChartData
      .filter((r) => r.date !== null && (r.nominal !== null || r.real !== null))
      .map((r) => ({ date: r.date as number, nominal: r.nominal, real: r.real }));
  }, [rawChartData]);

  const xDomain = useMemo(() => {
    if (!chartData.length) return [0, 0];
    const dates = chartData.map((d) => d.date);
    const min = Math.min(...dates);
    const max = Math.max(...dates);
    if (min === max) {
      const pad = 24 * 60 * 60 * 1000;
      return [min - pad, max + pad];
    }
    return [min, max];
  }, [chartData]);

  if (loading) return <div className="text-gray-500">Loading commodity data…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4 rounded-xl p-6 shadow-xl">
      <div>
        <label className="mr-2 text-sm font-medium">Select Commodity:</label>
        <select
          className="border rounded-md px-2 py-1"
          value={selected.key}
          onChange={(e) => {
            const option = COMMODITY_OPTIONS.find((o) => o.key === e.target.value);
            if (option) setSelected(option);
          }}
        >
          {COMMODITY_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {chartData.length === 0 ? (
        <div className="text-gray-600">No data available for {selected.label}.</div>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={xDomain as [number, number]}
                tickFormatter={(ts) =>
                  new Date(Number(ts)).toLocaleDateString(undefined, { year: "2-digit", month: "short" })
                }
                minTickGap={24}
              />
              <YAxis />
              <Tooltip
                formatter={(
                  value: number | string | (number | string)[] | null | undefined,
                  name: string
                ) => {
                  let displayValue: string;
                  if (Array.isArray(value)) {
                    displayValue = value.map((v) =>
                      v === null || v === undefined ? "—" : Number(v).toFixed(2)
                    ).join(", ");
                  } else if (value === null || value === undefined) {
                    displayValue = "—";
                  } else if (typeof value === "number") {
                    displayValue = value.toFixed(2);
                  } else {
                    displayValue = value;
                  }
                  return [displayValue, name];
                }}
                labelFormatter={(label: number) =>
                  new Date(Number(label)).toLocaleDateString(undefined, { year: "numeric", month: "short" })
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="nominal"
                name={`${selected.label} (Nominal)`}
                stroke="#251ea8ff"
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="real"
                name={`${selected.label} (Real)`}
                stroke="#1dd162ff"
                strokeDasharray="4 2"
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
