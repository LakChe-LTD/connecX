import React, { useState } from 'react';
import { Users, Wifi, DollarSign, RefreshCw, Search, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Week');
  const [currentPage, setCurrentPage] = useState(1);

  const userGrowthData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 500 },
    { month: 'Mar', users: 600 },
    { month: 'Apr', users: 700 },
    { month: 'May', users: 900 },
    { month: 'Jun', users: 1100 },
    { month: 'Jul', users: 1250 },
    { month: 'Aug', users: 1300 }
  ];

  const stats = [
    { icon: Users, value: '2,543', label: 'Total Users', change: '+12.5%', positive: true },
    { icon: Wifi, value: '1,875', label: 'Active Hotspots', change: '+4.8%', positive: true },
    { icon: DollarSign, value: '$12,450', label: 'Pending Payouts', change: 'Pending', positive: null },
    { icon: RefreshCw, value: '324', label: 'Daily Referrals', change: '+16.2%', positive: true }
  ];

  const hotspots = [
    { name: 'Central Station', uptime: '98.5%', color: 'bg-green-500' },
    { name: 'Shopping Mall', uptime: '95.2%', color: 'bg-blue-500' },
    { name: 'City Park', uptime: '89.7%', color: 'bg-yellow-500' },
    { name: 'Library', uptime: '96.8%', color: 'bg-purple-500' },
    { name: 'Coffee Shop', uptime: '92.3%', color: 'bg-pink-500' }
  ];

  const recentUsers = [
    { name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Active', location: 'New York, USA', time: '2 minutes ago', avatar: 'SJ' },
    { name: 'Michael Chen', email: 'michael.chen@tech.com', status: 'Pending', location: 'Singapore', time: '5 hours ago', avatar: 'MC' },
    { name: 'Michael Chen', email: 'michael@enterprise.com', status: 'Inactive', location: 'London, UK', time: '5 hours ago', avatar: 'MC' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Overview and management of platform activities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  {stat.positive !== null && (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {stat.change}
                    </span>
                  )}
                  {stat.positive === null && (
                    <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* User Growth Chart */}
            <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">User Growth</h2>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('Day')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'Day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setActiveTab('Week')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'Week' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setActiveTab('Month')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'Month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={false} fill="url(#colorUsers)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Performing Hotspots */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performing Hotspots</h2>
              <div className="space-y-4">
                {hotspots.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${hotspot.color}`}></div>
                      <span className="text-sm text-gray-700">{hotspot.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{hotspot.uptime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Users</h2>
              <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Import CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' :
                          user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.time}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded font-medium">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                &gt;
              </button>
              <button className="ml-2 px-3 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;