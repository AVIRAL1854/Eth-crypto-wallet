import  { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import AddTokens from "./pages/AddToken";
import GivePayment from "./pages/GivePayment";
import Login from "./pages/login";
import LoginUsingNemonic from "./pages/oldAccount";
import CreateNewWallet from "./pages/newAccount";
import Dashboard from "./pages/Dashboard";

// Enhanced Landing Page with Multiple Account Features
const LandingPage = () => {
  const navigate = useNavigate();
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12 text-blue-400"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: "Multi-Account Support",
      description: "Create and manage multiple Ethereum wallets seamlessly",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12 text-green-400"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Advanced Security",
      description: "We never save your keys",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12 text-purple-400"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <path d="M20.4 15H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z"></path>
        </svg>
      ),
      title: "One-Click Setup",
      description: "Instant wallet creation with minimal setup",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12 text-yellow-400"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: "Secure Backup",
      description: "Encrypted cloud and local backup options",
    },
  ];

  const handleQuickStart = () => {
    setShowAccountOptions(true);
  };

  const createAccount = (type:string) => {
    switch (type) {
      case "simple":
        navigate("/login");
        break;
      case "advanced":
        navigate("/login");
        break;
      case "import":
        navigate("/login");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col justify-center items-center text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Secure Ethereum Wallet
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-300">
          Manage, secure, and grow your Ethereum assets with cutting-edge
          technology
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!showAccountOptions ? (
          <button
            onClick={handleQuickStart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Get Started
          </button>
        ) : (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => createAccount("simple")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Quick Setup
            </button>
            <button
              onClick={() => createAccount("advanced")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Advanced Setup
            </button>
            <button
              onClick={() => createAccount("import")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Import Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createNewWallet" element={<CreateNewWallet />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addTokens" element={<AddTokens />} />
        <Route path="/givePayment" element={<GivePayment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oldAccount" element={<LoginUsingNemonic />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
