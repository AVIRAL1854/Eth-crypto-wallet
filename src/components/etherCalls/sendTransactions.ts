import { ethers } from "ethers";


const sendTransactions = async (
  privateKey,
  receiverAddress,
  value,
  rpcLink
) => {
  try {
    // const provider = new ethers.JsonProvider(rpc_link);
    const provider = new ethers.JsonRpcProvider(rpcLink);
    const senderWallet = new ethers.Wallet(privateKey, provider);
    const senderAddress = await senderWallet.getAddress();
    const balance = await provider.getBalance(senderAddress);

    console.log("this is the balance" + String(balance));

    const tx = {
      to: receiverAddress,
      value: ethers.parseEther(value),
      gasLimit: 21000,
      maxFeePerGas: ethers.parseUnits("20", "gwei"),
      maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    };

    console.log("sending transactions");
    // const signedTx= await senderWallet.signTransaction(tx);
    const transactionResponse = await senderWallet.sendTransaction(tx);
    console.log("Transactions Sent . Waiting for confirmation ... ");
    const receipt = await transactionResponse.wait();

    console.log("Transaction Confirmed.");
    return { receipt };
  } catch (error) {
    throw new Error("this is the custom error:" + error.message);
  }
};

export const sendTransactionsAcc = async (privateKey, amount, RAddress, rpcLink) => {
  try {
    console.log(
      "this is the private key:" +
        privateKey +
        "\nthis is the amount:" +
        amount +
        "\nthis is the receive address:" +
        String(RAddress)
    );
    const response = await sendTransactions(
      privateKey,
      RAddress,
      amount,
      rpcLink
    );

    return {
      message: "transactions successfull",
      response,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
