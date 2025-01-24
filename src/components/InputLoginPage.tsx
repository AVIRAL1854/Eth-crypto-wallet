
const InputLoginPage = ({ LabelText, placeholder, setData }) => {
  return (
    <div className="flex my-10 ">
      <label className="text-xl mx-5 font-bold"> {LabelText}</label>
      <input
        type="text"
        className="font-bold text-center justify-center w-3/4 h-10 rounded-lg hover:ring-2 text-xl text-white bg-slate-900 border-white border-2 hover:bg-gray-900"
        placeholder={placeholder}
        onChange={(e)=>{
            setData(e.target.value);
        }}
      />
    </div>
  );
};

export default InputLoginPage;