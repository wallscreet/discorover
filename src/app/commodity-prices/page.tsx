'use client'

import dynamic from "next/dynamic";

// Avoid SSR for recharts
const CommodityPriceChart = dynamic(
  () => import("@/components/CommodityPrices"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">
      <h1 className="text-xl font-semibold text-center mb-4">Commodity Prices — Nominal vs Real</h1>
      <p className="text-center px-10">This chart shows the price of everyday commodities over time, adjusted for inflation. You can use the dropdown to switch between different items and see both the nominal (actual) price and the real price in today's dollars side by side. It’s a simple way to track how costs have really changed, beyond just the number on the tag.</p>
      <CommodityPriceChart />
    </main>
  );
}