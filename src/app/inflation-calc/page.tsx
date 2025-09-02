'use client'

import InflationScaler from "@/components/ScaleForInflation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChartSpline } from "lucide-react";


export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">
        
        <div className="gap-6">       
          <h1 className="text-2xl font-semibold text-center mb-4 text-center">
              CPI Inflation Calculator
          </h1>
        </div>

        <div>
            <div className="flex items-center my-2 mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                    <ChartSpline className="mx-4 text-gray-400 w-4 h-4" />
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <p className="text-center px-10 text-md mb-4">
                This Inflation Calculator lets you compare the value of U.S. dollars across time using official Consumer Price Index (CPI) data from the Federal Reserve Economic Data (FRED). The tool adjusts amounts for inflation between any two years from 1947 to the present, so you can see how purchasing power has changed.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>

        <div> 
            <InflationScaler/>
        </div>

    </main>
  );
}

// SEO meta description to add to SEO component: Calculate inflation from 1947 to today using official CPI data from FRED. See what past dollars are worth in today’s money.