// client/src/api/auth.ts

import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

// ========== EXISTING FUNCTIONS ==========

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    firstName: string;
    email: string;
    role: string;
  };
  token?: string;
  requires2FA?: boolean;
  tempToken?: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, data);
    
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;
      
      // Store token and user
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      return {
        success: true,
        user: user,
        token: token,
      };
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  referralCode?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: string;
  token?: string;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, data);
    
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        userId: response.data.data?.userId,
        token: response.data.data?.token,
      };
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// ========== PASSWORD MANAGEMENT FUNCTIONS ==========

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

/**
 * Request a password reset link
 * Endpoint: POST /api/auth/forgot-password
 */
export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return {
      success: response.data.success,
      message: response.data.message || "Password reset link sent to your email",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      "Failed to send reset link. Please try again."
    );
  }
};

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

/**
 * Reset password using token from email
 * Endpoint: POST /api/auth/reset-password
 */
export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return {
      success: response.data.success,
      message: response.data.message || "Password reset successful",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      "Failed to reset password. Your link may have expired."
    );
  }
};

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
}

/**
 * Change password for logged-in user
 * Endpoint: PUT /api/user/password
 * Requires: Authorization header with valid token
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiClient.put(ENDPOINTS.USER.PASSWORD, data);
    return {
      success: response.data.success,
      message: response.data.message || "Password changed successfully",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      "Failed to change password. Please check your current password."
    );
  }
};

// ========== LOGOUT ==========

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("sessionId");
};

// ========== SOCIAL AUTH (Optional) ==========

export interface SocialAuthRequest {
  token: string;
  provider: "google" | "facebook";
}

export const socialAuth = async (
  data: SocialAuthRequest
): Promise<LoginResponse> => {
  try {
    const endpoint = data.provider === "google" 
      ? "/auth/social/google" 
      : "/auth/social/facebook";
      
    const response = await apiClient.post(endpoint, {
      token: data.token,
    });
    
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;
      
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      return {
        success: true,
        user: user,
        token: token,
      };
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Social login failed");
  }
};