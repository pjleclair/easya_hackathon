import React, { useState } from 'react';

const BuyPosition = ({ selectedOutcome, selectedPosition, onBuyPosition, reset }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col text-black gap-4">
      <h3 className="text-lg font-semibold">Buy Position</h3>
      <div className="flex justify-between">
        <p className="text-lg">Outcome:</p>
        <p className="text-lg">{selectedOutcome.name}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Position:</p>
        <p className="text-lg">{selectedPosition ? "Buy" : "Sell"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Price:</p>
        <p className="text-lg">${selectedOutcome.odds}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg">Shares:</p>
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
        <p className="text-lg">{amount * selectedOutcome.odds} bUSD</p>
      </div>
      <div className="flex gap-5">
        <button
          onClick={onBuyPosition}
          className="w-40 bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Execute
        </button>
        <button
          onClick={reset}
          className="w-40 bg-gradient-to-r from-red-500 to-pink-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyPosition;
