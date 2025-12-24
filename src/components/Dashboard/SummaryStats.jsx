import { DollarSign, CheckCircle, Users, TrendingUp } from "lucide-react";

export default function SummaryStats({ merchants }) {
  const calculateStats = () => {
    const totalVolume = merchants.reduce((sum, m) => sum + m.monthlyVolume, 0);
    const activeMerchants = merchants.filter(
      (m) => m.status === "active"
    ).length;
    const avgSuccessRate = 95.5; // Mock calculation
    const avgVolume = totalVolume / merchants.length;

    return {
      totalVolume: (totalVolume / 1000).toFixed(1) + "K",
      activeMerchants,
      avgSuccessRate: avgSuccessRate.toFixed(1) + "%",
      avgVolume: (avgVolume / 1000).toFixed(1) + "K",
    };
  };

  const stats = calculateStats();
  const statCards = [
    {
      icon: DollarSign,
      label: "Total Monthly Volume",
      value: `$${stats.totalVolume}`,
      change: "+12.5%",
      color: "bg-blue-500",
    },
    {
      icon: CheckCircle,
      label: "Avg Success Rate",
      value: stats.avgSuccessRate,
      change: "+2.3%",
      color: "bg-green-500",
    },
    {
      icon: Users,
      label: "Active Merchants",
      value: stats.activeMerchants,
      change: "+5",
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Avg Volume/Merchant",
      value: `$${stats.avgVolume}`,
      change: "+8.7%",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">
                <span className="inline-flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon size={24} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
