import React, { useState } from 'react';
import { Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';

export default function IndependentOperators() {
  const [formData, setFormData] = useState({
    hotspotName: '',
    location: '',
    pricePerHour: '',
    pricePerDay: ''
  });

  const [hotspots] = useState([
    {
      id: 1,
      name: 'Caffe Central',
      location: '123 Main Street, Anytown',
      pricePerHour: '$6',
      pricePerDay: '$20'
    },
    {
      id: 2,
      name: 'Library Hub',
      location: '456 Oak Avenue, Anytown',
      pricePerHour: '$3',
      pricePerDay: '$15'
    },
    {
      id: 3,
      name: 'Park Pavilion',
      location: '789 Park Lane, Anytown',
      pricePerHour: '$2',
      pricePerDay: '$10'
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddHotspot = () => {
    if (formData.hotspotName && formData.location && formData.pricePerHour && formData.pricePerDay) {
      alert('Hotspot added successfully!');
      setFormData({
        hotspotName: '',
        location: '',
        pricePerHour: '',
        pricePerDay: ''
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="font-medium">Back</span>
              </button>
              
              <div className="flex items-center space-x-2 ml-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                  <div className="absolute w-6 h-6 border-2 border-blue-600 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">KonnectX</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search Kits..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <Heart className="w-5 h-5 mr-1" />
                <span className="text-sm">KYG</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <ShoppingCart className="w-5 h-5 mr-1" />
                <span className="text-sm">Kits (0)</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <User className="w-5 h-5 mr-1" />
                <span className="text-sm">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Independent Operators</h1>
            <p className="text-gray-500 mt-1">Manage your hotspots and access codes</p>
          </div>

          {/* Add New Hotspot Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Hotspot</h2>
            
            <div className="space-y-4">
              {/* Hotspot Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotspot Name
                </label>
                <input
                  type="text"
                  name="hotspotName"
                  value={formData.hotspotName}
                  onChange={handleChange}
                  placeholder="Enter hotspot name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter hotspot location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour
                  </label>
                  <input
                    type="text"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day
                  </label>
                  <input
                    type="text"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddHotspot}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Hotspot
              </button>
            </div>
          </div>

          {/* Existing Hotspots Table */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Hotspots</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Hotspot Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price per Hour
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price per Day
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hotspots.map((hotspot) => (
                    <tr key={hotspot.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {hotspot.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {hotspot.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {hotspot.pricePerHour}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {hotspot.pricePerDay}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}