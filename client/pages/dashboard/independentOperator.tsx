import React, { useState } from 'react';
import { Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function IndependentOperators() {

       const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" p-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Independent Operators</h1>

            <p className="text-gray-500 mt-3">Manage your hotspots and access codes</p>
          </div>

          {/* Add New Hotspot Form */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Hotspot</h2>
            
            <div className="space-y-4">
              {/* Hotspot Name */}
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Hotspot Name
                </label>
                <input
                  type="text"
                  name="hotspotName"
                  value={formData.hotspotName}
                  onChange={handleChange}
                  placeholder="Enter hotspot name"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter hotspot location"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Price per Hour
                  </label>
                  <input
                    type="text"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Existing Hotspots</h2>
            
            <div className="border-2 border-gray-900 rounded-lg overflow-hidden">
              <table className="w-full border-collapse  border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xl font-bold text-gray-700">
                      Hotspot Name
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-bold text-gray-700">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-bold text-gray-700">
                      Price per Hour
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-bold text-gray-700">
                      Price per Day
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hotspots.map((hotspot) => (
                    <tr key={hotspot.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-xl text-gray-900">
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






