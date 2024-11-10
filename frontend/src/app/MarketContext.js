import React, { createContext, useState, useContext } from "react";
import marketJson from "./data/markets.json";

// Create a Context for the market data
const MarketContext = createContext();

// Create a provider component
export const MarketProvider = ({ children }) => {
  const [markets, setMarkets] = useState(marketJson);

  const getMarket = (marketId) => {
    return markets.find((market) => market.id === marketId);
  };

  const addMarket = (market) => {
    setMarkets([...markets, market]);
  };

  const removeMarket = (marketId) => {
    setMarkets(markets.filter((market) => market.id !== marketId));
  };

  const updateMarket = (updatedMarket) => {
    setMarkets(
      markets.map((market) =>
        market.id === updatedMarket.id ? updatedMarket : market,
      ),
    );
  };

  return (
    <MarketContext.Provider
      value={{ markets, getMarket, addMarket, removeMarket, updateMarket }}>
      {children}
    </MarketContext.Provider>
  );
};

// Custom hook to use the MarketContext
export const useMarket = () => {
  return useContext(MarketContext);
};
