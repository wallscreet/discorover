import React from 'react'

// TODO: Fetch sorted last record from gov-data routes. national debt will use a separate feed. 

function UsMetrics() {
  return (
    <div className="bg-gradient-to-t from-white to-[#214469] rounded-xl w-full h-100 flex grid grid-cols-3 grid-rows-4 gap-2 p-4 mt-4 mb-4">
        <div className="bg-white rounded-xl row-span-2 col-span-3 row-start-1 col-start-1 flex flex-col items-center justify-center shadow-lg">
            <p className="font-semibold text-2xl pb-5 text-center">U.S. National Debt</p>
            <p className="font-semibold text-3xl sm:text-5xl pb-4 text-red-800 text-center">$37,234,066,149,278.96</p>
        </div>
        <div className="bg-white rounded-xl row-span-2 col-span-1 row-start-3 col-start-1 flex flex-col items-center justify-center shadow-lg">
            <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">6.58%</p>
            <p className="text-sm text-center">30yr Mortgage</p>
        </div>
        <div className="bg-white rounded-xl row-span-2 col-span-1 row-start-3 col-start-2 flex flex-col items-center justify-center shadow-lg">
            <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">4.33%</p>
            <p className="text-sm text-center">Fed Funds Rate</p>
        </div>
        <div className="bg-white rounded-xl row-span-2 col-span-1 row-start-3 col-start-3 flex flex-col items-center justify-center shadow-lg">
            <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">4.36%</p>
            <p className="text-sm text-center">SOFR</p>
        </div>
    </div>
  )
}

export default UsMetrics
// "use client";
// import React, { useEffect, useState } from "react";

// function UsMetrics() {
//   const [debt, setDebt] = useState<string | null>(null);
//   const [mortgage, setMortgage] = useState<string | null>(null);
//   const [fedFunds, setFedFunds] = useState<string | null>(null);
//   const [sofr, setSofr] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchMetric(url: string, setter: (val: string) => void, formatter?: (n: number) => string) {
//       try {
//         const res = await fetch(url);
//         const data = await res.json();
//         if (data.value !== undefined) {
//           const val = formatter ? formatter(data.value) : String(data.value);
//           setter(val);
//         }
//       } catch (e) {
//         console.error("Error fetching metric:", url, e);
//       }
//     }

//     fetchMetric("/api/national-debt", setDebt, (n) =>
//       new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n)
//     );

//     fetchMetric("/api/mortgage-rate", setMortgage, (n) => `${n.toFixed(2)}%`);
//     fetchMetric("/api/fed-funds", setFedFunds, (n) => `${n.toFixed(2)}%`);
//     fetchMetric("/api/sofr", setSofr, (n) => `${n.toFixed(2)}%`);
//   }, []);

//   return (
//     <div className="bg-gradient-to-t from-white to-[#214469] rounded-xl w-full h-100 flex grid grid-cols-3 grid-rows-4 gap-2 p-4 mt-4 mb-4">
//       {/* National Debt */}
//       <div className="bg-white rounded-xl row-span-2 col-span-3 flex flex-col items-center justify-center shadow-lg">
//         <p className="font-semibold text-2xl pb-5 text-center">U.S. National Debt</p>
//         <p className="font-semibold text-3xl sm:text-5xl pb-4 text-red-800 text-center">
//           {debt ?? "Loading..."}
//         </p>
//       </div>

//       {/* Mortgage */}
//       <div className="bg-white rounded-xl row-span-2 col-span-1 flex flex-col items-center justify-center shadow-lg">
//         <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">{mortgage ?? "..."}</p>
//         <p className="text-sm text-center">30yr Mortgage</p>
//       </div>

//       {/* Fed Funds */}
//       <div className="bg-white rounded-xl row-span-2 col-span-1 flex flex-col items-center justify-center shadow-lg">
//         <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">{fedFunds ?? "..."}</p>
//         <p className="text-sm text-center">Fed Funds Rate</p>
//       </div>

//       {/* SOFR */}
//       <div className="bg-white rounded-xl row-span-2 col-span-1 flex flex-col items-center justify-center shadow-lg">
//         <p className="text-3xl sm:text-4xl font-semibold pb-4 text-center">{sofr ?? "..."}</p>
//         <p className="text-sm text-center">SOFR</p>
//       </div>
//     </div>
//   );
// }

// export default UsMetrics;
