import { useEffect, useState } from "react";
import { getPaymentHistoryByTime } from "../db/walletDB";
import { IndianRupee } from "lucide-react";

const HistoryTab = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      let startTime = new Date();
      let endTime = new Date();
      startTime.setMonth(startTime.getMonth() - 1);
      startTime.setHours(0, 0, 0, 0);

      const history = await getPaymentHistoryByTime({ startTime, endTime });
      setPaymentHistory(history);
    };

    getHistory();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      Completed: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Failed: "bg-red-100 text-red-800 border-red-200",
    };
    return statusColors[status] || "bg-green-500 text-white-800 border-white border";
  };

  // Mobile view component
  const MobilePaymentCard = ({ payment }) => (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4" />
            <span className="text-lg font-semibold">
              {"Eth "+payment.amount || "0"}
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              payment.status
            )}`}
          >
            {payment.status || "Pending"}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {payment.remarks || "No remarks"}
        </p>
        <div className="text-xs text-gray-400 mt-2">
          {new Date(payment.time).toLocaleString()}
        </div>
      </div>
    </div>
  );

  // Desktop view component
  const DesktopTable = () => (
    <div className="w-full overflow-x-auto bg-gray-900 ">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left p-4 font-semibold text-white bg-black ">
              Sender
            </th>
            <th className="text-left p-4 font-semibold text-white bg-black ">
              Receiver
            </th>
            <th className="text-left p-4 font-semibold text-white bg-black ">
              Amount
            </th>
            <th className="text-left p-4 font-semibold text-white bg-black ">
              Status
            </th>
            <th className="text-left p-4 font-semibold text-white bg-black ">
              Remarks
            </th>
            <th className="text-left p-4 font-semibold text-white bg-black ">Time</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-yellow-500"
            >
              <td className="p-4 font-medium">
                {payment.senderAddress || "N/A"}
              </td>
              <td className="p-4">{payment.receiverAddress || "N/A"}</td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4" />Eth 
                  {" "+payment.amount || " 0"}
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status || "Pending"}
                </span>
              </td>
              <td className="p-4">{payment.remarks || "No remarks"}</td>
              <td className="p-4 text-gray-500">
                {new Date(payment.time).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full bg-gray-800 rounded-lg border border-white shadow-xl">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-white ">Payment History</h2>
      </div>
      <div className="p-6">
        {/* Mobile view (only show amount and remarks) */}
        <div className="block md:hidden">
          {paymentHistory.map((payment, index) => (
            <MobilePaymentCard key={index} payment={payment} />
          ))}
        </div>

        {/* Desktop view (full table) */}
        <div className="hidden md:block">
          <DesktopTable />
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
