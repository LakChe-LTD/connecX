import React, { useState } from 'react';
import { Wifi, MapPin, Zap, Signal, List } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";

export default function KonnectXHotspots() {
   const { theme } = useApp();
  const [viewMode, setViewMode] = useState('list');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [speedFilter, setSpeedFilter] = useState('Any Speed');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const hotspots = [
    {
      id: 1,
      name: 'Downtown Hub',
      location: 'KonnectX Central',
      distance: '123 Main St',
      speed: '100 Mbps',
      latency: '43',
      range: '0.5 km away',
      signal: 95,
    },
    {
      id: 2,
      name: 'City Plaza WiFi',
      location: 'Urban Connect',
      distance: '456 Park Ave',
      speed: '150 Mbps',
      latency: '48',
      range: '1.2 km away',
      signal: 88,
    },
    {
      id: 3,
      name: 'Metro Station #5',
      location: 'KonnectX Metro',
      distance: '789 Station Blvd',
      speed: '80 Mbps',
      latency: '52',
      range: '2.1 km away',
      signal: 72,
    },
    {
      id: 4,
      name: 'Airport Terminal A',
      location: 'SkyNet Connect',
      distance: 'JFK Airport',
      speed: '200 Mbps',
      latency: '49',
      range: '15.1 km away',
      signal: 94,
    }
  ];

  return (
    <div className={`min-hrrcreen p-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="w-full max-w-full px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Discover Hotspots</h1>
          <p className={`text-black font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Find and connect to KonnectX WiFi hotspots near you</p>
        </div>

        {/* Search and Filters */} 
        <div className={`rounded-2xl shadow-lg p-8 mb-8 border ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-100'}`}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or location"
                className={`w-full px-6 py-4 border-2 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#2a2b2d]  border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 text-gray-900'}`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className={`px-6 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  text-base font-medium ${theme === 'dark' ? 'bg-[#2a2b2d]  border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}
            >
              <option>All Cities</option>
              <option>New York</option>
              <option>Los Angeles</option>
            </select>
            <select
              value={speedFilter}
              onChange={(e) => setSpeedFilter(e.target.value)}
              className={`px-6 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium ${theme === 'dark' ? 'bg-[#2a2b2d]  border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}
            >
              <option>Any Speed</option>
              <option>50+ Mbps</option>
              <option>100+ Mbps</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-6 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium ${theme === 'dark' ? 'bg-[#2a2b2d]  border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}
            >
              <option>All Status</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            <button className={`px-6 py-3 border-2 rounded-xl text-base font-medium ${theme === 'dark' ? 'bg-[#2a2b2d] border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Found 4 hotspots</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gray-900 text-white' : theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-3 rounded-xl ${viewMode === 'map' ? 'bg-gray-900 text-white' : theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <MapPin className="w-5 h-5" />
            </button>
            <span className={`text-base font-bold ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Map View</span>
          </div>
        </div>

        {/* Hotspot Cards */}
        <div className="space-y-6">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className={`w-full rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{hotspot.name}</h3>
                  </div>
                  <div className={`text-lg mb-6 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{hotspot.location}</div>
                  
                  <div className={`flex items-center gap-8 text-base mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="font-bold">{hotspot.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-gray-500" />
                      <span className="font-bold">{hotspot.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Signal className="w-5 h-5 text-gray-500" />
                      <span className="font-bold">{hotspot.latency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-gray-500" />
                      <span className="font-bold">{hotspot.range}</span>
                    </div>
                  </div>

                  <div>
                    <div className={`flex items-center justify-between text-sm font-black mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span>Signal</span>
                      <span>{hotspot.signal}%</span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="bg-black dark:bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${hotspot.signal}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 ml-8">
                  <button className="px-8 py-3.5 bg-black dark:bg-blue-600 text-white rounded-xl font-medium text-base  transition-colors shadow-md hover:shadow-lg">
                    Connect
                  </button>
                  <button className={`px-8 py-3.5 border-2 rounded-xl font-medium text-base transition-colors ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}