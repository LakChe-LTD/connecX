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
    console.log("Making login request...");
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    console.log("Login response:", response.data);
    
    // ✅ FIXED: Backend returns token at top level
    if (response.data.success && !response.data.requires2FA) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('sessionId', response.data.sessionId);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    console.error("Error response:", error.response?.data);
    
    const errorData = error.response?.data || { success: false, message: 'Login failed' };
    const errorMessage = errorData.error || errorData.message || 'Login failed';
    
    throw new Error(errorMessage);
  }
};