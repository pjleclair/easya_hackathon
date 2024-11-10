//! Maybe not use client when we get the apis
"use client";

import { useContext, useState } from "react";
import MarketCard from "../components/MarketCard";
import { useMarket } from "../MarketContext";
import MarketDetailsPage from "../components/MarketDetailsPage";
import { UserContext } from "../UserContext";
import {
  broadcastTransaction,
  FungibleConditionCode,
  makeContractCall,
  makeStandardSTXPostCondition,
  uintCV,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";

export default function Market() {
  const { markets } = useMarket();
  const [selectedMarket, setSelectedMarket] = useState(null);
  const { userData } = useContext(UserContext);

  const createMarket = async () => {
    if (!userData.profile.stxAddress.testnet) {
      alert("Please connect your wallet to create a market.");
      return;
    }
    const senderKey = userData.appPrivateKey;
    const stacksAddress = userData.profile.stxAddress.testnet;

    const txOptions = {
      contractAddress: "ST1ZGCN5D7C3MZZY4GC31F8ANDD5VHS5FQ7HEKNQR",
      contractName: "fair-turquoise-ferret",
      functionName: "create-option",
      functionArgs: [uintCV(1), uintCV(100000)], // Adjust these values as needed
      senderKey: senderKey,
      network: new StacksTestnet(),
      fee: 3000, // Increase fee in microSTX
      postConditions: [
        makeStandardSTXPostCondition(
          stacksAddress,
          FungibleConditionCode.LessEqual,
          1500, // Adjust post condition to match your token amount
        ),
      ],
    };

    try {
      const transaction = await makeContractCall(txOptions);
      const result = await broadcastTransaction(
        transaction,
        new StacksTestnet(),
      );
      console.log(result);
      alert("Market created successfully! " + result.txid);
    } catch (error) {
      console.error(error);
      alert("Failed to create market: " + error.message);
    }
  };

  return (
    <div className="flex w-full h-full">
      {selectedMarket ? (
        <MarketDetailsPage market={selectedMarket} />
      ) : (
        <div className="flex-col pb-5">
          <button
            onClick={createMarket}
            className="mt-4 ml-4 text-white bg-gray-800 rounded px-4 py-2">
            Create Market
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
