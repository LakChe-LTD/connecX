import React from 'react';
import { Wifi, Smartphone, MapPin, Search } from 'lucide-react';

export default function KonnectXEndusersDashboard({ theme = 'light' }) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Marvelous!</h1>
          <p className="text-blue-100 font-medium">Here's your connectivity overview</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Plan */}
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 font-bold text-sm">Active</span>
          </div>
          <p className={`text-sm mb-1 font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Plan</p>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Monthly Premium</h3>
          <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Expires on 17/12/2025</p>
        </div>

        {/* Data Usage */}
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 font-bold text-sm">32%</span>
          </div>
          <p className={`text-sm mb-1 font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Data Usage</p>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3.2 / 10 GB</h3>
          <div className={`w-full rounded-full h-2 mt-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
          </div>
        </div>

        {/* Total Connections */}
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 font-bold text-sm">+12%</span>
          </div>
          <p className={`text-sm mb-1 font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Connections</p>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3</h3>
          <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>This month</p>
        </div>

        {/* Active Devices */}
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-orange-600 font-bold text-sm">2</span>
          </div>
          <p className={`text-sm mb-1 font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Devices</p>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>2</h3>
          <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Linked devices</p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Subscription */}
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Active Subscription</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Your current plan details</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">7 days left</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Monthly Premium</h4>
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Started 07/11/2025</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className={`font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Data Usage</span>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3.2 GB / 10 GB</span>
              </div>
              <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
            <button className={`px-6 py-2.5 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Manage
            </button>
          </div>
        </div>

        {/* Quick Connect */}
        <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 shadow-sm text-white">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Quick Connect</h3>
            <p className="text-blue-100 text-sm font-medium">Connect to a nearby hotspot instantly</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Find Hotspots</h4>
                <p className="text-blue-100 text-sm font-medium mb-4">Discover nearby locations</p>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Find Nearby Hotspots"
                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium">Or scan QR code at any KonnectX location</p>
          </div>
        </div>

        {/* Recent Connections */}
        <div className={`col-span-1 lg:col-span-3 ${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-6 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Connections</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Your latest WiFi sessions</p>
            </div>
            <button className="text-blue-600 text-sm font-bold hover:text-blue-700">View All</button>
          </div>

          <div className="space-y-4">
            <ConnectionItem 
              name="Downtown Hub"
              date="12/11/2025"
              duration="157 min"
              data="250 MB"
              theme={theme}
            />
            <ConnectionItem 
              name="City Plaza WiFi"
              date="11/11/2025"
              duration="65 min"
              data="480 MB"
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectionItem({ name, date, duration, data, theme }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Wifi className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{name}</h4>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{date} • {duration}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data}</p>
        <p className="text-xs text-green-600 font-bold">Completed</p>
      </div>
    </div>
  );
}