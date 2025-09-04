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
  Label,
} from "recharts";

interface CpiData {
  Date: string;
  CPI: number;
}

interface CpiChartProps {
  fromYear: number;
  toYear: number;
}

export default function CpiChart({ fromYear, toYear }: CpiChartProps) {
  const [data, setData] = useState<CpiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/get-cpi");
        const json = await res.json();
        const rawData = Array.isArray(json) ? json : json.data ?? [];

        const processed = rawData.map((d: CpiData) => ({
          Date: d.Date,
          CPI: Number(d.CPI),
        }));

        setData(processed);
      } catch (err) {
        console.error("Error fetching CPI data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading CPI data...</p>;
  }

  // Filter by years from props
  const filtered = data.filter((d) => {
    const year = new Date(d.Date).getFullYear();
    return year >= fromYear && year <= toYear;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filtered} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Date"
            tickFormatter={(d: string) =>
              new Date(d).toLocaleDateString(undefined, {
                year: "2-digit",
                month: "short",
              })
            }
            minTickGap={24}
          />
          <YAxis domain={["auto", "auto"]}>
            <Label 
              value="Index 1982-1984=100" 
              angle={-90} 
              position="insideLeft" 
              style={{ textAnchor: "middle" }} 
            />
          </YAxis>
          <Tooltip
            formatter={(value: number) => value.toFixed(2)}
            labelFormatter={(label: string) =>
              new Date(label).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="CPI"
            stroke="#1c12e4"
            name="Consumer Price Index (CPI)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
