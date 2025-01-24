const PhraseOutput = ({ phraseString }) => {
  const myArray = phraseString.split(" ");

  return (
    <div className=" flex grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4  bg-gray-900 rounded-lg w-full max-w-3xl">
      {myArray.map((word, index) => (
        <div
          key={index}
          className="bg-gray-700 text-white p-2 rounded-md text-center"
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default PhraseOutput;
