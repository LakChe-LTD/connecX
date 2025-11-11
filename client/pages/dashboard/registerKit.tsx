import React, { useState } from 'react';
import { Wifi } from 'lucide-react';

export default function HotspotRegistration() {
  const [formData, setFormData] = useState({
    deviceBrand: '',
    deviceModel: '',
    macAddress: '',
    serialNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">KonnectX</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <span>❤️</span>
                <span>IOT</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <span>📦</span>
                <span>Kits: 0</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <span>👤</span>
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Register Your Hotspot Kit
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Please provide the hotspot information to complete the kit setup
          </p>

          <div className="space-y-5">
            {/* Help Link */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Help</span>
              <span className="text-blue-500">| Kit ID & Details</span>
            </div>

            {/* Device Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Brand
              </label>
              <input
                type="text"
                name="deviceBrand"
                value={formData.deviceBrand}
                onChange={handleChange}
                placeholder="Enter device brand"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Device Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Model
              </label>
              <input
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                placeholder="Enter device model"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* MAC Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address
              </label>
              <input
                type="text"
                name="macAddress"
                value={formData.macAddress}
                onChange={handleChange}
                placeholder="Enter MAC address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next: Kit activation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}