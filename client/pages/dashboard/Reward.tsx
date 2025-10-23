import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function DashboardReward() {
  const monthlyData = [
    { month: "Jan", amount: 400 },
    { month: "Feb", amount: 600 },
    { month: "Mar", amount: 550 },
    { month: "Apr", amount: 650 },
    { month: "May", amount: 500 },
    { month: "Jun", amount: 700 }
  ];

  const trendData = [
    { month: "1", value: 100 },
    { month: "2", value: 150 },
    { month: "3", value: 200 },
    { month: "4", value: 180 },
    { month: "5", value: 250 },
    { month: "6", value: 300 },
    { month: "7", value: 320 },
    { month: "8", value: 350 },
    { month: "9", value: 400 }
  ];

  const hotspots = [
    { date: "Mar 16, 2024", desc: "Staking Reward", type: "Referral", amount: "+2,490KXT", color: "text-green-600" },
    { date: "Mar 16, 2024", desc: "Staking Reward", type: "Storage", amount: "+2,490KXT", color: "text-blue-600" },
    { date: "Mar 15, 2024", desc: "Staking Reward", type: "Referral", amount: "+2,490KXT", color: "text-purple-600" },
    { date: "Mar 15, 2024", desc: "Staking Reward", type: "Storage", amount: "+2,490KXT", color: "text-yellow-600" },
    { date: "Mar 15, 2024", desc: "Staking Reward", type: "Referral", amount: "+2,490KXT", color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Rewards Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">Join Smith</Button>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">Connect Wallet</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-500 mb-1">Total KXT Earned</p>
            <h3 className="text-3xl font-bold text-gray-900">458.61</h3>
            <p className="text-sm text-blue-600 mt-2">1.12.8% vs last month</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-500 mb-1">Monthly Rewards</p>
            <h3 className="text-3xl font-bold text-gray-900">38,190.95</h3>
            <p className="text-sm text-gray-400 mt-2">3.6.5% vs previous average</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-500 mb-1">Pending Rewards</p>
            <h3 className="text-3xl font-bold text-gray-900">1,284</h3>
            <p className="text-sm text-gray-400 mt-2">1.02.2% vs last month</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-500 mb-1">Total Connections</p>
            <h3 className="text-3xl font-bold text-gray-900">2,847</h3>
            <p className="text-sm text-gray-400 mt-2">Active nodes online</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Earnings Bar Chart */}
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings</h3>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Earnings Trend Area Chart */}
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Earnings Trend</h3>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option>1 month</option>
                <option>3 months</option>
                <option>6 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Hotspots List */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Hotspots List</h3>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="border border-gray-300 rounded-md pl-9 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Description</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {hotspots.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-600">{item.date}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{item.desc}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'Referral' && idx === 0 ? 'bg-green-100 text-green-700' :
                        item.type === 'Storage' && idx === 1 ? 'bg-blue-100 text-blue-700' :
                        item.type === 'Referral' && idx === 2 ? 'bg-purple-100 text-purple-700' :
                        item.type === 'Storage' && idx === 3 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing <span className="font-medium">1 to 5</span> of results</p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="px-3 py-1.5 border-gray-300 hover:bg-gray-50">‹</Button>
              <Button variant="outline" size="sm" className="px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 border-gray-900">1</Button>
              <Button variant="outline" size="sm" className="px-3 py-1.5 border-gray-300 hover:bg-gray-50">2</Button>
              <Button variant="outline" size="sm" className="px-3 py-1.5 border-gray-300 hover:bg-gray-50">3</Button>
              <Button variant="outline" size="sm" className="px-3 py-1.5 border-gray-300 hover:bg-gray-50">›</Button>
            </div>
          </div>
        </Card>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Reward Distribution</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm font-semibold text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Referral</span>
                <span className="text-sm font-semibold text-gray-900">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Staking</span>
                <span className="text-sm font-semibold text-gray-900">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Reward claimed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Storage milestone reached</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">New referral bonus</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Claim Rewards
              </Button>
              <Button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View History
              </Button>
              <Button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}