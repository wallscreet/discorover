'use client'

import dynamic from "next/dynamic";
import Image from "next/image";
import { CarFront } from "lucide-react";

// Avoid SSR for recharts
const CarPricesChart = dynamic(
  () => import("@/components/CarPricesChart"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pt-18 lg:pt-20">
        
        <div className="gap-6">       
          <h1 className="text-xl text-[#0c122d] font-semibold text-center mb-4 text-center">
              Car Prices — Nominal vs Real
          </h1>
        </div>

        <div>
            <div className="flex items-center my-2 mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                    <CarFront className="mx-4 text-gray-400 w-4 h-4" />
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <p className="text-center px-10 text-md mb-4">
                This chart shows the history of new and used car prices from 1971 to current, adjusted for inflation (real) compared to their nominal values. This helps better visualize how affordability has shifted over time.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
        
        <div> 
          <CarPricesChart />
        </div>

    </main>
  );
}
