import React, { useEffect, useState } from "react";
import MarketChart from "./MarketChart";
import Outcomes from "./Outcomes";
import BuyPosition from "./BuyPosition";

const MarketDetailsPage = ({ market }) => {
  const [selectedOutcome, setSelectedOutcome] = useState(market.outcomes[0]);
  const [selectedPosition, setSelectedPosition] = useState(true);
  const [amount, setAmount] = useState(0);

  const onBuyPosition = () => {
    if (!selectedOutcome || !selectedPosition || amount <= 0) {
      alert("Please select an outcome and position and enter a valid amount");
      return;
    }
    // Call the buy position API
    alert("Position bought successfully");
    setSelectedOutcome(null);
    setSelectedPosition(null);
    setAmount(0);
  };

  const reset = () => {
    setSelectedOutcome(null);
    setSelectedPosition(null);
    setAmount(0);
  };

  useEffect(() => {
    setSelectedOutcome(market.outcomes[0]);
    setSelectedPosition(true);
  }, [market]);

  const handleSelect = (outcome, isPositivePosition) => {
    setSelectedOutcome(outcome);
    setSelectedPosition(isPositivePosition);
  };

  return (
    <div className="w-full h-full min-h-screen p-4">
      <div className="flex items-center justify-center mx-40 my-8">
        <div className="flex-col gap-4 text-center justify-center text-black ">
          <p className="text-4xl font-semibold drop-shadow-lg">{market.name}</p>
          <p className="font-semibold">Status: {market.status}</p>
        </div>
      </div>
      <div className=" flex gap-5">
        <div className="flex-[2]">
          <div className="w-full mb-4 flex-[2]">
            <MarketChart market={market} />
          </div>
          <div className="rounded-lg bg-white p-4 ">
            <p className="text-2xl font-semibold text-black text-center">
              Market Outcomes
            </p>
            <Outcomes
              market={market}
              handleSelect={handleSelect}
              selectedOutcome={selectedOutcome}
              selectedPosition={selectedPosition}
            />
          </div>
        </div>

        <div className="h-min sticky rounded-lg bg-white p-4 flex-1">
          <BuyPosition
            selectedOutcome={selectedOutcome}
            selectedPosition={selectedPosition}
            onBuyPosition={onBuyPosition}
            amount={amount}
            setAmount={setAmount}
            reset={reset}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketDetailsPage;
