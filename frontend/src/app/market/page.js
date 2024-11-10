//! Maybe not use client when we get the apis
"use client";

import { useContext, useState } from "react";
import MarketCard from "../components/MarketCard";
import { useMarket } from "../MarketContext";
import MarketDetailsPage from "../components/MarketDetailsPage";
import { UserContext } from "../UserContext";
import { uintCV, PostConditionMode } from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import { StacksMocknet, StacksTestnet } from "@stacks/network";

export default function Market() {
  const { markets } = useMarket();
  const [selectedMarket, setSelectedMarket] = useState(null);
  const { userData } = useContext(UserContext);

  const createMarket = async () => {
    // if (!userData.profile.stxAddress.testnet) {
    //   alert("Please connect your wallet to create a market.");
    //   return;
    // }
    // const senderKey = userData.appPrivateKey;
    // const stacksAddress = userData.profile.stxAddress.testnet;
      const functionArgs = [
        uintCV(2),
        uintCV(100)
      ];

    const contractAddress = "ST1ZGCN5D7C3MZZY4GC31F8ANDD5VHS5FQ7HEKNQR"; // Replace with your contract address
    const contractName = "fair-turquoise-ferret"; // Replace with your contract name
    const functionName = "create-option"; // Function for deposit

    const txOptions = {
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
      network: new StacksTestnet(),
      onFinish: (data) => {
        console.log(data);
      }
    };
    await openContractCall(txOptions);
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
