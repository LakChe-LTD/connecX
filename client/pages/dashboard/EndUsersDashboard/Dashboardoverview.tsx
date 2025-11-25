import React, { useState } from 'react';
import { Wifi, Home, Smartphone, Wallet, User, Bell, LogOut, MapPin, Search } from 'lucide-react';





export default function KonnectXDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">KonnectX</h1>
              <p className="text-xs text-gray-500">Stay connected</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <NavItem icon={Home} label="Dashboard" active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} />
          <NavItem icon={Wifi} label="Hotspots" active={activeMenu === 'hotspots'} onClick={() => setActiveMenu('hotspots')} />
          <NavItem icon={Smartphone} label="Plans" active={activeMenu === 'plans'} onClick={() => setActiveMenu('plans')} />
          <NavItem icon={Smartphone} label="Subscriptions" active={activeMenu === 'subscriptions'} onClick={() => setActiveMenu('subscriptions')} />
          <NavItem icon={Wallet} label="Wallet" active={activeMenu === 'wallet'} onClick={() => setActiveMenu('wallet')} />
          <NavItem icon={User} label="Profile" active={activeMenu === 'profile'} onClick={() => setActiveMenu('profile')} />
          <NavItem icon={Bell} label="Notifications" active={activeMenu === 'notifications'} onClick={() => setActiveMenu('notifications')} />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              C
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Chizurummarvelous14</p>
              <p className="text-xs text-gray-500">chizurummarvelous14@g...</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Wifi className="w-4 h-4" />
              <span className="text-blue-600 font-medium">Dashboard</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Chizurummarvelous14!</h1>
              <p className="text-blue-100">Here's your connectivity overview</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Active Plan */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-blue-600 font-semibold text-sm">Active</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Active Plan</p>
              <h3 className="text-xl font-bold text-gray-900">Monthly Premium</h3>
              <p className="text-gray-500 text-xs mt-1">Expires on 17/12/2025</p>
            </div>

            {/* Data Usage */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-purple-600 font-semibold text-sm">32%</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Data Usage</p>
              <h3 className="text-xl font-bold text-gray-900">3.2 / 10 GB</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            {/* Total Connections */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 font-semibold text-sm">+12%</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Connections</p>
              <h3 className="text-xl font-bold text-gray-900">3</h3>
              <p className="text-gray-500 text-xs mt-1">This month</p>
            </div>

            {/* Active Devices */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-orange-600 font-semibold text-sm">2</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Active Devices</p>
              <h3 className="text-xl font-bold text-gray-900">2</h3>
              <p className="text-gray-500 text-xs mt-1">Linked devices</p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Active Subscription */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Active Subscription</h3>
                  <p className="text-sm text-gray-500">Your current plan details</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">Plan expires in 7</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Monthly Premium</h4>
                    <p className="text-xs text-gray-500">Started 07/11/2025</p>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Data Usage</span>
                    <span className="font-semibold text-gray-900">3.2 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Upgrade Plan
                </button>
                <button className="px-6 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Manage
                </button>
              </div>
            </div>

            {/* Quick Connect */}
            <div className="col-span-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 shadow-sm text-white">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Quick Connect</h3>
                <p className="text-blue-100 text-sm">Connect to a nearby hotspot instantly</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">Find Hotspots</h4>
                    <p className="text-blue-100 text-sm mb-4">Discover nearby locations</p>
                    
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Find Nearby Hotspots"
                        className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-blue-100 text-sm">Or scan QR code at any KonnectX location</p>
              </div>
            </div>

            {/* Recent Connections */}
            <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Connections</h3>
                  <p className="text-sm text-gray-500">Your latest WiFi sessions</p>
                </div>
                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">View All</button>
              </div>

              <div className="space-y-4">
                <ConnectionItem 
                  name="Downtown Hub"
                  date="12/11/2025"
                  duration="157 min"
                  data="250 MB"
                />
                <ConnectionItem 
                  name="City Plaza WiFi"
                  date="11/11/2025"
                  duration="65 min"
                  data="480 MB"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
        <Smartphone className="w-5 h-5" />
        Mobile View
      </button>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-1 transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function ConnectionItem({ name, date, duration, data }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Wifi className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{date} • {duration}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">{data}</p>
        <p className="text-xs text-green-600 font-medium">Completed</p>
      </div>
    </div>
  );
}