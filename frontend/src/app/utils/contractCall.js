import {
  uintCV,
  PostConditionMode,
  callReadOnlyFunction,
  cvToString,
} from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";

const contractAddress = "ST1ZGCN5D7C3MZZY4GC31F8ANDD5VHS5FQ7HEKNQR";
const contractName = "fair-turquoise-ferret";

const createMarket = async (userData) => {
  if (!userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionArgs = [uintCV(4), uintCV(5000)];
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
    },
  };
  await openContractCall(txOptions);
};

const getOption = async (userData, getMarket, updateMarket) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "get-option";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

  const optionIDs = [uintCV(1), uintCV(2)];

  optionIDs.forEach(async (optionID) => {
    const functionArgs = [optionID];
    const options = {
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      network,
      senderAddress,
      onFinish: (data) => {
        console.log(data);
      },
    };

    const result = await callReadOnlyFunction(options);

    const resultString = cvToString(result);
    const resultArray = resultString.split(" ");
    const price = resultArray[3].replace("u", "").replaceAll(")", "");

    const market = getMarket(optionID.value.toString().replace("n", ""));
    market.outcomes[0].odds = parseInt(price) / 10000;
    market.outcomes[1].odds = 1 - parseInt(price) / 10000;
    updateMarket(market);
  });
};

const buyOption = async (userData, optionID, amount) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "buy-option";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

  const functionArgs = [uintCV(optionID), uintCV(amount)];

  const options = {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network,
    senderAddress,
    onFinish: (data) => {
      console.log(data);
    },
  };

  await openContractCall(options);
};
const sellOption = async (userData, optionID, amount) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "sell-option";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

  const functionArgs = [uintCV(optionID), uintCV(amount)];

  const options = {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network,
    senderAddress,
    onFinish: (data) => {
      console.log(data);
    },
  };

  await openContractCall(options);
};

export { createMarket, getOption, buyOption, sellOption };
