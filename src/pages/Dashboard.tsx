import { useEffect, useState } from "react";
import arrow from "../assets/arrow.png";
import HistoryTab from "../components/HistoryTab";
import InputLoginPage from "../components/InputLoginPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCodeGenerator from "../components/QrcodeGenerator";
import NavBar from "../components/Navbar";
import Loading from "../components/Loading";
import PaymentSuccessLoader from "../components/PaymentSuccessLoader";
import ErrorLoading from "../components/ErrorLoading";
import { sendTransactionsAcc } from "../components/etherCalls/sendTransactions";
import { ethers } from "ethers";
import { rpcLink, rpcList } from "../components/RPC_list";
import {
  createWalletDB,
  addKeys,
  addPayments,
  getAllAccounts,
  checkKeyPresent,
} from "../db/walletDB";
import { address } from "framer-motion/client";
import SelectNetwork from "../components/SelectNetwork";

const Dashboard = () => {
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(
    ""
  );
  const [walletBalance, setWalletBalance] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [receive, setReceive] = useState(false);
  const [send, setSend] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [sendingAmount, setSendingAmount] = useState("0");
  const [sendloading, setSendLoading] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const [rpc_link, setRpc_Link] = useState(rpcList[1].url);

  const sendTransactionHandler = async (receiverAddress, amount, remarks) => {
    try {
      setSendLoading(true);
      console.log("this is the private key:" + privateKey);
      // const payload = {
      //   data: {
      //     privateKey,
      //     RAddress: receiverAddress,
      //     amount: "100",
      //   },
      // };
      // const response = await axios.post(
      //   "http://localhost:3000/sendTransactions",
      //   payload
      // );
      const response = await sendTransactionsAcc(
        privateKey,
        amount,
        receiverAddress,
        rpc_link

      );

      if (response.response) {
        setOpenSendModal(false);
        setReceiverAddress("");
        setSendLoading(false);
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
        }, 6000);
        
        // alert(
          //   "Transaction Successful: " + JSON.stringify(response.data.response)
          // );
          addPayments(walletAddress, receiverAddress, amount, "Sent", remarks);
        }
        if (response.error) {
        setOpenSendModal(false);
        setReceiverAddress("");
        setSendLoading(false);
        setSendError(true);
        setTimeout(() => {
          setSendError(false);
        }, 10000);
        console.error(response.error);
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Transaction Failed: " + error.message);
      // alert("Transaction Failed: " + error.message);
    } finally {
      setSendLoading(false); // Stop loading after completion
    }
  };

  const refreshHandler = async (privateKey) => {
    try {
         const rpc = rpc_link;
         const provider = new ethers.JsonRpcProvider(rpc);
         const wallet = new ethers.Wallet(privateKey, provider);
         const connectedWallet = wallet.connect(provider);
         const address = await connectedWallet.getAddress();
         const balance = await provider.getBalance(address);
         console.log("testing:"+balance) 
         const balanceInEther = ethers.formatEther(balance);
         setWalletBalance(balanceInEther);
       } catch (error) {
         alert("error in fetching Balance :" + error.message);
       }
  };

  useEffect(() => {
    const checkBalance = async () => {
      try {
        const rpc = rpc_link;
        const provider = new ethers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(privateKey, provider);
        const connectedWallet = wallet.connect(provider);
        const address = await connectedWallet.getAddress();
        const balance = await provider.getBalance(address);
        console.log("testing:" + balance);
        const balanceInEther = ethers.formatEther(balance);
        setWalletBalance(balanceInEther);
        console.log("balance in ether :"+ balanceInEther);
      } catch (error) {
        if (
          error.message !=
          'invalid private key (argument="privateKey", value="[REDACTED]", code=INVALID_ARGUMENT, version=6.13.5)'
        )
          alert("error in fetching Balance :" + error.message);
      }
    };

    checkBalance();
  }, [privateKey, rpc_link]);

  return (
    <div className="bg-gray-900 text-white w-full min-h-screen">
      <NavBar
        setWalletAddressMain={setWalletAddress}
        setPrivateKey={setPrivateKey}
      />
      {/* selet network */}
      <section className="bg-gray-900 flex justify-center items-center text-2xl md:text-5xl font-bold h-1/3 my-5">
        <SelectNetwork setLinker={setRpc_Link} />
      </section>

      <section className="bg-gray-900 flex justify-center items-center text-2xl md:text-5xl font-bold h-1/3 my-10">
        Balance :
        <span className="  text-green-500 hover:text-amber-300 cursor-pointer transition-transform transform hover:scale-110 duration-150">
          {" " + walletBalance}
        </span>
      </section>

      <section className="bg-gray-900 flex flex-row justify-center items-center space-x-6 md:space-x-16 lg:space-x-32 py-8">
        <div
          className="flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl border-2 w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-28 rounded-xl bg-blue-600 font-bold hover:bg-pink-500 transition-transform transform hover:scale-110 duration-150 cursor-pointer"
          onClick={() => setOpenSendModal(true)}
        >
          Send
        </div>

        <div
          className="flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl border-2 w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-28 rounded-xl bg-violet-600 font-bold hover:bg-violet-500 transition-transform transform hover:scale-110 duration-150 cursor-pointer"
          onClick={() => setOpenReceiveModal(true)}
        >
          Receive
        </div>
      </section>

      {/* <section className="bg-gray-900 flex justify-center items-center h-1/3">
        <button
          className="px-4 py-2 bg-blue-900 rounded-lg text-white hover:bg-blue-700"
          onClick={async () => {
            const accounts = await checkKeyPresent(
              "0x13c4bf093422f207394223506573e90a7e28bcc1b636cee56c31c886319caeb3"
            );
            console.log(accounts);
          }}
        >
          Click Here
        </button>
      </section> */}

      <section>
        <HistoryTab />
      </section>

      {openSendModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4"
          onClick={() => setOpenSendModal(false)}
        >
          <div
            className="bg-black text-white rounded-lg shadow-lg shadow-white border-white border-2 w-full max-w-xl p-6 md:w-4/5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Send Ethereum
            </h2>
            <InputLoginPage
              LabelText="Receiver Address:"
              placeholder="Enter the receiver address"
              setData={setReceiverAddress}
            />
            <InputLoginPage
              LabelText="Amount (ETH):"
              placeholder="Enter the amount"
              setData={setSendingAmount}
            />
            <InputLoginPage
              LabelText="Remarks (optional):"
              placeholder="Remarks"
              setData={setRemarks}
            />
            <button
              className="mt-4 w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() =>
                sendTransactionHandler(receiverAddress, sendingAmount, remarks)
              }
            >
              SEND ETH
            </button>
          </div>
        </div>
      )}

      {openReceiveModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4 "
          onClick={() => setOpenReceiveModal(false)}
        >
          <div
            className="bg-black text-white rounded-lg shadow-lg w-full max-w-md p-6 border-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Owner QR Code
            </h2>
            <QRCodeGenerator QRtext={walletAddress} />
            <div className="mt-4 bg-pink-600 text-white text-center py-2 rounded-lg truncate">
              Address: {walletAddress}
            </div>
          </div>
        </div>
      )}

      {sendloading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4">
          <div className=" text-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col items-center">
            <Loading />
            <p className="mt-4 text-lg">Processing Transaction...</p>
          </div>
        </div>
      )}

      {sendSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4">
          <div className=" text-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col items-center">
            <PaymentSuccessLoader />
            <p className="mt-4 text-lg">Transaction Successfull ...</p>
          </div>
        </div>
      )}

      {sendError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4">
          <div className=" text-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col items-center">
            <ErrorLoading />
            <p className="mt-4 text-lg">Transaction Failed ...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
