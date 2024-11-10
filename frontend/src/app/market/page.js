//! Maybe not use client when we get the apis
"use client";

import { useContext, useEffect, useState } from "react";
import MarketCard from "../components/MarketCard";
import { useMarket } from "../MarketContext";
import MarketDetailsPage from "../components/MarketDetailsPage";
import { createMarket, getOption } from "../utils/contractCall";
import { UserContext } from "../UserContext";

export default function Market() {
  const { markets } = useMarket();
  const [selectedMarket, setSelectedMarket] = useState(null);
  const { userData } = useContext(UserContext);
  const { getMarket, updateMarket } = useMarket();

  useEffect(() => {
    if (userData != {} && userData.profile) getOption(userData, getMarket, updateMarket);
  }, [userData]);

  return (
    <div className="flex w-full h-full">
      {selectedMarket ? (
        <MarketDetailsPage market={selectedMarket} />
      ) : (
        <div className="flex-col pb-5">
          <button
            onClick={() => createMarket(userData)}
            className="mt-4 ml-4 text-white bg-gray-800 rounded px-4 py-2">
            Create Market
          </button>
          <button
            onClick={() => getOption(userData, getMarket, updateMarket)}
            className="mt-4 ml-4 text-white bg-gray-800 rounded px-4 py-2">
            Get Market
          </button>
          <h1 className="mt-8 text-4xl font-semibold text-black text-center">
            BitBet
          </h1>
          <h4 className="mt-4 font-semibold text-black text-center">
            Decentralized prediction markets with sBTC.
          </h4>

          <div className="grid grid-cols-3 gap-4 mt-8 mx-4">
            {markets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                selectMarket={setSelectedMarket}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
