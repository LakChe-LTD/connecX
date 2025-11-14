import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function KonnectXKitss() {


  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-xl font-semibold text-blue-600">KonnectX</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Heart size={20} />
              <span className="text-sm">KYC</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart size={20} />
              <span className="text-sm">Kits (0)</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <User size={20} />
              <span className="text-sm">Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Kits</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Donate
            </button>
               <button
          onClick={() => navigate("/dashboard/independentOperator")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Kit
        </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size={20} />
            <input
              type="text"
              placeholder="Search Kits"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'all'
                ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Kits
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'active'
                ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('disabled')}
            className={`px-4 py-2 font-medium text-2xl transition-colors relative ${
              activeTab === 'disabled'
                ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Disabled
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border-2 border-gray-900 overflow-hidden">
           <table className="w-full border-separate border-spacing-y-4">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-3 text-left text-lg font-bold text-gray-900 uppercase tracking-wider">
          Kit Name
        </th>
        <th className="px-6 py-3 text-left text-lg font-bold text-gray-900 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-lg font-bold text-gray-900 uppercase tracking-wider">
          Activation Date
        </th>
        <th className="px-6 py-3 text-left text-lg font-bold text-gray-900 uppercase tracking-wider">
          Location
        </th>
        <th className="px-6 py-3 text-left text-lg font-bold text-gray-900 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredKits.map((kit) => (
        <tr
          key={kit.id}
          className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg"
        >
          <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-900">
            {kit.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-3 py-1 rounded-full text-xl font-semibold ${kit.statusColor}`}>
              {kit.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-xl font-semibold text-gray-700">
            {kit.activationDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-xl font-semibold text-gray-700">
            {kit.location}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            <button className="text-blue-700 font-bold hover:underline">
              View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
          
          {filteredKits.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No kits found matching your search criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}