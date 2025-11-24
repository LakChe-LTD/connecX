// client/src/pages/Settings.tsx
import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import ChangePassword from '@/components/ChangePassword';
import { settingsService } from '@/api/services/settingsService';
import type { 
  UserProfile, 
  NotificationPreferences, 
  ConnectedDevice 
} from '@/api/services/settingsService';

export default function AccountSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Loading and message states
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data states
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);

  // Fetch all settings data
  useEffect(() => {
    fetchAllSettings();
  }, []);

  const fetchAllSettings = async () => {
    try {
      setLoading(true);
      
      const [profileData, notifData, twoFaData, devicesData] = await Promise.all([
        settingsService.getProfile(),
        settingsService.getNotificationPreferences(),
        settingsService.getTwoFactorStatus(),
        settingsService.getDevices(),
      ]);

      setProfile(profileData);
      setProfileForm({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone || '',
      });
      setEmailNotifications(notifData.emailNotifications);
      setPushNotifications(notifData.pushNotifications);
      setTwoFactorAuth(twoFaData.enabled);
      setDevices(devicesData);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      showMessage('error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      await settingsService.updateProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phone: profileForm.phone,
      });
      
      showMessage('success', 'Profile updated successfully!');
      
      // Refresh profile data
      const updatedProfile = await settingsService.getProfile();
      setProfile(updatedProfile);
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size must be less than 5MB');
      return;
    }

    setAvatarUploading(true);

    try {
      const response = await settingsService.uploadAvatar(file);
      showMessage('success', 'Profile picture updated successfully!');
      
      if (profile) {
        setProfile({ ...profile, profileImage: response.data.avatarUrl });
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setAvatarUploading(false);
    }
  };

  // Handle notification toggle
  const handleEmailNotificationToggle = async () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);

    try {
      await settingsService.updateNotificationPreferences({ emailNotifications: newValue });
      showMessage('success', 'Notification preferences updated');
    } catch (error: any) {
      setEmailNotifications(!newValue);
      showMessage('error', 'Failed to update notification preferences');
    }
  };

  const handlePushNotificationToggle = async () => {
    const newValue = !pushNotifications;
    setPushNotifications(newValue);

    try {
      await settingsService.updateNotificationPreferences({ pushNotifications: newValue });
      showMessage('success', 'Notification preferences updated');
    } catch (error: any) {
      setPushNotifications(!newValue);
      showMessage('error', 'Failed to update notification preferences');
    }
  };

  // Handle 2FA toggle
  const handle2FAToggle = async () => {
    if (twoFactorAuth) {
      const code = prompt('Enter your 2FA code to disable:');
      if (!code) return;

      try {
        await settingsService.disableTwoFactor(code);
        setTwoFactorAuth(false);
        showMessage('success', 'Two-factor authentication disabled');
      } catch (error: any) {
        showMessage('error', 'Failed to disable 2FA. Invalid code.');
      }
    } else {
      try {
        const { qrCode, secret } = await settingsService.enableTwoFactor();
        alert(`Scan this QR code with your authenticator app. Secret: ${secret}`);
        setTwoFactorAuth(true);
        showMessage('success', 'Two-factor authentication enabled');
      } catch (error: any) {
        showMessage('error', 'Failed to enable 2FA');
      }
    }
  };

  // Handle device removal
  const handleRemoveDevice = async (deviceId: string) => {
    if (!confirm('Are you sure you want to remove this device?')) return;

    try {
      await settingsService.removeDevice(deviceId);
      setDevices(devices.filter(d => d._id !== deviceId));
      showMessage('success', 'Device removed successfully');
    } catch (error: any) {
      showMessage('error', 'Failed to remove device');
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-5">
        {/* Global Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={profile?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700"
                  />
                  <button 
                    onClick={handleAvatarClick}
                    disabled={avatarUploading}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 dark:bg-blue-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {avatarUploading ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-gray-300 capitalize">
                    {profile?.role || 'User'}
                  </p>
                </div>
              </div>
                  
              {/* Form Fields - Profile Info Only */}
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter your full Name"
                      value={`${profileForm.firstName} ${profileForm.lastName}`}
                      onChange={(e) => {
                        const names = e.target.value.split(' ');
                        setProfileForm({
                          ...profileForm,
                          firstName: names[0] || '',
                          lastName: names.slice(1).join(' ') || ''
                        });
                      }}
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
                      value={profileForm.email || profileForm.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.includes('@')) {
                          setProfileForm({ ...profileForm, email: value });
                        } else {
                          setProfileForm({ ...profileForm, phone: value });
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Save Profile Button */}
                <div className="mt-6">
                  <button 
                    type="submit"
                    disabled={profileLoading}
                    className="w-full px-6 py-3 bg-gray-900 text-white dark:bg-blue-700 text-sm rounded-md hover:bg-gray-800 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {profileLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </button>
                </div>
              </form>
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
                    onClick={handleEmailNotificationToggle}
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
                    onClick={handlePushNotificationToggle}
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
                  onClick={handle2FAToggle}
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
              {devices.length === 0 ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                  No connected devices
                </p>
              ) : (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div key={device._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1b1e] rounded-md">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {device.deviceType.toLowerCase().includes('mobile') || device.deviceType.toLowerCase().includes('phone') ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          )}
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {device.deviceName}
                            {device.isCurrent && (
                              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                                Current
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last active: {formatLastActive(device.lastActive)}
                          </p>
                        </div>
                      </div>
                      {!device.isCurrent && (
                        <button 
                          onClick={() => handleRemoveDevice(device._id)}
                          className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}