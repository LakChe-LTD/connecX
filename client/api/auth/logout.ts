// client/src/api/auth/logout.ts
import apiClient from "../client";

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    // Make the logout request to your backend
    const response = await apiClient.post<LogoutResponse>('/auth/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important for cookie-based authentication
    });
    
    // Clear local storage after successful logout
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    
    return response.data;
  } catch (error: any) {
    // Clear local storage even if request fails (force logout)
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    
    // Handle error response
    if (error.response?.data) {
      throw error.response.data;
    }
    
    throw { 
      success: false, 
      message: error.message || 'Logout failed. Please try again.' 
    };
  }
};