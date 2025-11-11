import apiClient from "../client";

// client/src/api/auth/logout.ts
export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await apiClient.post<LogoutResponse>('/auth/logout');
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    
    return response.data;
  } catch (error: any) {
    // Clear local storage even if request fails
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    
    throw error.response?.data || { success: false, message: 'Logout failed' };
  }
};
