import { useState } from "react";
import PhraseForm from "../components/PhraseForm";
import axios from "axios";
import { addOldAccountFromMnemonic } from "../components/etherCalls/addAccountMnemonic";
import { rpcList } from "../components/RPC_list";

const LoginUsingNemonic = () => {
  const [phrase, setPhrase] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
  });

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") await handlerLogin();
  };

  const handlerLogin = async () => {
    // alert(JSON.stringify(phrase));

    let newString =
      phrase[1] +
      " " +
      phrase[2] +
      " " +
      phrase[3] +
      " " +
      phrase[4] +
      " " +
      phrase[5] +
      " " +
      phrase[6] +
      " " +
      phrase[7] +
      " " +
      phrase[8] +
      " " +
      phrase[9] +
      " " +
      phrase[10] +
      " " +
      phrase[11] +
      " " +
      phrase[12];

    console.log(
      "this is the phras1e:" +
        JSON.stringify(phrase) +
        "\nthis is the newString:" +
        newString
    );

    try {
      if (newString == "") {
        throw new Error("phrases are Empty");
      }
      // const payload = {
      //   data: {
      //     newString: newString,
      //   },
      // };
      // const response = await axios.post(
      //   "http://localhost:3000/addAccount/addAccountFromMnemonic",
      //   payload
      // );


      const response= await addOldAccountFromMnemonic(newString,rpcList[2].url);

      if (response.response) {
        alert(
          "Succesful !!! . this is the privateKey:" + response.response.privateKey
        );
        console.log(
          "Succesful !!! . this is the privateKey:" +
            JSON.stringify(response.response.privateKey)
        );
      }

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      alert(
        "there is error in phrases. Kindly recheck the phrases and there Alignments :" +
          error.message
      );
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 text-center text-white">
        Login Using Secret Phrases
      </div>

      <div
        className="border-2   p-6 rounded-lg shadow-lg w-full max-w-3xl gap-4   bg-opacity-50 z-50    bg-opacity-70 backdrop-blur-xl "
        onKeyDown={handleKeyDown}
      >
        <PhraseForm setPhrase={setPhrase} />
      </div>

      <button
        className="bg-blue-500  text-white text-3xl  font-bold rounded-xl my-10 w-64 h-16 hover:bg-blue-600 transition ease-int-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={handlerLogin}
      >
        {" "}
        Submit{" "}
      </button>
    </div>
  );
};

export default LoginUsingNemonic;
