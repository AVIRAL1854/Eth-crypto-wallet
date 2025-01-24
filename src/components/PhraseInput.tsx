const PhraseInput = ({index ,setPhrase}) => {

  return (
    <input
      className="w-full border-2 border-black rounded-lg h-10 p-2 focus:outline-none focus:ring-2 focus:ring-white hover:bg-cyan-900 bg-black font-bold text-white hover:ring-white hover:ring-2 cursor-pointer"
      placeholder="Phrase"

      onChange={(e)=>{
      
        setPhrase((prev)=>({
          ...prev,
          [index]:e.target.value,

        }))

      }}
    />
  );
};

export default PhraseInput;
