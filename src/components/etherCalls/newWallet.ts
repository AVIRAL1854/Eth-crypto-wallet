import { ethers } from "ethers";
import { rpcLink } from "../RPC_list";


const newWallet = async (rpcLink) => {
  try {
   
    const provider = new ethers.JsonRpcProvider(rpcLink);
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = await wallet.getAddress();
    const privateKey = wallet.privateKey;

    console.log(
      "this is the wallet Address:" +
        walletAddress +
        "\nthis is the private key:" +
        privateKey
    );

    const connectedWallet = wallet.connect(provider);
    const balance = await provider.getBalance(walletAddress);
    const mnemonic = connectedWallet.mnemonic.phrase;

    console.log(
      "wallet Balance:",
      ethers.formatEther(balance) + "\nMneonic:" + mnemonic
    );
    const accountInfo = {
      walletAddress,
      privateKey,
      mnemonic,
    };
    return accountInfo;
  } catch (e) {
    throw new Error("account not created with error" + error.message);
  }
};

export const newWalletCreate = async (rpcLink) => {
  try {
    const response = await newWallet(rpcLink);
    return {
      message: "new Wallet created Successfully",
      response,
    };
  } catch (error) {
    return {
      message: "Account Creation failed",
      error,
    };
  }
};