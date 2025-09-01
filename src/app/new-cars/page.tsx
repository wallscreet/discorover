'use client'

import dynamic from "next/dynamic";

// Avoid SSR for recharts
const NewCarPricesChart = dynamic(
  () => import("@/components/NewCarPricesChart"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">
        <h1 className="text-xl font-semibold text-center mb-4">
            New Car Prices — Nominal vs Real
        </h1>
            <p className="text-center px-10">
                This chart shows the history of new car prices from 1971 to current, adjusted for inflation (real) compared to their nominal values. It helps visualize how affordability has shifted over time.
            </p>

        <NewCarPricesChart />
    </main>
  );
}
