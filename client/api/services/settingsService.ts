// client/src/api/services/settingsService.ts
import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

// Types
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  role: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications?: boolean;
}

export interface TwoFactorStatus {
  enabled: boolean;
  qrCode?: string;
  secret?: string;
}

export interface ConnectedDevice {
  _id: string;
  deviceName: string;
  deviceType: string;
  browser?: string;
  os?: string;
  lastActive: string;
  ipAddress?: string;
  isCurrent?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Settings Service
export const settingsService = {
  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get<{ success: boolean; data: UserProfile }>(
      ENDPOINTS.USER.PROFILE
    );
    return response.data.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<UserProfile>) => {
    const response = await apiClient.put(ENDPOINTS.USER.UPDATE_PROFILE, data);
    return response.data;
  },

  // Upload profile avatar
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await apiClient.post(ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData) => {
    const response = await apiClient.post(ENDPOINTS.USER.PASSWORD, data);
    return response.data;
  },

  // Get notification preferences
  getNotificationPreferences: async () => {
    const response = await apiClient.get<{ 
      success: boolean; 
      data: NotificationPreferences 
    }>(ENDPOINTS.USER.NOTIFICATIONS);
    return response.data.data;
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences: Partial<NotificationPreferences>) => {
    const response = await apiClient.put(
      ENDPOINTS.USER.UPDATE_NOTIFICATIONS, 
      preferences
    );
    return response.data;
  },

  // Get 2FA status
  getTwoFactorStatus: async () => {
    const response = await apiClient.get<{ 
      success: boolean; 
      data: TwoFactorStatus 
    }>(ENDPOINTS.USER.TWO_FA.STATUS);
    return response.data.data;
  },

  // Enable 2FA
  enableTwoFactor: async () => {
    const response = await apiClient.post<{ 
      success: boolean; 
      data: { qrCode: string; secret: string } 
    }>(ENDPOINTS.USER.TWO_FA.ENABLE);
    return response.data.data;
  },

  // Disable 2FA
  disableTwoFactor: async (code: string) => {
    const response = await apiClient.post(ENDPOINTS.USER.TWO_FA.DISABLE, { code });
    return response.data;
  },

  // Verify 2FA code
  verifyTwoFactor: async (code: string) => {
    const response = await apiClient.post(ENDPOINTS.USER.TWO_FA.VERIFY, { code });
    return response.data;
  },

  // Get connected devices/sessions
  getDevices: async () => {
    const response = await apiClient.get<{ 
      success: boolean; 
      data: ConnectedDevice[] 
    }>(ENDPOINTS.USER.DEVICES);
    return response.data.data;
  },

  // Remove device/session
  removeDevice: async (deviceId: string) => {
    const response = await apiClient.delete(ENDPOINTS.USER.REMOVE_DEVICE(deviceId));
    return response.data;
  },
};

export default settingsService;