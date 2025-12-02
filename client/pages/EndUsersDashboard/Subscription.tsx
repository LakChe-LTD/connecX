import React, { useState } from 'react';
import { Wifi, Calendar, Database } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";



export default function SubscriptionsPage() {
  const { theme } = useApp();
  const [activeTab, setActiveTab] = useState('connection-history');

  return (
    <>
      <Helmet>
        <title>Subscriptions | KonnectX</title>
        <meta
          name="description"
          content="Manage your subscriptions within the KonnectX network. View active subscriptions, billing details, and upgrade or cancel your plans easily."
        />
        <meta
          name="keywords"
          content="KonnectX, subscriptions, billing, plans, KXT token, hotspot services, decentralized network"
        />
        <meta property="og:title" content="Subscriptions - KonnectX" />
        <meta
          property="og:description"
          content="Manage your subscriptions within the KonnectX network. View active subscriptions, billing details, and upgrade or cancel your plans easily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>

    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Subscriptions
        </h1>
        <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your active plans and subscription details
        </p>
      </div>

      {/* Active Subscription Card */}
      <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-8 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} mb-8`}>
        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Active Subscription
          </h2>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Your current plan details
          </p>
        </div>

        {/* Subscription Details */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Monthly Premium
              </h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Started 07/11/2025
              </p>
            </div>
            <span className="px-4 py-2 bg-black dark:bg-blue-600 text-white rounded-lg text-sm font-bold">
              Auto-renew On
            </span>
          </div>

          {/* Data Usage */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Data Usage
              </span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                3.2 GB / 10 GB
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="bg-black dark:bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>

          {/* Status and End Date */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Status
              </p>
              <span className="inline-block px-3 py-1 bg-black dark:bg-blue-600 text-white rounded text-sm font-bold">
                Active
              </span>
            </div>
            <div>
              <p className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                End Date
              </p>
              <p className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                01/12/2025
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-black dark:bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
            <button className={`px-6 py-2.5 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>
              Toggle Auto-Renew
            </button>
            <button className={`px-6 py-2.5 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white border border-gray-600 hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-50'}`}>
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('connection-history')}
            className={`pb-3 font-bold transition-colors relative ${
              activeTab === 'connection-history'
                ? theme === 'dark' 
                  ? 'text-white' 
                  : 'text-gray-900'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-700'
            }`}
          >
            Connection History
            {activeTab === 'connection-history' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-3 font-bold transition-colors relative ${
              activeTab === 'devices'
                ? theme === 'dark' 
                  ? 'text-white' 
                  : 'text-gray-900'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-700'
            }`}
          >
            Devices
            {activeTab === 'devices' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Connection History Section */}
      {activeTab === 'connection-history' && (
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-8 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connection History
            </h2>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              All your WiFi sessions
            </p>
          </div>

          <div className="space-y-4">
            <ConnectionItem
              name="Downtown Hub"
              duration="150 min"
              data="250 MB"
              date="12/11/2025"
              time="09:00:00"
              theme={theme}
            />
            <ConnectionItem
              name="City Plaza WiFi"
              duration="165 min"
              data="480 MB"
              date="11/11/2025"
              time="15:00:00"
              theme={theme}
            />
            <ConnectionItem
              name="Downtown Hub"
              duration="90 min"
              data="180 MB"
              date="10/11/2025"
              time="18:10:00"
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Devices Section */}
      {activeTab === 'devices' && (
        <div className={`${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'} rounded-xl p-8 shadow-sm border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connected Devices
            </h2>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your connected devices
            </p>
          </div>
          <p className={`text-center py-12 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No devices connected
          </p>
        </div>
      )}
    </div>
    </>
  );
}

function ConnectionItem({ name, duration, data, date, time, theme }) {
  return (
    
    <div className={`flex items-center justify-between p-5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-[#2a2b2d]  hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Wifi className="w-6 h-6 text-black dark:text-blue-600" />
        </div>
        <div>
          <h4 className={`font-bold text-base mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {duration}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {data}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-base mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {date}
        </p>
        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {time}
        </p>
      </div>
    </div>
  );
}