import React, { useState } from 'react';
import { Wifi } from 'lucide-react';
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
    // alert('Kit information saved successfully!');

    navigate("/dashboard/registerKitStep2");   // ✅ ADD THIS
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-left justify-left p-8">
      <div className="w-full max-w-6xl  overflow-hidden items-center justify-center">
         {/* Header - Full Width */}
      <div className="bg-white border-b-2 border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900 transition">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900">KonnectX</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-base">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <span>❤️</span>
                <span>IOT</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <span>📦</span>
                <span>Kits: 0</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                <span>👤</span>
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>


        {/* Form Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Register Your Hotspot Kit
          </h1>
         <p className="text-base text-gray-500 mt-2">Follow these steps to register your custom hotspot hardware and start providing internet services.</p>
          <h2 className="text-gray-900 text-lg  font-bold mb-6 mt-2">Step 1 of 3 • Kit Details </h2>
          {/* Progress Bar */}
          <div className="flex-1 h-3 bg-black rounded-full">
            <div className="bg-black h-3 rounded-full" style={{ width: '100%' }}></div>
          </div>

          <div className="space-y-6">
           
            <div className="flex items-center gap-2 text-base">
              
            </div>

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
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="px-8 py-3.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base"
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