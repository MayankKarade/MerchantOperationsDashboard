import { AlertTriangle, Edit2, Eye, Trash2 } from "lucide-react";
import React from "react";

const MerchantTable = ({
  merchants,
  onMerchantClick,
  onEditMerchant,
  onDeleteMerchant,
}) => {
  const getStatusColor = (status) => {
    if (status === "active") {
      return "bg-green-100 text-green-800";
    } else if (status === "paused") {
      return "bg-yellow-100 text-yellow-800";
    } else if (status === "blocked") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk) => {
    if (risk === "low") {
      return "bg-green-100 text-green-800";
    } else if (risk === "medium") {
      return "bg-yellow-100 text-yellow-800";
    } else if (risk === "high") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const handleRowClick = (merchant, e) => {
    if (e.target.closest("button")) {
      return;
    }
    onMerchantClick(merchant);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chargeback Ratio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {merchants.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No merchants found
                </td>
              </tr>
            ) : (
              merchants.map((merchant) => (
                <tr
                  key={merchant.id}
                  className="hover:bg-gray-50"
                  onClick={(e) => handleRowClick(merchant, e)}
                >
                  <td className="px-6  py-4">
                    <div className="flex items-center">
                      {/* <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-bold">
                          {merchant.name.charAt(0)}
                        </span>
                      </div> */}
                      <div className="">
                        <div className="text-sm font-medium text-gray-900 cursor-pointer">
                          {merchant.name}
                          {merchant.chargebackRatio > 2 &&
                            merchant.status === "active" && (
                              <AlertTriangle
                                size={14}
                                className="inline ml-2 text-yellow-500"
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {merchant.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 capitalize font-semibold rounded-full ${getStatusColor(
                        merchant.status
                      )}`}
                    >
                      {merchant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(merchant.monthlyVolume / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span
                        className={`font-medium ${
                          merchant.chargebackRatio > 2
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {" "}
                        {merchant.chargebackRatio}%
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 capitalize font-semibold rounded-full ${getRiskColor(
                        merchant.riskLevel
                      )} `}
                    >
                      {merchant.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMerchantClick(merchant);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMerchant(merchant);
                        }}
                        className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                        title="Edit Merchant"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMerchant(merchant.id);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete Merchant"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantTable;
