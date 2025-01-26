# Eth-Crypto-Wallet Documentation 🌟

## Project Demo
[![Eth Wallet Demo Video](https://img.youtube.com/vi/FJocAayEz6M/0.jpg)](https://youtu.be/FJocAayEz6M?si=52-mWTyreMvh15LO)

Welcome to the documentation for **Eth-Crypto-Wallet**! This project is a modern Ethereum wallet designed for simplicity, security, and versatility. 🚀

## ✨ Special Features
🔑 **Create and Manage Multiple Ethereum Wallets Seamlessly**
Effortlessly handle multiple wallets with an intuitive interface.

🛡️ **Advanced Security**
Your private keys are **never saved**. We prioritize your safety and privacy.

⚡ **One-Click Setup**
Get started instantly with minimal setup. Create your wallet in just a few clicks.

📂 **Secure Backup**
Choose between encrypted cloud and local backup options to ensure your assets are always safe.

## 🛠️ Technologies Used
* **React.js**: For creating a dynamic and responsive user interface.
* **Ethers.js**: To interact with Ethereum blockchain seamlessly.
* **React Router DOM**: For efficient routing and navigation.
* **IndexedDB**: For local database storage.
* **Tailwind CSS**: For modern, responsive design.
* **JavaScript/TypeScript**: For robust and scalable development.
* **Very Rich UI**: For a visually appealing and user-friendly experience.

## 🚀 Getting Started
1. Clone the repository:
```
git clone https://github.com/AVIRAL1854/Eth-crypto-wallet.git
```

2. Navigate to the project directory:
```
cd Eth-crypto-wallet
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:port
```

## 🌐 Adding a New Network
To add a new network, follow these steps:
1. Navigate to the following file:
```
Eth-crypto-wallet/src/components/RPC_list.tsx
```

2. Update the `rpcLink` and `rpcList` arrays with your new network's details. Example:
```typescript
export const rpcLink = [
  "http://127.0.0.1:8545/",
  "infuraUrl/mainet",
  "newRpcUrl"
];

export const rpcList = [
  {
    name: "localHost - http://127.0.0.1:8545/",
    url: "http://127.0.0.1:8545/",
  },
  {
    name: "Mainnet",
    url: "https://rpc.ankr.com/eth",
  },
  {
    name: "Linea Sepolio Testnet",
    url: "https://rpc.ankr.com/eth_sepolia",
  },
  {
    name: "holesky Testnet",
    url: "https://rpc.ankr.com/eth_holesky",
  },
  {
    name: "New Network",
    url: "https://new-rpc-url.com",
  },
];
```

3. Save the file and restart the development server.

## 🤝 Contributing
We welcome contributions! If you have suggestions, bug fixes, or new features, feel free to create a pull request.
1. Fork the repository.
2. Create a new branch:
```
git checkout -b feature/your-feature
```

3. Make your changes and commit:
```
git commit -m "Add your message here"
```

4. Push to your branch:
```
git push origin feature/your-feature
```

5. Create a pull request.

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 🎉 Thank You for Using Eth-Crypto-Wallet!
Feel free to reach out if you have any questions or issues. Happy transacting! ✨
