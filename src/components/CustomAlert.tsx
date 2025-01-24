import { useEffect, useState } from "react";

const CustomAlert = ({ textData, success }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-6 px-6 py-3 text-center rounded-lg shadow-lg border-2 text-2xl font-bold transition-transform duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } ${
        success
          ? "bg-green-500 text-white border-green-700"
          : "bg-red-500 text-white border-red-700"
      }`}
    >
      {textData}
    </div>
  );
};

export default CustomAlert;
