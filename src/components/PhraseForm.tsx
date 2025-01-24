import PhraseInput from "./PhraseInput";

const PhraseForm = ({ setPhrase }) => {
  return (
    <div className=" flex grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4  bg-gray-900 rounded-lg w-full max-w-3xl">
      
        <PhraseInput   index={1} setPhrase={setPhrase}/>
        <PhraseInput   index={2} setPhrase={setPhrase}/>
        <PhraseInput   index={3} setPhrase={setPhrase}/>
        <PhraseInput   index={4} setPhrase={setPhrase}/>
        <PhraseInput   index={5} setPhrase={setPhrase}/>
        <PhraseInput   index={6} setPhrase={setPhrase}/>
        <PhraseInput   index={7} setPhrase={setPhrase}/>
        <PhraseInput   index={8} setPhrase={setPhrase}/>
        <PhraseInput   index={9} setPhrase={setPhrase}/>
        <PhraseInput   index={10} setPhrase={setPhrase}/>
        <PhraseInput   index={11} setPhrase={setPhrase}/>
        <PhraseInput   index={12} setPhrase={setPhrase}/>
       
        
      
    </div>
  );
};

export default PhraseForm;
