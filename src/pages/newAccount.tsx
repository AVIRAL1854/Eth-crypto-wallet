import { useState } from "react";
import PhraseOutput from "../components/PhraseOutput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {addKeys} from "../db/walletDB";
import { newWalletCreate } from "../components/etherCalls/newWallet";
import CustomAlert from "../components/CustomAlert";
import { rpcList } from "../components/RPC_list";

const CreateNewWallet = () => {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [alerter,setAlerter]=useState(false);

  const copyButtonHandler = (text) => {
    try {
      navigator.clipboard.writeText(text);
      setAlerter(true);
      setInterval(()=>{
        setAlerter(false);
      },10000)
      // alert("Copied");
    } catch (error) {
      console.log(error.message)
      // alert("Copy failed");
    }finally{
      // setAlerter(false);
    }
  };

  const downloadCredentialsHandler = () => {
    const content = `Private Key: ${privateKey}\nWallet Address: ${walletAddress}\nMnemonic: ${mnemonic}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wallet_credentials.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createWalletHanlder = async () => {
    try {
      // const response = await axios.post("http://localhost:3000/newWallet");
      const response = await newWalletCreate(rpcList[2].url);
      const {
        privateKey: newPrivateKey,
        mnemonic: newMnemonic,
        walletAddress: newWalletAddress,
      } = response.response;
      setWalletAddress(newWalletAddress);
      setPrivateKey(newPrivateKey);
      setMnemonic(newMnemonic);
      alert("Account Created Successfully!");

       await addKeys(newPrivateKey, newWalletAddress);
    } catch (error) {
      alert("Error in creating a new wallet: " + error.message);
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        {!create && (
          <button
            className="bg-blue-600 hover:bg-indigo-500 text-white font-bold text-xl sm:text-2xl md:text-3xl py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 mt-auto mb-auto"
            onClick={async () => {
              setCreate(true);
              await createWalletHanlder();
            }}
          >
            One Click to Open Account
          </button>
        )}
        {create && (
          <div className="flex flex-col gap-6 w-full bg-gray-900 text-white rounded-xl shadow-lg p-6 md:p-8">
            {/* Private Key */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                Private Key:
              </div>
              <div className="w-full md:w-96 bg-gray-800 p-3 rounded-lg break-words text-sm sm:text-base font-semibold">
                {privateKey}
              </div>
              <button
                className="bg-blue-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-150"
                onClick={() => copyButtonHandler(privateKey)}
              >
                Copy
              </button>
            </div>

            {/* Wallet Address */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                Wallet Address:
              </div>
              <div className="w-full md:w-96 bg-gray-800 p-3 rounded-lg break-words text-sm sm:text-base font-semibold">
                {walletAddress}
              </div>
              <button
                className="bg-blue-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-150"
                onClick={() => copyButtonHandler(walletAddress)}
              >
                Copy
              </button>
            </div>

            {/* Mnemonic Phrase */}
            <div className="w-full">
              <PhraseOutput phraseString={mnemonic} />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <button
                className="bg-blue-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg text-lg sm:text-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-150"
                onClick={() => copyButtonHandler(mnemonic)}
              >
                Copy Mnemonic
              </button>
              <button
                className="bg-green-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-lg sm:text-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-150"
                onClick={downloadCredentialsHandler}
              >
                Download Credentials
              </button>
              <button
                className="bg-yellow-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg sm:text-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-150"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
            </div>
          </div>
        )}

        {
          alerter && <CustomAlert textData={"copied"} success={true}/>
        }
      </div>
    </div>
  );
};

export default CreateNewWallet;
