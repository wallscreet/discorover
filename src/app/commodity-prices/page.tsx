'use client'

import dynamic from "next/dynamic";
import { ChartCandlestick } from "lucide-react";

// Avoid SSR for recharts
const CommodityPriceChart = dynamic(
  () => import("@/components/CommodityPrices"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pt-18 lg:pt-20">
      
      <div className="gap-6">       
        <h1 className="text-2xl font-semibold text-center mb-4 text-center">
            Commodity Prices — Nominal vs Real
        </h1>
      </div>

      <div>
          <div className="flex items-center my-2 mb-4">
              <div className="flex-grow border-t border-gray-300"></div>
                  <ChartCandlestick className="mx-4 text-gray-400 w-4 h-4" />
              <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <p className="text-center px-10 text-md mb-6">
              This chart shows the price of everyday commodities over time, adjusted for inflation. You can use the dropdown to switch between different items and see both the nominal (actual) price and the real price in today&apos;s dollars side by side. It&apos;s a simple way to track how costs have really changed, beyond the original price tag.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <CommodityPriceChart />
    </main>
  );
}