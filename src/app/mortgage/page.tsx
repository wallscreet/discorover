'use client'

import MortgageCalculatorCard from "@/components/MortgageCalc";
import MortgageChart from "@/components/MtgRatesChart";
import { 
    ChartSpline, 
    House, 
    Banknote 
} from "lucide-react";



export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pt-18 lg:pt-20">
        
        <div className="gap-6">       
          <h1 className="text-2xl font-semibold text-center mb-4 text-center text-[#214469]">
              Mortgage Hub
          </h1>
        </div>

        <div>
            <div className="flex items-center my-2 mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                    <House className="mx-4 text-gray-400 w-5 h-5" />
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <p className="text-center px-10 text-md mb-4">
                Welcome to our Mortgage Hub, the one stop spot to explore rates, plan payments, and see what you can really afford. Dive into interactive charts of 30 and 15 year mortgage rates, experiment with payment scenarios, and get a clear picture of your buying power. If you&apos;re buying, refinancing, or just curious, this hub puts all the insights you need in one place.
            </p>
            {/* <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div> */}
        </div>

        {/* Rates Chart */}
        <div>
             
            <div className="flex items-center my-2 mt-8 mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                    <ChartSpline className="mx-4 text-gray-400 w-4 h-4" />
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <h2 className="text-xl font-bold text-[#214469] mb-4 text-center">
                Interest Rate History
            </h2>

            <div className="max-w-4xl mx-auto px-8"> 
                <MortgageChart/>
            </div>
        </div>

        {/* Mortgage Calc */}
        <div className="">
            <div className="flex items-center my-2 mt-8">
                <div className="flex-grow border-t border-gray-300"></div>
                    <Banknote className="mx-4 text-gray-400 w-6 h-6" />
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="max-w-4xl mx-auto px-8 max-w-xl"> 
                <MortgageCalculatorCard />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>

    </main>
  );
}