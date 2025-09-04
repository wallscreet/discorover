"use client";
import React, { useState } from "react";

function MortgageCalculatorCard() {
  // form state
  const [loan, setLoan] = useState(300000);
  const [rate, setRate] = useState(6.5); // %
  const [years, setYears] = useState(30);

  // computed payment
  const monthlyPayment = React.useMemo(() => {
    const principal = loan;
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;

    if (monthlyRate === 0) return principal / n;

    return (
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -n))
    );
  }, [loan, rate, years]);

  return (
    <div className="bg-white h-full rounded-lg shadow p-6 flex flex-col mx-auto">
      <h2 className="text-xl font-bold text-[#214469] mb-4 text-center">
        Payment Calculator
      </h2>

      {/* Loan Amount */}
      <label className="mb-2 text-sm font-medium text-gray-700">
        Loan Amount ($)
      </label>
      <input
        type="number"
        value={loan}
        onChange={(e) => setLoan(Number(e.target.value))}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Interest Rate */}
      <label className="mb-2 text-sm font-medium text-gray-700">
        Interest Rate (%)
      </label>
      <input
        type="number"
        step="0.01"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Loan Term */}
      <label className="mb-2 text-sm font-medium text-gray-700">
        Term (Years)
      </label>
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Output */}
      <div className="mt-auto">
        <p className="text-lg font-semibold text-gray-800">
          Monthly Payment:
        </p>
        <p className="text-2xl font-bold text-[#2596be]">
          ${monthlyPayment.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default MortgageCalculatorCard;
