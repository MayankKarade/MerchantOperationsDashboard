import React, { useEffect, useState } from "react";

import { merchantsData } from "../data/marchantsData";
import SummaryStats from "../components/Dashboard/SummaryStats";
import Visualization from "../components/Dashboard/Visualization";

const DashboardPage = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMerchants(merchantsData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of merchant performance and metrics
        </p>
      </div>
      <SummaryStats merchants={merchants} />
      <Visualization merchants={merchants} />
    </div>
  );
};

export default DashboardPage;
