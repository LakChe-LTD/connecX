import React, { useState } from 'react';
import { User, Shield, Bell, Smartphone, CheckCircle } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";

export default function ProfileSettings() {
  const [fullName, setFullName] = useState('Chizurummarvelous14');
  const [email, setEmail] = useState('chizurummarvelous14@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [subscriptionRenewal, setSubscriptionRenewal] = useState(true);
  const [lowDataAlerts, setLowDataAlerts] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(true);
  const [connectionEvents, setConnectionEvents] = useState(false);
   const { theme } = useApp();
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'iPhone 14 Pro',
      mac: 'MAC: A4:83:E7:2B:4C:1D',
      lastUsed: 'Last used: 12/11/2025'
    },
    {
      id: 2,
      name: 'MacBook Air',
      mac: 'MAC: 8B:27:EB:5F:A2:3E',
      lastUsed: 'Last used: 11/11/2025'
    }
  ]);

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Notifications', icon: Bell },
    { name: 'Devices', icon: Smartphone }
  ];

  const handleSaveChanges = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleUpdatePassword = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSavePreferences = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRevokeAccess = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddDevice = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Theme Toggle Button - Top Right */}
      <div className="fixed top-4 right-4 z-50">
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-8">
        <div className="max-w-15xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Account Settings
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your profile and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className={`flex gap-6 mb-8 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors ${
                    activeTab === tab.name
                      ? theme === 'dark'
                        ? 'border-blue-500 text-white'
                        : 'border-black text-gray-900'
                      : theme === 'dark'
                        ? 'border-transparent text-gray-400 hover:text-gray-200'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className={`rounded-lg border p-8 ${
              theme === 'dark' 
                ? 'bg-[#333436] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Personal Information
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Update your account details
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-black border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-black border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Email verified</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-black border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-2.5 dark:bg-blue-600 bg-black text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className={`rounded-lg border p-8 ${
                theme === 'dark' 
                  ? 'bg-[#333436] border-gray-800' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="mb-6">
                  <h2 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Change Password
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Update your password regularly for security
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark'
                          ? 'bg-black border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } border`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark'
                          ? 'bg-black border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } border`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark'
                          ? 'bg-black border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } border`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleUpdatePassword}
                      className="px-6 py-2.5 dark:bg-blue-600 bg-black text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg border p-8 ${
                theme === 'dark' 
                  ? 'bg-[#333436] border-gray-800' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="mb-6">
                  <h2 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Two-Factor Authentication
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add an extra layer of security to your account
                  </p>
                </div>

                <div className="space-y-6">
                  <div className={`rounded-lg p-4 ${
                    theme === 'dark'
                      ? 'bg-blue-900/20 border border-blue-800'
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {twoFactorEnabled 
                        ? 'Two-factor authentication is enabled for better security.' 
                        : 'Two-factor authentication is not enabled. Enable it for better security.'}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleEnable2FA}
                      disabled={twoFactorEnabled}
                      className={`px-6 py-2.5 font-medium rounded-lg transition-colors flex items-center gap-2 ${
                        twoFactorEnabled
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'dark:bg-blue-600 bg-black text-white'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      {twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'Notifications' && (
            <div className={`rounded-lg border p-8 ${
              theme === 'dark' 
                ? 'bg-[#333436] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Notification Preferences
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose what updates you want to receive
                </p>
              </div>

              <div className="space-y-6">
                <div className={`flex items-start justify-between py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Subscription Renewal
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Get notified before your plan renews
                    </p>
                  </div>
                  <button
                    onClick={() => setSubscriptionRenewal(!subscriptionRenewal)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      subscriptionRenewal ? 'dark:bg-blue-600 bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        subscriptionRenewal ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className={`flex items-start justify-between py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Low Data Alerts
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Notify when you've used 80% of your data
                    </p>
                  </div>
                  <button
                    onClick={() => setLowDataAlerts(!lowDataAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      lowDataAlerts ? 'dark:bg-blue-600 bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        lowDataAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className={`flex items-start justify-between py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Payment Updates
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive payment confirmations and receipts
                    </p>
                  </div>
                  <button
                    onClick={() => setPaymentUpdates(!paymentUpdates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      paymentUpdates ? 'dark:bg-blue-600 bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        paymentUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-start justify-between py-4">
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Connection Events
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Notify when devices connect to hotspots
                    </p>
                  </div>
                  <button
                    onClick={() => setConnectionEvents(!connectionEvents)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      connectionEvents ? 'dark:bg-blue-600 bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        connectionEvents ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 dark:bg-blue-600 bg-black text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Devices Tab */}
          {activeTab === 'Devices' && (
            <div className={`rounded-lg border p-8 ${
              theme === 'dark' 
                ? 'bg-[#333436] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Linked Devices
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage devices authorized to connect
                </p>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <div 
                    key={device.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600 bg-black'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-5 h-5 border-2 rounded ${
                        theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                      }`}></div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-base font-semibold mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {device.name}
                      </h3>
                      <p className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {device.mac}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {device.lastUsed}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRevokeAccess(device.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-300 border-gray-600 hover:bg-gray-800'
                          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Revoke Access
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleAddDevice}
                  className={`w-full py-3 text-sm font-medium rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 border-gray-600 hover:bg-gray-800'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Add New Device
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm text-green-100">Your changes have been saved</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}