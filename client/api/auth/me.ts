import apiClient from "../client";

// client/src/api/auth/me.ts
export interface MeResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      username: string;
      email: string;
      role: string;
      isVerified: boolean;
      twoFactorEnabled: boolean;
      profile?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
      };
      referralCode?: string;
      lastLogin?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export const getMe = async (): Promise<MeResponse> => {
  try {
    const response = await apiClient.get<MeResponse>('/auth/me');
    
    // Update stored user data
    if (response.data.success && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: 'Failed to fetch user data' };
  }
};

