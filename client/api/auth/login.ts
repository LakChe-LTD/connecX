// client/src/api/auth/login.ts
import { apiClient } from '../client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  requires2FA?: boolean;
  tempToken?: string;
  data?: {
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
      createdAt: string;
      updatedAt: string;
    };
    token: string;
    refreshToken: string;
    sessionId: string;
  };
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    // Store tokens if login successful
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('sessionId', response.data.data.sessionId);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

