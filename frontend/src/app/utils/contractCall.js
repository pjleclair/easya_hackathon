import {
  uintCV,
  PostConditionMode,
  callReadOnlyFunction,
  cvToString,
} from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";

const contractAddress = "ST1ZGCN5D7C3MZZY4GC31F8ANDD5VHS5FQ7HEKNQR";
const contractName = "bitbetv2";

const createMarket = async (userData) => {
  if (!userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const markets = [
    [uintCV(1), uintCV(1000)],
    // [uintCV(2), uintCV(2000)],
    // [uintCV(3), uintCV(3000)],
    // [uintCV(4), uintCV(4000)],
    // [uintCV(5), uintCV(5000)],
    // [uintCV(6), uintCV(6000)],
    // [uintCV(7), uintCV(7000)],
    // [uintCV(8), uintCV(8000)],
    // [uintCV(9), uintCV(9000)],
  ];

  markets.forEach(async (market) => {
    const functionArgs = market;
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
    await openContractCall(txOptions)
      .then((data) => {
        alert("Success");
        console.log(data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  });
};

const getAllOptions = async (userData, getMarket, updateMarket) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "get-option";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

  const optionIDs = [
    uintCV(1),
    // uintCV(2),
    // uintCV(3),
    // uintCV(4),
    // uintCV(5),
    // uintCV(6),
    // uintCV(7),
    // uintCV(8),
    // uintCV(9),
  ];

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
    console.log("resultString for ", optionID, resultString);
    if (resultString === undefined) {
      return;
    }
    const resultArray = resultString.split(" ");
    console.log("resultArray for ", optionID, resultArray);
    const price = resultArray[3].replace("u", "").replaceAll(")", "");

    const market = getMarket(optionID.value.toString().replace("n", ""));
    market.outcomes[0].odds = parseInt(price) / 10000;
    market.outcomes[1].odds = 1 - parseInt(price) / 10000;
    updateMarket(market);
  });
};

const getOption = async (userData, optionID, getMarket, updateMarket) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "get-option";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

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
};

const fetchBtcRate = async (userData, optionID, getMarket, updateMarket) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "fetch-price-btc";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

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

  console.log(result);
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

  await openContractCall(options)
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

  await openContractCall(options)
};
const stake = async (userData, amount) => {
  if (!userData || !userData.profile.stxAddress.testnet) {
    alert("Please connect your wallet to create a market.");
    return;
  }

  const functionName = "stake";
  const network = new StacksTestnet();
  const senderAddress = userData.profile.stxAddress.testnet;

  const functionArgs = [uintCV(amount)];

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

  await openContractCall(options)
};

export { createMarket, getAllOptions, getOption, buyOption, sellOption, stake };
