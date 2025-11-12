import React, { useState } from 'react';

export default function HotspotRegistrationStep3() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:text-gray-800">← Back</button>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📡</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">KonnectX</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register Your Hotspot Kit</h1>
           <p className="text-base text-gray-500 mt-2">Follow these steps to register your custom hotspot hardware and start providing internet services.</p>
          <h2 className=" text-gray-900 text-lg  font-bold mb-6 mt-2">Step 3 of 3 • Payment & Review</h2>
          {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-black h-3 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div> 

        {/* Form Content */}
        <div className=" p-15">
          {/* Payment Section */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment</h2>
            <p className="text-sm text-gray-600 mb-6">One-time activation fee: $20</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`px-6 py-2 rounded-md font-medium transition border-2 ${
                  paymentMethod === 'Stripe'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-900'
                }`}
              >
                Stripe
              </button>
              <button
                onClick={() => setPaymentMethod('flutterwave')}
                className={`px-6 py-2 rounded-md font-medium transition border-2 ${
                  paymentMethod === 'flutterwave'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700  border-black  '
                }`}
              >
                Flutterwave
              </button>
              <button
                onClick={() => setPaymentMethod('yay')}
                className={`px-6 py-2 rounded-md font-medium transition border-2 ${
                  paymentMethod === 'Ton'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-900'
                }`}
              >
                Ton
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-9">Review</h2>
            
            <div className="space-y-6">
              {/* Hardware Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Brand
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border-b border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Maker Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Model
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border-b border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Mac Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mac Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border-b border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* IMEI/SWID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2  border-b border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Verified Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KYC Status
                </label>
                <input
                  type="text"
                 className="w-full px-4 py-2  border-b border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}