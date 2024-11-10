import React from "react";

const Outcomes = ({
  market,
  handleSelect,
  isActive = true,
  selectedOutcome,
  selectedPosition,
}) => {
  return (
    <>
      {market.outcomes.map((outcome) => (
        <div
          key={outcome.id}
          className={`text-lg flex justify-between my-4 text-black`}>
          <span className="font-semibold flex justify-between w-full px-4 items-center">
            <p>{outcome.name}:</p>
            <p>{(outcome.odds * 100).toFixed(2)}%</p>
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelect(outcome, true)}
              className={`w-20 bg-gradient-to-r  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                !selectedOutcome ||
                (isActive &&
                  selectedOutcome.id == outcome.id &&
                  selectedPosition)
                  ? "from-green-400 to-blue-500"
                  : "from-green-200 to-blue-300"
              }`}>
              Buy
            </button>
            <button
              onClick={() => handleSelect(outcome, false)}
              className={`w-20 bg-gradient-to-r  hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ${
                !selectedOutcome ||
                (isActive &&
                  selectedOutcome.id == outcome.id &&
                  !selectedPosition)
                  ? "from-red-400 to-pink-500"
                  : "from-red-300 to-pink-200"
              }`}>
              Sell
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Outcomes;
