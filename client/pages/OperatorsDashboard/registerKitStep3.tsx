import React, { useState } from 'react';
import { User, Heart, ShoppingCart } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function HotspotRegistrationStep3() {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const { theme } = useApp(); // Get theme from context
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard/independentOperator");   
  };

  return (
    <>
      <Helmet>
        <title>Hotspot Registration Step 3 | KonnectX</title>
        <meta
          name="description"
          content="Complete the final step of your KonnectX hotspot registration. Confirm your hotspot setup and activate your device on the decentralized network."
        />
        <meta
          name="keywords"
          content="KonnectX, hotspot registration, KXT token, step 3, device activation, decentralized network"
        />
        <meta property="og:title" content="Hotspot Registration Step 3 - KonnectX" />
        <meta
          property="og:description"
          content="Complete the final step of your KonnectX hotspot registration. Confirm your hotspot setup and activate your device on the decentralized network."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>

    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
            Register Your Hotspot Kit
          </h1>
          <p className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Follow these steps to register your custom hotspot hardware and start providing internet services.
          </p>
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
            Step 3 of 3 • Payment & Review
          </h2>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-black'}`} style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Payment Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
              Payment
            </h2>
            <p className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              One-time activation fee: $20
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`px-8 py-3 rounded-lg font-bold text-base transition border-2 ${
                  paymentMethod === 'stripe'
                    ? ' bg-black dark:bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-[#333436] text-gray-300 border-gray-700 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Stripe
              </button>
              <button
                onClick={() => setPaymentMethod('flutterwave')}
                className={`px-8 py-3 rounded-lg font-bold text-base transition border-2 ${
                  paymentMethod === 'flutterwave'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-[#333436] text-gray-300 border-gray-700 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Flutterwave
              </button>
              <button
                onClick={() => setPaymentMethod('ton')}
                className={`px-8 py-3 rounded-lg font-bold text-base transition border-2 ${
                  paymentMethod === 'ton'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-[#333436] text-gray-300 border-gray-700 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Ton
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}>
              Review
            </h2>
            
            <div className="space-y-8">
              {/* Device Brand Field */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Device Brand
                </label>
                <input
                  type="text"
                  placeholder="Enter device brand"
                  className={`w-full px-4 py-3 border-b-2 rounded-none focus:outline-none font-medium text-base ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500 focus:border-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>

              {/* Device Model Field */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Device Model
                </label>
                <input
                  type="text"
                  placeholder="Enter device model"
                  className={`w-full px-4 py-3 border-b-2 rounded-none focus:outline-none font-medium text-base ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500 focus:border-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>

              {/* Mac Address Field */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Mac Address
                </label>
                <input
                  type="text"
                  placeholder="Enter MAC address"
                  className={`w-full px-4 py-3 border-b-2 rounded-none focus:outline-none font-medium text-base ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500 focus:border-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>

              {/* Serial Number Field */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Serial Number
                </label>
                <input
                  type="text"
                  placeholder="Enter serial number"
                  className={`w-full px-4 py-3 border-b-2 rounded-none focus:outline-none font-medium text-base ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500 focus:border-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>

              {/* KYC Status Field */}
              <div>
                <label className={`block text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  KYC Status
                </label>
                <input
                  type="text"
                  placeholder="Enter KYC status"
                  className={`w-full px-4 py-3 border-b-2 rounded-none focus:outline-none font-medium text-base ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500 focus:border-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-10 py-4 bg-black dark:bg-blue-600 text-white font-bold text-base rounded-lg transition shadow-lg"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
     </>    
  );
}