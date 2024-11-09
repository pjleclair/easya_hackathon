//! Maybe not use client when we get the apis
"use client";

import { useState } from "react";
import MarketCard from "../components/MarketCard";
import { useMarket } from "../MarketContext";
import MarketChart from "../components/MarketChart";
import MarketDetailsPage from "../components/MarketDetailsPage";

// export const metadata = {
//   title: "BitBet",
//   description: "A decentralized prediction market platform built on Stacks",
// };

export default function Market() {
  const { markets } = useMarket();
  const [selectedMarket, setSelectedMarket] = useState(null);

  return (
    <div className="flex w-full h-full">
      {selectedMarket ? (
        <MarketDetailsPage market={selectedMarket} />
      ) : (
        <div className="flex-col pb-5">
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
