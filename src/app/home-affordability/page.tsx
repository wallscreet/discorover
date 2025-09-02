'use client'

import PastAffordabilityCard from "@/components/Affordability";
import { CircleDollarSign } from "lucide-react";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">

        <div className="">
            <div>
              <h1 className="text-xl font-semibold text-center mb-4 text-[#0d122c]">Home Affordability by Year</h1>
                <div className="flex items-center my-2 mb-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                        <CircleDollarSign className="mx-4 text-gray-400 w-4 h-4" />
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <p className="text-center px-10 text-md mb-4">
                    Track U.S. home affordability from 1971 through 2023. Most of the data is sourced from FRED. Homeowner&apos;s insurance premiums are estimated by scaling the Property and Casualty PPI to 2023 national averages and adjusting for inflation. The Principal + Interest + Insurance (PII) ratio shows how much of a typical family&apos;s income would go toward owning a home each year, helping to illustrate real trends in housing costs over time.
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
        </div>
        
        <div className="rounded-xl p-6 shadow-xl">
            <PastAffordabilityCard/>
        </div>

    </main>
  );
}