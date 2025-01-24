import { ethers } from "ethers";
import { rpcLink } from "../RPC_list";




  const addAccount = async (privateKey,rpcLink) => {
    
  try {
    
    const provider = new ethers.JsonRpcProvider(rpcLink);
    const wallet = new ethers.Wallet(privateKey, provider);
    const connectedWallet = wallet.connect(provider);
    const address = await connectedWallet.getAddress();
    const balance = await provider.getBalance(address);

    console.log(
      `this is the provider :${provider}\nthis is the wallet:${JSON.stringify(
        wallet
      )}\nthis is the address :${address}`
    );
    const walletInfo = {
      address: JSON.stringify(address),
      balance: String(balance),
    };
    return walletInfo;
  } catch (error) {
    throw new Error("failed to add Account:" + error.message);
  }
};


export const addAccountFromPrivateKey=async(privateKey,rpcLink)=>{

     try {
       
  
       console.log(privateKey);

       const response = await addAccount(privateKey,rpcLink);
      return({
         message: "this is the addAccount routes",
         response,
       });
     } catch (error) {
       return({
         messsage: "account addition failed",
         error: error.message,
       });
     }

}