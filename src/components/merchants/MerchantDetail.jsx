import { AlertTriangle, CheckCircle, X } from "lucide-react";
import React from "react";

const MerchantDetail = ({ merchant, isOpen, onClose }) => {
  if (!isOpen || !merchant) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "paused":
        return "text-yellow-600 bg-yellow-50";
      case "blocked":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "high":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto top-0">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {merchant?.name}
                </h2>
                <p className="text-gray-500">
                  {merchant?.country} • Joined {merchant?.joinDate}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {merchant?.chargebackRatio > 2 && merchant?.status === "active" && (
              <div className="mx-6 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-yellow-800">
                      High Chargeback Warning
                    </p>
                    <p className="text-yellow-700 text-sm">
                      This merchant has a chargeback ratio of{" "}
                      {merchant.chargebackRatio}%, which exceeds the 2%
                      threshold.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Merchant Details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <p className=" text-sm font-medium text-gray-700 mb-2">
                      Merchant Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {merchant?.name}
                    </p>
                  </div>
                  <div>
                    <p className=" text-sm font-medium text-gray-700 mb-2">
                      Country
                    </p>
                    <p className="text-gray-900">{merchant.country}</p>
                  </div>
                  <div>
                    <p className=" text-sm font-medium text-gray-700 mb-2">
                      Status
                    </p>
                    <span
                      className={`px-4 py-2 inline-flex capitalize items-center rounded-lg ${getStatusColor(
                        merchant.status
                      )}`}
                    >
                      {merchant.status === "active" && (
                        <CheckCircle size={16} className="mr-2" />
                      )}
                      {merchant.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className=" text-sm font-medium text-gray-700 mb-2">
                      Monthly Volume
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(merchant.monthlyVolume / 1000).toFixed(1)}K
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chargeback Ratio
                    </label>
                    <div>
                      <p
                        className={`text-lg font-semibold ${
                          merchant.chargebackRatio > 2
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {merchant.chargebackRatio}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            merchant.chargebackRatio > 2
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              merchant.chargebackRatio * 10,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className=" text-sm font-medium text-gray-700 mb-2">
                      Risk Level
                    </p>
                    <span
                      className={`px-4 py-2 inline-flex capitalize items-center rounded-lg ${getRiskColor(
                        merchant.riskLevel
                      )}`}
                    >
                      {merchant.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Additional Information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Total Transactions
                    </label>
                    <p className="text-gray-900">
                      {merchant.totalTransactions?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Merchant ID
                    </label>
                    <p className="text-gray-900">{merchant.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Registration Date
                    </label>
                    <p className="text-gray-900">
                      {new Date(merchant.joinDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantDetail;
