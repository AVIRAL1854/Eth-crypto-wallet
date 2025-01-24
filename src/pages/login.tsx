import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLoginPage from "../components/InputLoginPage";
import axios from "axios";
import {addKeys, checkKeyPresent} from "../db/walletDB";
import { addAccountFromPrivateKey } from "../components/etherCalls/addAccounts";
import { rpcList } from "../components/RPC_list";

const Login = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();
  

  const loginHandler = async () => {
    try {
      const body = { data: { privateKey } };
      // const response = await axios.post(
      //   "http://localhost:3000/addAccount/addAccountFromPrivateKey",
      //   body
      // );
      const response = await addAccountFromPrivateKey(privateKey,rpcList[2].url);

      if (response.response != null) {
        alert(
          `Account added Successfully: ${response.response.address}\nBalance: ${response.response.balance}`
        );

        const checkKey = await checkKeyPresent(privateKey);

        if(checkKey==null){
          await addKeys(privateKey, response.response.address);
        }
        else{
          alert("account is already present with wallet address:"+checkKey)
        }

        

        localStorage.setItem("privateKey", privateKey);
        navigate("/dashBoard")
      }

      if (response.error) {
        alert("Account Addition failed. Recheck your Private Key");
      }
      console.log("Response:", response);
    } catch (error) {
      alert("Failed. Recheck the Private Key");
      console.error("Error:", error.message);
    }
  };

  const openLoginModal = () => setLoginModal(true);
  const closeModal = () => setLoginModal(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
      <div
        className="bg-blue-700 font-bold text-xl md:text-3xl rounded-lg w-full md:w-1/3 text-white border-white border-2 text-center h-12 md:h-16 flex items-center justify-center hover:bg-indigo-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-50 my-5 md:my-10 cursor-pointer"
        onClick={() => navigate("/createNewWallet")}
      >
        Create New Wallet
      </div>
      <div
        className="bg-blue-700 font-bold text-xl md:text-3xl rounded-lg w-full md:w-1/3 text-white border-white border-2 text-center h-12 md:h-16 flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-700 hover:via-purple-500 hover:to-pink-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-50 cursor-pointer"
        onClick={openLoginModal}
      >
        Login with Old Wallet
      </div>

      {loginModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-lg z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-black text-white rounded-lg shadow-lg shadow-slate-600 w-full md:w-2/4 p-6 border-2"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={async (e) => e.key === "Enter" && (await loginHandler())}
          >
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-20">
              Login with Old Account
            </h2>

            <div className="flex flex-col items-center">
              <InputLoginPage
                LabelText={"PrivateKey"}
                placeholder={"Enter the private key here"}
                setData={setPrivateKey}
              />

              <button
                className="mt-6 px-4 py-2 font-bold text-lg md:text-2xl text-white bg-blue-500 rounded hover:bg-blue-600 w-40 md:w-48 h-10 md:h-12"
                onClick={loginHandler}
              >
                Login
              </button>

              <div
                className="underline mt-6 text-sm md:text-base cursor-pointer"
                onClick={() => navigate("/oldAccount")}
              >
                Login using Security Phrases?
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
