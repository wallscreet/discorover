"use client";

import { useEffect, useState, useMemo } from "react";
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

const COMMODITY_OPTIONS = [
  { label: "Eggs (Dozen)", key: "eggs", realKey: "eggsReal" },
  { label: "Bacon (1lb)", key: "bacon", realKey: "baconReal" },
  { label: "Milk (Gallon)", key: "milk", realKey: "milkReal" },
  { label: "Bread (1lb)", key: "bread", realKey: "breadReal" },
  { label: "Ground Beef (1lb)", key: "beef", realKey: "beefReal" },
  { label: "Coffee (1lb)", key: "coffee", realKey: "coffeeReal" },
  { label: "Gas (Gallon)", key: "gas", realKey: "gasReal" },
  { label: "Electric (kWh)", key: "electric", realKey: "electricReal" },
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

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data.map((row) => ({
      date: row.date,
      nominal: row[selected.key as keyof CommodityData] as number,
      real: row[selected.realKey as keyof CommodityData] as number,
    }));
  }, [data, selected]);

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

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString(undefined, { year: "2-digit", month: "short" })
              }
              minTickGap={24}
            />
            <YAxis />
            <Tooltip
              formatter={(val: number | string, name: string) => [
                typeof val === "number" ? val.toFixed(2) : val,
                name,
              ]}
              labelFormatter={(label: string) =>
                new Date(label).toLocaleDateString(undefined, { year: "numeric", month: "short" })
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="nominal"
              name={`${selected.label} (Nominal)`}
              stroke="#251ea8ff"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="real"
              name={`${selected.label} (Real)`}
              stroke="#1dd162ff"
              strokeDasharray="4 2"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
