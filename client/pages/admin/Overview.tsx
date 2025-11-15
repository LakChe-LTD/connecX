import React, { useState } from 'react';
import { Users, Wifi, DollarSign, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Week');

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
    { name: 'Emma Wilson', email: 'emma@enterprise.com', status: 'Inactive', location: 'London, UK', time: '1 day ago', avatar: 'EW' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6   dark:bg-[#333436] shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center  dark:bg-[#303133] justify-center">
                <stat.icon className="w-6 h-6 text-foreground  " />
              </div>
              {stat.positive !== null && (
                <span className={`text-xs font-medium px-2 py-1 rounded ${stat.positive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {stat.change}
                </span>
              )}
              {stat.positive === null && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl p-6  dark:bg-[#333436] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">User Growth</h2>
            <div className="flex space-x-1 bg-muted rounded-lg dark:bg-[#303133] p-1">
              <button
                onClick={() => setActiveTab('Day')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md  transition-colors ${
                  activeTab === 'Day' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setActiveTab('Week')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'Week' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveTab('Month')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'Month' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" opacity={0.3} />
              <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px' }} />
              <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
              <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={false} fill="url(#colorUsers)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Hotspots */}
        <div className="bg-card rounded-xl p-6  dark:bg-[#333436] shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Top Performing Hotspots</h2>
          <div className="space-y-4">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${hotspot.color}`}></div>
                  <span className="text-sm text-foreground">{hotspot.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{hotspot.uptime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between dark:bg-[#333436]">
          <h2 className="text-lg font-bold text-foreground">Recent Users</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Import CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border dark:bg-[#333436]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-muted/30 transition-colors  dark:bg-[#333436]">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.location}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.time}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4   dark:bg-[#333436] flex items-center justify-center space-x-2">
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted/50 transition-colors ">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted/50 transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded font-medium">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted/50 transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted/50 transition-colors">
            &gt;
          </button>
          <button className="ml-2 px-3 h-8 flex items-center justify-center border border-border rounded text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;