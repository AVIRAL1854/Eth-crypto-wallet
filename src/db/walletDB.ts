// Database configuration
const DB_NAME = "walletDatabase";
const DB_VERSION = 1;
const WALLET_STORE = "walletKeysStore";
const PAYMENT_STORE = "paymentHistoryStore";

// Helper function to get database connection
const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create wallet keys store
      if (!db.objectStoreNames.contains(WALLET_STORE)) {
        const walletKeysStore = db.createObjectStore(WALLET_STORE, {
          keyPath: "walletID",
          autoIncrement: true,
        });

        walletKeysStore.createIndex("walletKeyIndex", "walletKeys", {
          unique: true,
        });

        walletKeysStore.createIndex("walletAddressIndex", "walletAddress", {
          unique: true,
        });

        console.log("Wallet store created successfully");
      }

      // Create payment history store
      if (!db.objectStoreNames.contains(PAYMENT_STORE)) {
        const paymentHistoryStore = db.createObjectStore(PAYMENT_STORE, {
          keyPath: "historyId",
          autoIncrement: true,
        });

        paymentHistoryStore.createIndex(
          "senderAddressIndex",
          "senderAddress"
        );
        paymentHistoryStore.createIndex(
          "receiverAddressIndex",
          "receiverAddress"
        );
        paymentHistoryStore.createIndex("amountIndex", "amount");
        paymentHistoryStore.createIndex("timeIndex", "time");
        paymentHistoryStore.createIndex("statusIndex", "status");
        paymentHistoryStore.createIndex("remarksIndex", "remarks");

        console.log("Payment history store created successfully");
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const createWalletDB = async (): Promise<void> => {
  try {
    await getDB();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const addKeys = async (
  keys: string,
  walletAddress: string
): Promise<IDBValidKey> => {
  let db: IDBDatabase | null = null;
  try {
    db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction(WALLET_STORE, "readwrite");
      const store = transaction.objectStore(WALLET_STORE);

      const walletEntry = {
        walletKeys: keys,
        walletAddress: walletAddress,
      };

      const request = store.add(walletEntry);

      request.onsuccess = () => {
        console.log("Keys added successfully");
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Error adding keys:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in addKeys:", error);
    throw error;
  }
};

export const addPayments = async (
  senderAddress:string,
  receiverAddress: string,
  amount: number,
  status: string,
  remarks:string
): Promise<IDBValidKey> => {
  let db: IDBDatabase | null = null;
  try {
    // Ensure database is initialized
    db = await getDB();

    return new Promise((resolve, reject) => {
      if (!db!.objectStoreNames.contains(PAYMENT_STORE)) {
        reject(
          new Error(
            "Payment store not found. Please initialize the database first."
          )
        );
        return;
      }

      const transaction = db!.transaction(PAYMENT_STORE, "readwrite");
      const store = transaction.objectStore(PAYMENT_STORE);

      const paymentEntry = {
        senderAddress,
        receiverAddress,
        amount,
        time: new Date(),
        status,
        remarks,
      };

      const request = store.add(paymentEntry);

      request.onsuccess = () => {
        console.log("Payment added successfully");
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Error adding payment:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in addPayments:", error);
    throw error;
  }
};

export const getPrivateKeyByAccountAddress = async (
  walletAddress: string
): Promise<any> => {
  let db: IDBDatabase | null = null;
  try {
    db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction(WALLET_STORE, "readonly");
      const store = transaction.objectStore(WALLET_STORE);
      const index = store.index("walletAddressIndex");

      const request = index.get(walletAddress);

      request.onsuccess = () => {
        if (request.result) {
          console.log("Private key found for address:", walletAddress);
          resolve(request.result.walletKeys);
        } else {
          resolve(null); // No wallet found for this address
        }
      };

      request.onerror = () => {
        console.error("Error getting private key:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in getPrivateKeyByAccountAddress:", error);
    throw error;
  }
};

interface TimeRange {
  startTime: Date;
  endTime: Date;
}

export const getPaymentHistoryByTime = async (
  timeRange: TimeRange
): Promise<any[]> => {
  let db: IDBDatabase | null = null;
  try {
    db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction(PAYMENT_STORE, "readonly");
      const store = transaction.objectStore(PAYMENT_STORE);
      const index = store.index("timeIndex");

      // Using IDBKeyRange to get payments within the time range
      const range = IDBKeyRange.bound(timeRange.startTime, timeRange.endTime);
      const request = index.getAll(range);

      request.onsuccess = () => {
        if (request.result) {
          console.log("Found payments in time range");
          // Sort payments by time in descending order (newest first)
          const sortedPayments = request.result.sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          );
          resolve(sortedPayments);
        } else {
          resolve([]); // No payments found in this time range
        }
      };

      request.onerror = () => {
        console.error("Error getting payment history:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in getPaymentHistoryByTime:", error);
    throw error;
  }
};


interface WalletAccount {
  walletAddress: string;
  walletKeys: string;
}

export const getAllAccounts = async (): Promise<WalletAccount[]> => {
  let db: IDBDatabase | null = null;
  try {
    db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction(WALLET_STORE, "readonly");
      const store = transaction.objectStore(WALLET_STORE);

      const request = store.getAll();

      request.onsuccess = () => {
        if (request.result) {
          // Map the results to only include address and keys pairs
          const accounts: WalletAccount[] = request.result.map((entry) => ({
            walletAddress: entry.walletAddress,
            walletKeys: entry.walletKeys,
          }));

          console.log(`Found ${accounts.length} wallet accounts`);
          resolve(accounts);
        } else {
          resolve([]); // No accounts found
        }
      };

      request.onerror = () => {
        console.error("Error getting accounts:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in getAllAccounts:", error);
    throw error;
  }
};




export const checkKeyPresent = async (
  walletKey: string
): Promise<any> => {
  let db: IDBDatabase | null = null;
  try {
    db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction(WALLET_STORE, "readonly");
      const store = transaction.objectStore(WALLET_STORE);
      const index = store.index("walletKeyIndex");

      const request = index.get(walletKey);

      request.onsuccess = () => {
        if (request.result) {
          console.log("account  key found for address:", walletKey);
          resolve(request.result.walletAddress);
        } else {
          resolve(null); // No wallet found for this address
        }
      };

      request.onerror = () => {
        console.error("Error getting accountAddress key:", request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        if (db) db.close();
      };
    });
  } catch (error) {
    if (db) db.close();
    console.error("Error in getPrivateKeyByAccountAddress:", error);
    throw error;
  }
};