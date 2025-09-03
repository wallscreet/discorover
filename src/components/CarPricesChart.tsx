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

interface CarPricesData {
    date: string;
    newCpi: number;
    newPriceReal: number;
    newPriceNominal: number;
    usedCpi: number;
    usedPriceReal: number;
    usedPriceNominal: number;
}

// Example chart component
export default function CarPriceChart() {
    const [data, setData] = useState<CarPricesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<"new" | "used">("new");

    useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch("/api/car-prices");
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

    // Map API fields to chart-friendly format
    const mappedData = data.map((d) => {
    if (selected === "new") {
        return {
        date: d.date,
        real: d.newPriceReal,
        nominal: d.newPriceNominal,
        };
    } else {
        return {
        date: d.date,
        real: d.usedPriceReal,
        nominal: d.usedPriceNominal,
        };
    }
    });

    return (
    <div className="p-4">
        <div className="mb-4 flex gap-2 justify-center">
            <button
                onClick={() => setSelected("new")}
                className={`px-4 py-2 rounded ${
                selected === "new" ? "bg-blue-700 text-white font-semibold" : "bg-slate-200"
                }`}
            >
                New Cars
            </button>
            <button
                onClick={() => setSelected("used")}
                className={`px-4 py-2 rounded ${
                selected === "used" ? "bg-blue-700 text-white font-semibold" : "bg-slate-200"
                }`}
            >
                Used Cars
            </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mappedData} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="date"
                tickFormatter={(d) =>
                    new Date(d).toLocaleDateString(undefined, { year: "2-digit", month: "short" })
                }
                minTickGap={24}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
                type="monotone" 
                dataKey="real" 
                stroke="#1c12e4ff" 
                name="Real Price" 
                dot={false}
            />
            <Line
                type="monotone"
                dataKey="nominal"
                stroke="#08c952ff"
                name="Nominal Price"
                dot={false}
            />
        </LineChart>
        </ResponsiveContainer>
    </div>
    );
    }
