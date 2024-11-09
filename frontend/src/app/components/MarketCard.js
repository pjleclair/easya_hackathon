import React from "react";
import PropTypes from "prop-types";

const MarketCard = ({ marketId, name, status, outcomes }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white text-black flex-col justify-between">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-lg mb-1">Status: {status}</p>

      {outcomes.map((outcome) => {
        return (
          <div
            key={outcome.id}
            className="text-lg flex justify-between my-4 text-black">
            {outcome.name}: {outcome.odds}
            {"% "}
            <div className="flex gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                No
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketCard;
