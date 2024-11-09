import React, { useEffect, useState } from "react";
import Image from "next/image";
import Outcomes from "./Outcomes";
import BuyPosition from "./BuyPosition";

const MarketCard = ({ market, selectMarket }) => {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
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
    setSelectedOutcome(null);
    setSelectedPosition(null);
  }, [market]);

  const handleSelect = (outcome, isPositivePosition) => {
    setSelectedOutcome(outcome);
    setSelectedPosition(isPositivePosition);
  };

  return (
    <div className="p-4 rounded-lg shadow-md h-auto bg-white text-black flex-col justify-between">
      <div
        onClick={() => selectMarket(market)}
        className="flex hover:cursor-pointer justify-between gap-5 min-h-[48px] my-3">
        {market.logo && (
          <Image
            className="rounded-lg"
            width={80}
            height={60}
            src={market.logo}
            alt={`${market.name} logo`}
          />
        )}
        <h2 className="text-xl overflow-auto font-semibold mb-2">
          {market.name}
        </h2>
      </div>
      <p className="text-lg h-20 mb-1">Status: {market.status}</p>
      {selectedOutcome ? (
        <BuyPosition
          selectedOutcome={selectedOutcome}
          selectedPosition={selectedPosition}
          onBuyPosition={onBuyPosition}
          reset={reset}
        />
      ) : (
        <div className="h-40 overflow-auto">
          <Outcomes
            market={market}
            handleSelect={handleSelect}
            selectedPosition={selectedPosition}
            selectedOutcome={selectedOutcome}
          />
        </div>
      )}
    </div>
  );
};

export default MarketCard;
