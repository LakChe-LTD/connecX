import React, { useState } from 'react';
import { User, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function HotspotRegistration() {
  const [formData, setFormData] = useState({
    deviceBrand: '',
    deviceModel: '',
    macAddress: '',
    serialNumber: ''
  });

   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigate("/dashboard/registerKitStep2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header - Full Screen Width */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2 ml-4">
                <img
                  src="/icons/KonnectX logo final.png" 
                  alt="KonnectX Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <Heart className="w-5 h-5" />
                <span>Kyc</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <ShoppingCart className="w-5 h-5" />
                <span>Kits</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Register Your Hotspot Kit</h1>
          <p className="text-lg text-gray-500 mt-2">Step 1 of 3 • Kit Details</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Step 1</span>
            <span className="text-sm font-medium text-gray-400">Step 2</span>
            <span className="text-sm font-medium text-gray-400">Step 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33.33%' }}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className=" rounded-lg shadow-sm p-12">
          <div className="space-y-8">
            {/* Device Brand */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                Device Brand
              </label>
              <input
                type="text"
                name="deviceBrand"
                value={formData.deviceBrand}
                onChange={handleChange}
                placeholder="Enter device brand"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-base"
              />
            </div>

            {/* Device Model */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                Device Model
              </label>
              <input
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                placeholder="Enter device model"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-base"
              />
            </div>

            {/* MAC Address */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                MAC Address
              </label>
              <input
                type="text"
                name="macAddress"
                value={formData.macAddress}
                onChange={handleChange}
                placeholder="Enter MAC address"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-base"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-base"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-4">
              <button
                onClick={handleSubmit}
                className="px-10 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-base"
              >
                Next: Kit Activation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}