"use client";

import React, { useState } from "react";
import PastAffordabilityCard from "@/components/Affordability";
import MortgageCalculatorCard from "@/components/MortgageCalc";

function CalcsSection() {
  const [activeCalc, setActiveCalc] = useState("affordability");

  const renderCalc = () => {
    switch (activeCalc) {
      case "mortgage":
        return <MortgageCalculatorCard/>;
      case "affordability":
        return <PastAffordabilityCard />;
      case "other":
        return <div className="p-4 text-white">[Other Calc goes here]</div>;
      default:
        return <p className="text-white">Select a calculator</p>;
    }
  };

  return (
    <div id="calculators" className="rounded-lg h-screen p-4 mt-2 pt-18">
      <div className="flex h-full grid grid-cols-4 grid-rows-8 gap-2">
        {/* Sidebar boxes */}
        <div
          className="bg-[#214469] flex rounded-lg col-start-1 row-start-2 col-span-1 row-span-1 items-center justify-center cursor-pointer hover:bg-[#2596be] transition"
          onClick={() => setActiveCalc("mortgage")}
        >
          <p className="text-white text-sm font-semibold text-center">Mortgage Calculator</p>
        </div>

        <div
          className="bg-[#214469] flex rounded-lg col-start-1 row-start-3 col-span-1 row-span-1 items-center justify-center cursor-pointer hover:bg-[#2596be] transition"
          onClick={() => setActiveCalc("affordability")}
        >
          <p className="text-white text-sm font-semibold text-center">Affordability By Year</p>
        </div>

        <div
          className="bg-[#214469] flex rounded-lg col-start-1 row-start-4 col-span-1 row-span-1 items-center justify-center cursor-pointer hover:bg-[#2596be] transition"
          onClick={() => setActiveCalc("other")}
        >
          <p className="text-white text-sm font-semibold text-center">Other Calc</p>
        </div>

        <div className="rounded-lg col-start-2 row-start-1 col-span-3 row-span-7 p-0">
          {renderCalc()}
        </div>
      </div>
    </div>
  );
}

export default CalcsSection;
