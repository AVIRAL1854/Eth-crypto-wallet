import { ethers } from "ethers";




const addAccountFromMnemonic = async (mnemonic, rpcLink) => {
  try {
    // const rpc_link = rpcLink[0];
    const provider = new ethers.JsonRpcProvider(rpcLink);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const connectedWallet = wallet.connect(provider);
    const address = await connectedWallet.getAddress();
    const balance = await provider.getBalance(address);
    const privateKey = wallet.privateKey;

    console.log(
      "this is the address :" + address + "\nthis is the balance:" + balance
    );
    const walletInfo = {
      privateKey: String(privateKey),
      address,
      balance: String(balance),
    };
    return walletInfo;
  } catch (error) {
    // console.log("this is the error Mnemonic:"+error.message);
    throw new Error("failed to add Account:" + error);
  }
};


export const addOldAccountFromMnemonic = async (MnemonicPhrase ,rpcLink) => {
  try {
   
    console.log("this is the private string:" + MnemonicPhrase);

    const response = await addAccountFromMnemonic(MnemonicPhrase, rpcLink);
  return ({
      message: "this is working fine",
      response,
    });
  } catch (error) {
    console.log(
      "this is the error from addAccountFromMnemonic:" +
        JSON.stringify(error.message)
    );

    return ({
      message: "there is some error ",
      error: JSON.stringify(error.message),
    });
  }
};