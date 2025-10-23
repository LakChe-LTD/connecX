import { BarChart3, TrendingUp, Wifi, Users, Zap, Gift, Home, DollarSign, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState('day');

  const topStats = [
    {
      label: "Active Hotspots",
      icon: Wifi,
      value: "24",
      sublabel: "|8.2%"
    },
    {
      label: "Average Uptime",
      value: "99.8%",
      sublabel: "|1.2% "  
    },
    {
      label: "Connected Users",
      value: "1,284",
      sublabel: "|12.5"
    },
    {
      label: "Avg. Speed",
      value: "125 Mbps",
      sublabel: "|8.2"
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
                 {/* <stat.icon className="w-5 h-5" /> */}
                  <p className="text-xl font-bold text-black mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    {stat.sublabel && <span className="text-xl text-green-500">{stat.sublabel}</span>}
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
              <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
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
              <svg className="w-full h-full" viewBox="0 0 700 280">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Y-axis labels */}
                {[0, 300, 600, 900, 1200, 1500].map((val, i) => (
                  <text
                    key={val}
                    x="25"
                    y={240 - i * 48}
                    fill="#9ca3af"
                    fontSize="11"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                ))}
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={240 - i * 48}
                    x2="670"
                    y2={240 - i * 48}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area under curve - smooth bezier curve */}
                <path
                  d="M 50 180 
                     C 80 175, 110 170, 140 165
                     C 170 160, 200 155, 230 150
                     C 260 145, 290 140, 320 135
                     C 350 128, 380 115, 410 105
                     C 440 95, 470 88, 500 82
                     C 530 76, 560 72, 590 70
                     C 620 68, 645 67, 670 65
                     L 670 250 L 50 250 Z"
                  fill="url(#areaGradient)"
                />
                
                {/* Line - smooth bezier curve */}
                <path
                  d="M 50 180 
                     C 80 175, 110 170, 140 165
                     C 170 160, 200 155, 230 150
                     C 260 145, 290 140, 320 135
                     C 350 128, 380 115, 410 105
                     C 440 95, 470 88, 500 82
                     C 530 76, 560 72, 590 70
                     C 620 68, 645 67, 670 65"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* X-axis */}
                <line
                  x1="50"
                  y1="250"
                  x2="670"
                  y2="250"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                
                {/* X-axis labels */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <text
                    key={day}
                    x={50 + i * 90}
                    y="268"
                    fill="#9ca3af"
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
            <div className="flex items-center justify-center">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="40"
                  strokeDasharray="150 502"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
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
                  strokeWidth="40"
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
                  strokeWidth="40"
                  strokeDasharray="127 502"
                  strokeDashoffset="-375"
                  transform="rotate(-90 100 100)"
                />
              </svg>
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