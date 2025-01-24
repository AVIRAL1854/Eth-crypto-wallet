import { useEffect, useState, useRef } from "react";
import { getAllAccounts } from "../db/walletDB";
import { useNavigate } from "react-router-dom";
import ethereumLogo from "../assets/ethereumLogo.png";

const NavBar = ({ setWalletAddressMain, setPrivateKey }) => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletPrivateKey, setWalletPrivateKey] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [accountIndex, setAccountIndex] = useState(0);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [network ,setNetwork]=useState("shjsgdj");
  const dropdownRef = useRef(null);
  const [shortAddress,setShortAddress]=useState(walletAddress);
  

  useEffect(() => {
    const updateAccounts = async () => {
      const accounts = await getAllAccounts();

      if (accounts.length === 0) {
        navigate("/login");
        return;
      }

      setAllAccounts(accounts);
      setWalletAddress(accounts[accountIndex].walletAddress);
      setWalletPrivateKey(accounts[accountIndex].walletKeys);
      
      setWalletAddressMain(accounts[accountIndex].walletAddress);
      setPrivateKey(accounts[accountIndex].walletKeys);

      let tempAddress = accounts[accountIndex].walletAddress;
     
      tempAddress =
        tempAddress.slice(0, 8) +
        "..." +
        tempAddress.slice(-8, tempAddress.length);
      setShortAddress(tempAddress);

      console.log(walletAddress + "...." + walletPrivateKey);
    };

    updateAccounts();
  }, [accountIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };

    if (openDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropDown]);

  return (
    <div className="border-b-2 bg-blue-500 h-26 md:h-28 flex items-center px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="md:flex md:flex-col">
        <img src={ethereumLogo} className="w-16 cursor-pointer hover:animate-ping " alt="logo" onClick={()=>{navigate("/login");}}></img>

        
      </div>

      <div
        className="ml-auto px-2 py-1 md:px-4 md:py-2  text-black rounded cursor-pointer hover:bg-indigo-900 text-xs sm:text-sm md:text-base border-white border-2 text-white bg-blue-600 font-bold "
        onClick={() => setOpenDropDown(true)}
      >
        {shortAddress || "Select Account"}
        <span className=" ml-2  px-1 text-black bg-white rounded-lg hover:text-green-500" onClick={(e)=>{
          e.stopPropagation();
          navigator.clipboard.writeText(walletAddress);
          
        }}>copy</span>
      </div>

      {openDropDown && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div
            ref={dropdownRef}
            className="bg-black rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto p-4 text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Select Account Address
            </h2>
            {allAccounts.map((account, index) => (
              <div
                key={index}
                className={`p-2 md:p-3 mb-2 rounded cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg ${
                  index === accountIndex
                    ? "bg-blue-600 hover:bg-blue-800 border-2 md:border-4"
                    : "bg-gray-800 text-white hover:bg-violet-500 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200"
                }`}
                onClick={() => {
                  setAccountIndex(index);
                  setOpenDropDown(false);
                }}
              >
                {account.walletAddress}
              </div>
            ))}
            <button
              onClick={() => setOpenDropDown(false)}
              className="mt-4 w-full py-1 md:py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
