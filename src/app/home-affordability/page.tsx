'use client'

import PastAffordabilityCard from "@/components/Affordability";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">
        <div>
            <h1 className="text-xl font-semibold text-center mb-4 text-[#0d122c]">Home Affordability by Year</h1>
            <p className="text-center px-10 text-[#0d122c]">
                Track U.S. home affordability from 1971 through 2023. Most of the data is sourced from FRED. Homeowner&apos;s insurance premiums are estimated by scaling the Property and Casualty PPI to 2023 national averages and adjusting for inflation. The Principal + Interest + Insurance (PII) ratio shows how much of a typical family&apos;s income would go toward owning a home each year, helping to illustrate real trends in housing costs over time.
            </p>
        </div>
        <div className="rounded-xl p-6 shadow-xl">
            <PastAffordabilityCard/>
        </div>

    </main>
  );
}