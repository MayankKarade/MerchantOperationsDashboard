import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Visualization({ merchants }) {
  // Process data for chart
  const chartData = merchants.map((merchant) => ({
    name: merchant.name.substring(0, 3) + "...",
    volume: merchant.monthlyVolume / 1000,
    chargeback: merchant.chargebackRatio,
  }));

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === "volume"
                ? `Volume: $${entry.value}K`
                : `Chargeback: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Merchant Performance</h3>
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#3b82f6", fontSize: 12 }}
              label={{
                value: "Volume ($K)",
                angle: -90,
                position: "insideLeft",
                fill: "#3b82f6",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#ef4444", fontSize: 12 }}
              label={{
                value: "Chargeback (%)",
                angle: 90,
                position: "insideRight",
                fill: "#ef4444",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="right"
              dataKey="chargeback"
              name="Chargeback"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Bar
              yAxisId="left"
              dataKey="volume"
              name="Volume"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-600">Monthly Volume (in thousands)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
          <span className="text-gray-600">Chargeback Ratio (%)</span>
        </div>
      </div>
    </div>
  );
}
