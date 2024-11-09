import React, { useEffect, useState } from "react";
import Image from "next/image";

const MarketCard = ({ market }) => {
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

  const renderOutcomes = () => (
    <div className="h-40 overflow-auto">
      {market.outcomes.map((outcome) => (
        <div
          key={outcome.id}
          className="text-lg flex justify-between my-4 text-black">
          <span className="font-bold flex justify-between w-full px-4 items-center">
            <p>{outcome.name}:</p>
            <p>{outcome.odds}</p>
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelect(outcome, true)}
              className="w-20 bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Yes
            </button>
            <button
              onClick={() => handleSelect(outcome, false)}
              className="w-20 bg-gradient-to-r from-red-400 to-pink-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              No
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBuyPosition = () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Buy Position</h3>
      <div className="flex justify-between">
        <p className="text-lg">Outcome:</p>
        <p className="text-lg">{selectedOutcome.name}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Position:</p>
        <p className="text-lg">{selectedPosition ? "Yes" : "No"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Odds:</p>
        <p className="text-lg">{selectedOutcome.odds}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Amount:</p>
        <input
          className="w-20 text-lg border-2 border-gray-200 rounded"
          required
          type="number"
          placeholder="0"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Total:</p>
        <p className="text-lg">
          {amount * selectedOutcome.odds} STX
        </p>
      </div>
      <div className="flex gap-5">
        <button
          onClick={onBuyPosition}
          className="w-40 bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
        <button
          onClick={reset}
          className="w-40 bg-gradient-to-r from-red-500 to-pink-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 rounded-lg shadow-md h-auto bg-white text-black flex-col justify-between">
      <div className="flex justify-between gap-5 min-h-[48px] my-3">
        {market.logo && (
          <Image
            className="rounded-lg"
            width={80}
            height={60}
            src={market.logo}
            alt={`${market.name} logo`}
          />
        )}
        <h2 className="text-xl overflow-auto font-bold mb-2">{market.name}</h2>
      </div>
      <p className="text-lg h-20 mb-1">Status: {market.status}</p>
      {selectedOutcome ? renderBuyPosition() : renderOutcomes()}
    </div>
  );
};

export default MarketCard;
