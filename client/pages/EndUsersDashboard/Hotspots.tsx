import React, { useState } from 'react';
import { Wifi, MapPin, Zap, Signal, List } from 'lucide-react';

export default function KonnectXEndUsersHotspots() {
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
      status: 'Online'
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
      status: 'Online'
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
      status: 'Online'
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
      status: 'Online'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Discover Hotspots</h1>
          <p className="text-xl text-gray-600">Find and connect to KonnectX WiFi hotspots near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or location"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium"
            >
              <option>All Cities</option>
              <option>New York</option>
              <option>Los Angeles</option>
            </select>
            <select
              value={speedFilter}
              onChange={(e) => setSpeedFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium"
            >
              <option>Any Speed</option>
              <option>50+ Mbps</option>
              <option>100+ Mbps</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium"
            >
              <option>All Status</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            <button className="px-6 py-3 text-base text-blue-600 hover:text-blue-700 font-semibold hover:bg-blue-50 rounded-xl transition-colors">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-700">Found 5 hotspots</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-3 rounded-xl ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <MapPin className="w-5 h-5" />
            </button>
            <span className="text-base font-medium text-gray-600 ml-2">Map View</span>
          </div>
        </div>

        {/* Hotspot Cards */}
        <div className="space-y-6">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{hotspot.name}</h3>
                    <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg">
                      {hotspot.status}
                    </span>
                  </div>
                  <div className="text-base text-gray-600 mb-6 font-medium">{hotspot.location}</div>
                  
                  <div className="flex items-center gap-8 text-base text-gray-700 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{hotspot.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{hotspot.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Signal className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{hotspot.latency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{hotspot.range}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                      <span>Signal</span>
                      <span>{hotspot.signal}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${hotspot.signal}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 ml-8">
                  <button className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                    Connect
                  </button>
                  <button className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-base hover:bg-gray-50 transition-colors">
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