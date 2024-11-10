import { showConnect } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";
import React, { useState } from "react";
import Image from "next/image";
import profile from "./assets/profile.svg";

export default function ConnectWallet({ userSession, userData, setUserData }) {
  const [showDisconnect, setShowDisconnect] = useState(false);

  //log the userData to the console to see what it contains
  console.log(userData);

  const connectWallet = () => {
    showConnect({
      userSession,
      network: StacksTestnet,
      appDetails: {
        name: "Lagoon",
        icon: "https://freesvg.org/img/bitcoin.png",
      },
      onFinish: () => {
        window.location.reload();
      },
      onCancel: () => {
        // handle if user closed connection prompt
      },
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut(window.location.origin);
    setUserData({});
  };

  return (
    <div className="m-5 flex-col bg-white rounded-lg shadow-md p-4 text-black gap-4">
      {userData.profile ? (
        <>
          <div className="flex gap-4 items-center justify-center">
            {"..." + userData.profile.stxAddress.testnet.slice(-5)}
            <Image
              onClick={() => setShowDisconnect(!showDisconnect)}
              className="rounded-lg hover:cursor-pointer transition duration-500 ease-in-out"
              width={50}
              height={50}
              src={profile}
              alt="profile"
            />
          </div>

          <button
            className={`px-4 py-2 mt-4 font-semibold text-white transition duration-500 ease-in-out rounded bg-red-500 hover:bg-red-700 ${
              !showDisconnect ? "hidden" : ""
            }`}
            onClick={disconnectWallet}>
            Disconnect
          </button>
        </>
      ) : (
        <button
          className="px-4 w-64 py-2 font-semibold text-white transition duration-500 ease-in-out rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500"
          onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
