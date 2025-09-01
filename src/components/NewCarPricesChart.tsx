"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface NewCarData {
  date: string;
  cpi: number;
  priceReal: number;
  priceNominal: number;
}

export default function UsedCarPricesChart() {
  const [data, setData] = useState<NewCarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/new-car-prices");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching used car data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading new car price data...</p>;
  }

  return (
    <div className="p-6 rounded-2xl shadow-md pt-8">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="priceNominal"
            stroke="#8884d8"
            strokeWidth={2}
            name="Nominal Price"
          />
          <Line
            type="monotone"
            dataKey="priceReal"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Real Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
