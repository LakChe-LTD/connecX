import React, { useState } from 'react';
import { Wifi, Activity, TrendingUp, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotspotsDashboard() {
  const [activeTab, setActiveTab] = useState('hotspots');

  const hotspots = [
    { id: '#P3345', owner: 'John Smith', location: 'New York, USA', status: 'Active', users: 42, speed: '96 Mbps' },
    { id: '#P3346', owner: 'John Smith', location: 'New York, USA', status: 'Offline', users: 0, speed: '50 Mbps' }
  ];

  return (
    <div className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-lg p-6 dark:bg-[#333436]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground text-sm">Your Active Hotspots</p>
            <Wifi className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">2,543</p>
        </div>

        <div className="bg-card rounded-lg p-6 dark:bg-[#333436]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground text-sm">Connected Users</p>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">2,103</p>
        </div>

        <div className="bg-card rounded-lg p-6 dark:bg-[#333436]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground text-sm">Average Speed</p>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">42 Mbps</p>
        </div>
      </div>

      {/* Map and Chart Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Map */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Hotspots locations</h3>
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-12 left-16 w-12 h-12 bg-blue-500/30 rounded-full blur-xl"></div>
              <div className="absolute top-20 left-32 w-8 h-8 bg-blue-500/40 rounded-full blur-lg"></div>
              <div className="absolute bottom-16 left-24 w-10 h-10 bg-blue-500/30 rounded-full blur-xl"></div>
              <div className="absolute top-16 right-32 w-6 h-6 bg-blue-500/50 rounded-full blur-md"></div>
            </div>
            <div className="relative z-10 text-muted-foreground">
              <Wifi className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Interactive map view</p>
            </div>
          </div>
        </div>

        {/* Usage Statistics Chart */}
        <div className="bg-card rounded-lg p-6 border border-border dark:bg-[#333436]">
          <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={40 * i}
                  x2="400"
                  y2={40 * i}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1"
                />
              ))}
              
              {/* Blue area chart */}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 120 L 50 110 L 100 100 L 150 95 L 200 80 L 250 60 L 300 50 L 350 45 L 400 40 L 400 200 L 0 200 Z"
                fill="url(#blueGradient)"
              />
              <path
                d="M 0 120 L 50 110 L 100 100 L 150 95 L 200 80 L 250 60 L 300 50 L 350 45 L 400 40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* Purple line chart */}
              <path
                d="M 0 150 L 50 148 L 100 145 L 150 142 L 200 140 L 250 138 L 300 135 L 350 133 L 400 130"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hotspots List */}
      <div className="bg-card rounded-lg border border-border dark:bg-[#333436]">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Hotspots List</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search hotspots..."
                  className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm flex items-center gap-2 hover:bg-muted transition-colors">
                All Items
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm flex items-center gap-2 hover:bg-muted transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Hotspot ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Owner</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Users</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Speed</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((hotspot, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm">{hotspot.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {hotspot.owner.charAt(0)}
                      </div>
                      <span className="text-sm">{hotspot.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{hotspot.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hotspot.status === 'Active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {hotspot.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{hotspot.users}</td>
                  <td className="px-6 py-4 text-sm">{hotspot.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors">
            Previous
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">1 to 3 of 15 results</span>
            <div className="flex items-center gap-1 ml-4">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                    page === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}