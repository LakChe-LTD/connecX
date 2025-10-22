import { BarChart3, TrendingUp, Wifi, Users, Zap, Gift, Home, DollarSign, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState('day');

  const topStats = [
    {
      label: "Active Hotspots",
      value: "24",
      sublabel: "Hotspots"
    },
    {
      label: "Manage Uptime",
      value: "99.8%",
      sublabel: ""
    },
    {
      label: "Connected Users",
      value: "1,284",
      sublabel: ""
    },
    {
      label: "Avg. Speed",
      value: "125",
      sublabel: "Mbps"
    }
  ];

  const hotspots = [
    { name: "Downtown Hub", status: "Active", users: 234, earnings: "$1,234.56" },
    { name: "Marina District", status: "Active", users: 189, earnings: "$987.65" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="p-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topStats.map((stat, idx) => (
            <Card key={idx} className="p-6 bg-white border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    {stat.sublabel && <span className="text-sm text-gray-500">{stat.sublabel}</span>}
                  </div>
                </div>
                {idx === 0 && <Wifi className="w-5 h-5 text-gray-400" />}
                {idx === 1 && <TrendingUp className="w-5 h-5 text-gray-400" />}
                {idx === 2 && <Users className="w-5 h-5 text-gray-400" />}
                {idx === 3 && <Zap className="w-5 h-5 text-gray-400" />}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Overview */}
          <Card className="lg:col-span-2 p-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <div className="flex gap-2">
                {['Day', 'Week', 'Month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 600 250">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={40 + i * 42}
                    x2="580"
                    y2={40 + i * 42}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area under curve */}
                <path
                  d="M 40 140 L 120 120 L 200 110 L 280 115 L 360 95 L 440 80 L 520 85 L 580 75 L 580 220 L 40 220 Z"
                  fill="url(#areaGradient)"
                />
                
                {/* Line */}
                <path
                  d="M 40 140 L 120 120 L 200 110 L 280 115 L 360 95 L 440 80 L 520 85 L 580 75"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* X-axis labels */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <text
                    key={day}
                    x={40 + i * 90}
                    y="240"
                    fill="#6b7280"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {day}
                  </text>
                ))}
              </svg>
            </div>
          </Card>

          {/* Rewards Distribution */}
          <Card className="p-6 bg-white border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Rewards Distribution</h3>
            <div className="flex items-center justify-center mb-6">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="150 502"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray="125 502"
                  strokeDashoffset="-150"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="20"
                  strokeDasharray="100 502"
                  strokeDashoffset="-275"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="127 502"
                  strokeDashoffset="-375"
                  transform="rotate(-90 100 100)"
                />
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { color: 'bg-blue-500', label: 'Referral Rewards', value: '30%' },
                { color: 'bg-red-500', label: 'Usage Rewards', value: '25%' },
                { color: 'bg-yellow-500', label: 'Bonus Rewards', value: '20%' },
                { color: 'bg-green-500', label: 'Uptime Rewards', value: '25%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Hotspots Table */}
        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Hotspots</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Users</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Earnings</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((hotspot, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Wifi className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">{hotspot.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        {hotspot.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{hotspot.users}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{hotspot.earnings}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}