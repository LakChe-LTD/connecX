// client/src/api/auth/register.ts
import apiClient from "../client";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
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

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    console.log("API register function received:", userData);
    console.log("Making POST request to /auth/register");
    
    const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
    
    console.log("API response:", response.data);
    
    // Store tokens if registration successful
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('sessionId', response.data.data.sessionId);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error("API error:", error);
    console.error("Error response:", error.response?.data);
    
    // Extract the error message from the response
    const errorData = error.response?.data || { success: false, message: 'Registration failed' };
    const errorMessage = errorData.error || errorData.message || 'Registration failed';
    
    throw new Error(errorMessage);
  }
};