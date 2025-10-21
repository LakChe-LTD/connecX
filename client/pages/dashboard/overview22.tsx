import { Wifi, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DashboardOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Wifi className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">KonnectX</span>
            </div>
            <span className="text-gray-700 font-medium">Dashboard Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              ⬆ Export
            </button>
            <button className="px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800">
              + Add Hotspot
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 min-h-screen p-4">
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-white bg-gray-800 rounded-lg">
              <span className="text-lg">📊</span>
              <span className="font-medium">Hotspots</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
              <span className="text-lg">↻</span>
              <span className="font-medium">Referrals</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
              <span className="text-lg">🎁</span>
              <span className="font-medium">Rewards</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
              <span className="text-lg">💰</span>
              <span className="font-medium">Wallet</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </a>
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-8 left-4 right-4">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div>
                <p className="text-white text-sm font-medium">John Smith</p>
                <p className="text-gray-400 text-xs">john@example.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Active Hotspots</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">24</h3>
              <p className="text-xs text-gray-400">+5 this month</p>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Average Uptime</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">99.8%</h3>
              <p className="text-xs text-gray-400">Last 30 days</p>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Connected Users</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">1,284</h3>
              <p className="text-xs text-gray-400">+127 today</p>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Avg. Speed</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">126</h3>
              <p className="text-xs text-gray-400">Mbps</p>
            </Card>
          </div>

          {/* Performance Overview and Rewards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <Card className="col-span-2 p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Day</button>
                  <button className="px-3 py-1 text-sm text-white bg-gray-900 rounded">Week</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Month</button>
                </div>
              </div>
              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 600 250">
                  {/* Grid lines */}
                  <line x1="40" y1="200" x2="580" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="150" x2="580" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="100" x2="580" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="40" y1="50" x2="580" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="25" y="205" fontSize="12" fill="#9ca3af">0GB</text>
                  <text x="15" y="155" fontSize="12" fill="#9ca3af">50GB</text>
                  <text x="10" y="105" fontSize="12" fill="#9ca3af">100GB</text>
                  <text x="10" y="55" fontSize="12" fill="#9ca3af">150GB</text>
                  
                  {/* Area path */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M 40 180 L 120 175 L 200 170 L 280 160 L 360 145 L 440 135 L 520 140 L 580 130 L 580 200 L 40 200 Z"
                    fill="url(#areaGradient)"
                  />
                  
                  {/* Line path */}
                  <path
                    d="M 40 180 L 120 175 L 200 170 L 280 160 L 360 145 L 440 135 L 520 140 L 580 130"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                  
                  {/* X-axis labels */}
                  <text x="35" y="220" fontSize="12" fill="#9ca3af">Mon</text>
                  <text x="115" y="220" fontSize="12" fill="#9ca3af">Tue</text>
                  <text x="195" y="220" fontSize="12" fill="#9ca3af">Wed</text>
                  <text x="275" y="220" fontSize="12" fill="#9ca3af">Thu</text>
                  <text x="360" y="220" fontSize="12" fill="#9ca3af">Fri</text>
                  <text x="435" y="220" fontSize="12" fill="#9ca3af">Sat</text>
                  <text x="515" y="220" fontSize="12" fill="#9ca3af">Sun</text>
                </svg>
              </div>
            </Card>

            {/* Rewards Distribution */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Rewards Distribution</h3>
              <div className="flex items-center justify-center mb-4">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="126 377"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray="94 377"
                    strokeDashoffset="-126"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="20"
                    strokeDasharray="94 377"
                    strokeDashoffset="-220"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray="63 377"
                    strokeDashoffset="-314"
                    transform="rotate(-90 100 100)"
                  />
                  <circle cx="100" cy="100" r="60" fill="white" />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Network Rewards</span>
                  </div>
                  <span className="font-semibold text-gray-900">35%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Referral Bonus</span>
                  </div>
                  <span className="font-semibold text-gray-900">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Performance</span>
                  </div>
                  <span className="font-semibold text-gray-900">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Staking Rewards</span>
                  </div>
                  <span className="font-semibold text-gray-900">15%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Hotspots Table */}
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Hotspots</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Earnings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">Downtown Hub</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">234</td>
                  <td className="py-4 px-4 text-gray-900 font-semibold">$1,234.56</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 text-sm hover:underline">Edit</button>
                      <button className="text-red-600 text-sm hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">Marina District</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">189</td>
                  <td className="py-4 px-4 text-gray-900 font-semibold">$987.65</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 text-sm hover:underline">Edit</button>
                      <button className="text-red-600 text-sm hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}