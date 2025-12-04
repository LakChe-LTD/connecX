import React, { useState } from 'react';
import { Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";




export default function IndependentOperators() {
    const navigate = useNavigate();
  const { theme } = useApp(); 
  
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
    navigate("/dashboard/HotspotAcess");   
  };

  return (

    <>
      <Helmet>
        <title>Independent Operators | KonnectX</title>
        <meta
          name="description"
          content="Manage and monitor independent operators on the KonnectX decentralized network. View their hotspots, activity, and contributions to the $KXT ecosystem."
        />
        <meta
          name="keywords"
          content="KonnectX, independent operators, decentralized network, hotspots, KXT token, operator management"
        />
        <meta property="og:title" content="Independent Operators - KonnectX" />
        <meta
          property="og:description"
          content="Manage and monitor independent operators on the KonnectX decentralized network. View their hotspots, activity, and contributions to the $KXT ecosystem."
        />
      </Helmet>

    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'}`}>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
              Independent Operators
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage your hotspots and access codes
            </p>
          </div>

          {/* Add New Hotspot Form */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
              Add New Hotspot
            </h2>
            
            <div className="space-y-6">
              {/* Hotspot Name */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Hotspot Name
                </label>
                <input
                  type="text"
                  name="hotspotName"
                  value={formData.hotspotName}
                  onChange={handleChange}
                  placeholder="Enter hotspot name"
                  className={`w-1/2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-2 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Location */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter hotspot location"
                  className={`w-1/2 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-2 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    Price per Hour
                  </label>
                  <input
                    type="text"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                      theme === 'dark'
                        ? 'bg-[#333436] border-2 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    Price per Day
                  </label>
                  <input
                    type="text"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                      theme === 'dark'
                        ? 'bg-[#333436] border-2 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddHotspot}
                className="px-8 py-3 bg-black dark:bg-blue-600 text-white font-bold text-base rounded-lg shadow-lg"
              >
                Add Hotspot
              </button>
            </div>
          </div>

          {/* Existing Hotspots Table */}
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
              Existing Hotspots
            </h2>
            
            <div className={`rounded-lg overflow-hidden border-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-900'
            }`}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`border-b-2 ${
                    theme === 'dark' 
                      ? 'bg-[#333436] border-gray-700' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <th className={`px-6 py-4 text-left text-base font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Hotspot Name
                    </th>
                    <th className={`px-6 py-4 text-left text-base font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Location
                    </th>
                    <th className={`px-6 py-4 text-left text-base font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Price per Hour
                    </th>
                    <th className={`px-6 py-4 text-left text-base font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Price per Day
                    </th>
                    <th className={`px-6 py-4 text-left text-base font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
                  {hotspots.map((hotspot) => (
                    <tr 
                      key={hotspot.id} 
                      className={`border-b transition-colors ${
                        theme === 'dark'
                          ? 'border-gray-800 hover:bg-gray-900'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <td className={`px-6 py-4 text-base font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {hotspot.name}
                      </td>
                      <td className={`px-6 py-4 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {hotspot.location}
                      </td>
                      <td className={`px-6 py-4 text-base font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {hotspot.pricePerHour}
                      </td>
                      <td className={`px-6 py-4 text-base font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {hotspot.pricePerDay}
                      </td>
                      <td className="px-6 py-4">
                        <button className={`font-bold text-sm transition-colors ${
                          theme === 'dark'
                            ? 'text-blue-400 hover:text-blue-300'
                            : 'text-blue-600 hover:text-blue-800'
                        }`}>
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
    </>
  );
}