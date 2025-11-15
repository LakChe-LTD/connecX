import React, { useState } from 'react';
import { MapPin, Users, Activity, Package } from 'lucide-react';
import { useNavigate } from "react-router-dom";




const ManageKits = () => {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    kitType: '',
    oneTimeUse: '',
    quantity: '',
    deploymentLocation: '',
    networkCoverageRadius: ''
  });


  const stats = [
    { icon: Users, label: 'Total Users', value: '2,847', change: '+12.5%', positive: true },
    { icon: Package, label: 'Active Kits', value: '1,243', change: '+8.2%', positive: true },
    { icon: Activity, label: 'Network Status', value: '98.5%', change: '+2.1%', positive: true },
    { icon: MapPin, label: 'Locations', value: '156', change: '+5', positive: true }
  ];

  const users = [
    { name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Active', location: 'New York, USA', time: '2 minutes ago', avatar: 'SJ' },
    { name: 'Michael Chen', email: 'michael.chen@tech.com', status: 'Pending', location: 'Singapore', time: '5 hours ago', avatar: 'MC' },
    { name: 'Emma Wilson', email: 'emma@enterprise.com', status: 'Inactive', location: 'London, UK', time: '1 day ago', avatar: 'EW' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // alert('Kit information saved successfully!');

    navigate("/dashboard/registerKit");   // ✅ ADD THIS
  };

  const handleCancel = () => {
    setFormData({
      kitType: '',
      oneTimeUse: '',
      quantity: '',
      deploymentLocation: '',
      networkCoverageRadius: ''
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              {stat.positive !== null && (
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manage Kits Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-6">
            <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 mb-6">
              <button className="pb-3 px-1 border-b-2 border-blue-600 dark:border-blue-500 font-medium text-blue-600 dark:text-blue-500">
                Manage Kits
              </button>
              <button className="pb-3 px-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                Coordinates
              </button>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Kit</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kit Type
                </label>
                <select
                  name="kitType"
                  value={formData.kitType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Kit Type</option>
                  <option value="basic">Basic Kit</option>
                  <option value="advanced">Advanced Kit</option>
                  <option value="premium">Premium Kit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  One Time Use
                </label>
                <input
                  type="text"
                  name="oneTimeUse"
                  value={formData.oneTimeUse}
                  onChange={handleInputChange}
                  placeholder="Enter Amount"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deployment Location
                </label>
                <input
                  type="text"
                  name="deploymentLocation"
                  value={formData.deploymentLocation}
                  onChange={handleInputChange}
                  placeholder="Enter Deployment Location To Pin On Map"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Map */}
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full bg-blue-50 dark:bg-gray-800">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 text-blue-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="font-medium text-gray-600 dark:text-gray-300">San Francisco</p>
                    <p className="text-sm text-gray-500">Map View</p>
                  </div>
                </div>

                {/* Pins */}
                <div className="absolute top-4 left-4 right-4 flex gap-2">
                  <div className="bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-700 dark:text-gray-200">Golden Gate</span>
                  </div>
                  <div className="bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-200">Downtown</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Network Coverage Radius
                </label>
                <input
                  type="text"
                  name="networkCoverageRadius"
                  value={formData.networkCoverageRadius}
                  onChange={handleInputChange}
                  placeholder="Enter Radius"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Users</h3>
            <div className="space-y-4">
              {users.map((user, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0 border-gray-200 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs truncate text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">{user.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium rounded-lg text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
              View All Users
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageKits;