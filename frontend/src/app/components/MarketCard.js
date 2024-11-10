import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Outcomes from "./Outcomes";
import BuyPosition from "./BuyPosition";
import { buyOption, sellOption } from "../utils/contractCall";
import { UserContext } from "../UserContext";

const MarketCard = ({ market, selectMarket }) => {
  const { userData } = useContext(UserContext);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [amount, setAmount] = useState(0);

  const onBuyPosition = async () => {
    if (
      userData == {} ||
      !selectedOutcome ||
      selectedPosition == null ||
      amount <= 0
    ) {
      alert("Please select an outcome and position and enter a valid amount");
      console.log(selectedOutcome, selectedPosition, amount);

      return;
    }

    const action =
      (selectedOutcome.id == 1 && selectedPosition) ||
      (selectedOutcome.id == 2 && !selectedPosition)
        ? buyOption
        : sellOption;
    await action(userData, selectedOutcome.id, amount);

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
          amount={amount}
          setAmount={setAmount}
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
