import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";

export default function KonnectXKitss() {
  const navigate = useNavigate();
  const { theme } = useApp(); // Access theme from context
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const kits = [
    {
      id: 1,
      name: 'Kit Alpha',
      status: 'Active',
      statusColor: 'text-green-600 bg-green-50',
      activationDate: '2023-08-15',
      location: 'New York'
    },
    {
      id: 2,
      name: 'Kit Beta',
      status: 'Pending',
      statusColor: 'text-yellow-600 bg-yellow-50',
      activationDate: '2023-09-20',
      location: 'Los Angeles'
    },
    {
      id: 3,
      name: 'Kit Gamma',
      status: 'Disabled',
      statusColor: 'text-red-600 bg-red-50',
      activationDate: '2023-10-05',
      location: 'Chicago'
    },
    {
      id: 4,
      name: 'Kit Delta',
      status: 'Active',
      statusColor: 'text-green-600 bg-green-50',
      activationDate: '2023-11-12',
      location: 'Houston'
    },
    {
      id: 5,
      name: 'Kit Epsilon',
      status: 'Active',
      statusColor: 'text-green-600 bg-green-50',
      activationDate: '2023-12-01',
      location: 'Phoenix'
    }
  ];

  const filteredKits = kits.filter(kit => {
    const matchesSearch = kit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'active' ? kit.status === 'Active' :
      activeTab === 'disabled' ? kit.status === 'Disabled' : true;
    return matchesSearch && matchesTab;
  });

  return (

     <>
      <Helmet>
        <title>All Kits | KonnectX</title>
        <meta
          name="description"
          content="View and manage all hotspot kits available in the KonnectX decentralized network. Monitor kit status, assignments, and operator activities."
        />
        <meta
          name="keywords"
          content="KonnectX, hotspot kits, All Kits, decentralized network, KXT token, kit management, operator kits"
        />
        <meta property="og:title" content="All Kits - KonnectX" />
        <meta
          property="og:description"
          content="View and manage all hotspot kits available in the KonnectX decentralized network. Monitor kit status, assignments, and operator activities."
        />
      </Helmet>

    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Kits
          </h1>
          <div className="flex gap-3">
            <button className={`px-4 py-2 border rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-blue-400 border-blue-400 hover:bg-blue-400/10' 
                : 'text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}>
              Donate
            </button>
            <button
              onClick={() => navigate("/dashboard/independentOperator")}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Add Kit
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} size={20} />
            <input
              type="text"
              placeholder="Search Kits"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark'
                  ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-900 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-4 mb-6 border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'all'
                ? theme === 'dark'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                  : 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Kits
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'active'
                ? theme === 'dark'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                  : 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('disabled')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'disabled'
                ? theme === 'dark'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                  : 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Disabled
          </button>
        </div>

        {/* Table */}
        <div className={`rounded-lg border-2 overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#333436] border-gray-700'
            : 'bg-white border-gray-900'
        }`}>
          <table className="w-full border-separate border-spacing-y-4">
            <thead className={theme === 'dark' ? 'bg-[#2b2b2c]' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-lg font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Kit Name
                </th>
                <th className={`px-6 py-3 text-left text-lg font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-lg font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Activation Date
                </th>
                <th className={`px-6 py-3 text-left text-lg font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-lg font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredKits.map((kit) => (
                <tr
                  key={kit.id}
                  className={`shadow-sm hover:shadow-md border rounded-lg ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 hover:bg-[#3a3b3d]'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-xl font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {kit.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xl font-semibold ${kit.statusColor}`}>
                      {kit.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-xl font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {kit.activationDate}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-xl font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {kit.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className={`font-bold hover:underline ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredKits.length === 0 && (
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No kits found matching your search criteria.
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  );
}