import React, { useState } from 'react';
import { User, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";


export default function HotspotRegistration() {
  const { theme } = useApp();
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'}`}>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        <div className="mb-8">
          <h1 className={`text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Register Your Hotspot Kit</h1>
          <p className={`text-xl mt-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Step 1 of 3 • Kit Details</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-black dark:text-blue-600">Step 1</span>
            <span className={`text-base font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Step 2</span>
            <span className={`text-base font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Step 3</span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div className="bg-black dark:bg-blue-600 h-2.5 rounded-full" style={{ width: '33.33%' }}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className={`rounded-lg shadow-sm p-12 ${theme === 'dark' ? 'bg-black' : ''}`}>
          <div className="space-y-8">
            {/* Device Brand */}
            <div>
              <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Device Brand
              </label>
              <input
                type="text"
                name="deviceBrand"
                value={formData.deviceBrand}
                onChange={handleChange}
                placeholder="Enter device brand"
                className={`w-full px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                  theme === 'dark' 
                    ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Device Model */}
            <div>
              <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Device Model
              </label>
              <input
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                placeholder="Enter device model"
                className={`w-full px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                  theme === 'dark' 
                    ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* MAC Address */}
            <div>
              <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                MAC Address
              </label>
              <input
                type="text"
                name="macAddress"
                value={formData.macAddress}
                onChange={handleChange}
                placeholder="Enter MAC address"
                className={`w-full px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                  theme === 'dark' 
                    ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
                className={`w-full px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                  theme === 'dark' 
                    ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-6">
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-black dark:bg-blue-600 text-white font-bold rounded-lg   text-lg shadow-md hover:shadow-lg"
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