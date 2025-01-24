import { useState } from "react";
import { rpcList } from "./RPC_list";
const SelectNetwork = ({setLinker}) => {
  const [network, setNetwork] = useState("Linea Sepolio Mainnet");
  const [networkName, setNetworkName] = useState("Linea Sepolio Mainnet");
  const [openList, setOpenList] = useState(false);

  const [rpcListSelect, setRpcListSelect] = useState(rpcList);

  return (
    <div className="text-center items-center flex flex-cols cursor-pointer ">
      <div
        className=" bg-gray-800 text-white text-center items-center flex border-1 text-xs rounded-lg  pr-2 w-42 truncate md:text-xl  hover:bg-gray-200 hover:bg-gray-700"
        onClick={() => {
          setOpenList(true);
        }}
      >
        <span className="relative flex size-3 mx-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-175"></span>
          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
        </span>
        Network :<span>{networkName}</span>
      </div>

      {openList && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4 "
          onClick={() => {
            setOpenList(false);
          }}
        >
          {/* <div> Select Network</div> */}
          <div
            className="bg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="font-bold mb-10 text-3xl md:text-5xl ">
              Select a Network
            </div>
            <ul className="space-y-2">
              {rpcListSelect.map((rpc, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-blue-500 hover:text-black rounded-xl text-xl md:text-3xl 
                   bg-opacity-50 backdrop-blur-md hover:backdrop-blur-none hover:bg-opacity-100  mb-4"
                  onClick={() => {
                    console.log(rpc.url);
                    setNetwork(rpc.url);
                    setNetworkName(rpc.name);
                    setOpenList(false);
                    setLinker(rpc.url);
                    
                    
                  }}
                >
                  {rpc.name}
                </li>
              ))}

              {/* <li
               
                className="cursor-pointer p-2 bg-blue-500 hover:text-black rounded-xl text-xl md:text-3xl 
                    border-2 "
               
              > */}
              {/* + Add a custom Network  */}
              {/* </li> */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectNetwork;
