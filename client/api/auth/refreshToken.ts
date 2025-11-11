import apiClient from "../client";

// client/src/api/auth/refreshToken.ts
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken: string;
  };
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    
    if (!currentRefreshToken) {
      throw { success: false, message: 'No refresh token found' };
    }
    
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token', {
      refreshToken: currentRefreshToken
    });
    
    // Update tokens
    if (response.data.success && response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    // Clear tokens if refresh fails
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    
    throw error.response?.data || { success: false, message: 'Token refresh failed' };
  }
};
