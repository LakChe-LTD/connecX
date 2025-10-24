import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useApp } from "@/contexts/AppContext";

export default function DashboardReward() {
  const { theme } = useApp();

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
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Total KXT Earned</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>458.61</h3>
          <p className="text-sm mt-2">
  <span className="text-green-600 font-semibold">1.12.8%</span>{' '}
  <span className="text-gray-300">vs last month</span>
</p>
          
        </Card>

        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Monthly Rewards</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>38,190.95</h3>
          <p className="text-sm mt-2">
  <span className="text-green-600 font-semibold">3.6.5% </span>{' '}
  <span className="text-gray-300">vs previous average</span>
</p>

        </Card>

        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Pending Rewards</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>1,284</h3>
          <p className="text-sm mt-2">
  <span className="text-green-600 font-semibold">1.02.2%</span>{' '}
  <span className="text-gray-300">vs last month</span>
</p>

        </Card>

        
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Earnings Bar Chart */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Monthly Earnings</h3>
            <select className={`border rounded px-3 py-1 text-sm ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-800 text-white'
                : 'border-gray-300'
            }`}>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#FFFFFF' : '#A9A9A9'} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                  color: theme === 'dark' ? '#fff' : '#000'
                }} 
              />
              <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Earnings Trend Area Chart */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Earnings Trend</h3>
            <select className={`border rounded px-3 py-1 text-sm ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-800 text-white'
                : 'border-gray-300'
            }`}>
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#FFFFFF' : '#A9A9A9'} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                  color: theme === 'dark' ? '#fff' : '#000'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Hotspots List */}
<Card
  className={`p-6 ${
    theme === 'dark'
      ? 'bg-black border-black'
      : 'bg-white border-gray-200'
  }`}
>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    {/* Title */}
    <h3
      className={`text-lg font-semibold ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}
    >
      Hotspots List
    </h3>

    {/* Search + Filter Section */}
    <div className="flex items-center justify-center gap-3 w-full md:w-auto">
      {/* Search Input */}
      <div className="flex justify-center my-4">
      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search products..."
          className={`border rounded-md pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-black border-gray-800 text-white placeholder-gray-500'
              : 'border-gray-300'
          }`}
        />
        <svg
          className="w-4 h-4 absolute left-3 top-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        </div>
      </div>

      {/* Filter Dropdown */}
      <select
        className={`border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800 text-blue-500'
            : 'border-gray-300'
        }`}
      >
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      {/* Filter Button */}
      <Button
        className={`px-4 py-2 flex items-center ${
          theme === 'dark'
            ? 'bg-blue-500 text-black text-xl hover:bg-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                theme === 'dark' 
                  ? 'border-black bg-black'
                  : 'border-white bg-white'
              }`}>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Date</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Description</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Type</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((item, idx) => (
                <tr key={idx} className={`border-b transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-900 hover:bg-gray-900'
                    : 'border-gray-100 hover:bg-gray-50'
                }`}>
                  <td className={`py-4 px-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.date}</td>
                  <td className={`py-4 px-4 text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{item.desc}</td>
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
                  <td className={`py-4 px-4 text-sm font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`flex items-center justify-between mt-6 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Showing <span className="font-medium">1 to 5</span> of results</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className={`px-3 py-1.5 ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900 text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>‹</Button>
            <Button variant="outline" size="sm" className={`px-3 py-1.5 ${
              theme === 'dark'
                ? 'bg-white text-black hover:bg-gray-200 border-white'
                : 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
            }`}>1</Button>
            <Button variant="outline" size="sm" className={`px-3 py-1.5 ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900 text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>2</Button>
            <Button variant="outline" size="sm" className={`px-3 py-1.5 ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900 text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>3</Button>
            <Button variant="outline" size="sm" className={`px-3 py-1.5 ${
              theme === 'dark'
                ? 'border-gray-800 hover:bg-gray-900 text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>›</Button>
          </div>
        </div>
      </Card>
    </div>
  );        
}