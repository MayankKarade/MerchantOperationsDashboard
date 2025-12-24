import { Search } from "lucide-react";
import React from "react";

const MerchantFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* filter by name */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Search Merchants
          </p>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* filter by status */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="" disabled>
              All Status
            </option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* filter by risk levels*/}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Risk Level</p>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="" disabled>
              All Risk Levels
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* filter by sortings */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Sort By</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="" disabled>
              Sort by voluem/chargeback
            </option>

            <option value="volume_high">Volume (High to Low)</option>
            <option value="volume_low">Volume (Low to High)</option>
            <option value="chargeback_high">Chargeback (High to Low)</option>
            <option value="chargeback_low">Chargeback (Low to High)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MerchantFilters;
