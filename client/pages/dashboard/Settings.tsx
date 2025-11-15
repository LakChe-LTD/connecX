import React, { useState } from 'react';
import { User, Mail } from 'lucide-react';
import ChangePassword from '@/components/ChangePassword';

export default function AccountSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Main Content */}
      <div className="max-w-20xl mx-auto px-5 py-5">  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 dark:bg-blue-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">John Smith</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-300">System Admin</p>
                </div>
              </div>
                  
              {/* Form Fields - Profile Info Only */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter your full Name"
                      defaultValue="John Smith"
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Email or Phone</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter your Email or Phone"
                      defaultValue="john.smith@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Save Profile Button */}
              <div className="mt-6">
                <button className="w-full px-6 py-3 bg-gray-900 text-white dark:bg-blue-700 text-sm rounded-md hover:bg-gray-800 dark:hover:bg-blue-600 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Change Password Section - Now using component */}
            <ChangePassword />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Notification Settings</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-6">Manage how you receive notifications.</p>

              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-0.5">Email Notifications</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Receive notifications via email</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      emailNotifications ? 'bg-gray-800 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-0.5">Push Notifications</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Receive push notifications on your devices</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      pushNotifications ? 'bg-gray-800 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        pushNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Security Settings</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-6">Manage your account security settings.</p>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-0.5">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    twoFactorAuth ? 'bg-gray-800 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Connected Devices */}
            <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Connected Devices</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1b1e] rounded-md">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">MacBook Pro</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 2 minutes ago</p>
                    </div>
                  </div>
                  <button className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1b1e] rounded-md">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">iPhone 13</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 3 minutes ago</p>
                    </div>
                  </div>
                  <button className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}