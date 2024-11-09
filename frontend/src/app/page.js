export const metadata = {
  title: "BitBet",
  description: "A decentralized prediction market platform built on Stacks",
};
//! Maybe not use client when we get the apis
"use client";

import MarketCard from "./components/MarketCard";
import { useMarket } from "./MarketContext";

export default function Home() {
  const { markets } = useMarket();

  return (
    <>
      <h1 className="mt-8 text-4xl text-center">BitBet</h1>
      <p className="mt-4 text-center">
        Decentralized prediction markets with sBTC.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8 mx-4">
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            marketId={market.id}
            name={market.name}
            status={market.status}
            outcomes={market.outcomes}
          />
        ))}
      </div>
    </>
  );
}
