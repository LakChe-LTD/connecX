// client/src/api/auth/index.ts - DEBUG VERSION
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

// ========== EMAIL VERIFICATION ==========

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerified: boolean;
  };
  redirectPath?: string;
  remainingAttempts?: number;
}

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  try {
    console.log("🔵 [verifyEmail] Request:", data);
    const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    console.log("🟢 [verifyEmail] Response:", response.data);
    
    // Store tokens if verification successful
    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error("🔴 [verifyEmail] Error:", error);
    console.error("🔴 [verifyEmail] Error Response:", error.response?.data);
    throw new Error(error.response?.data?.message || "Verification failed");
  }
};

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
  expiresIn?: string;
}

export const resendVerificationCode = async (
  data: ResendVerificationRequest
): Promise<ResendVerificationResponse> => {
  try {
    console.log("🔵 [resendVerification] Request:", data);
    const response = await apiClient.post(ENDPOINTS.AUTH.RESEND_VERIFICATION, data);
    console.log("🟢 [resendVerification] Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("🔴 [resendVerification] Error:", error);
    console.error("🔴 [resendVerification] Error Response:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to resend verification code");
  }
};

// ========== REGISTRATION ==========

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
  needsVerification?: boolean;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerified: boolean;
  };
  token?: string;
  refreshToken?: string;
  redirectPath?: string;
  expiresIn?: string;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    console.log("🔵 [register] Request:", data);
    console.log("🔵 [register] Endpoint:", ENDPOINTS.AUTH.REGISTER);
    
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, data);
    
    console.log("🟢 [register] Full Response:", response);
    console.log("🟢 [register] Response Data:", response.data);
    console.log("🟢 [register] Response Status:", response.status);
    
    // Only store tokens if user doesn't need verification (admin)
    if (response.data.success && response.data.token && !response.data.needsVerification) {
      console.log("✅ Storing tokens for admin user");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else if (response.data.needsVerification) {
      console.log("📧 User needs email verification");
    }
    
    return response.data;
  } catch (error: any) {
    console.error("🔴 [register] Error:", error);
    console.error("🔴 [register] Error Response:", error.response);
    console.error("🔴 [register] Error Data:", error.response?.data);
    console.error("🔴 [register] Error Status:", error.response?.status);
    
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message ||
                        "Registration failed";
    
    console.error("🔴 [register] Final Error Message:", errorMessage);
    throw new Error(errorMessage);
  }
};

// ========== LOGIN ==========

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  needsVerification?: boolean;
  user?: {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: string;
  };
  token?: string;
  refreshToken?: string;
  sessionId?: string;
  redirectPath?: string;
  requires2FA?: boolean;
  tempToken?: string;
}
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log("🔵 [login] Request:", { email: data.email });
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, data);
    console.log("🟢 [login] Response:", response.data);
    
    // ✅ Handle unverified email (BEFORE storing tokens)
    if (response.data.needsVerification) {
      console.log("📧 [login] User needs email verification");
      // Don't store anything
      return response.data;
    }
    
    // Handle 2FA
    if (response.data.requires2FA) {
      localStorage.setItem('tempToken', response.data.tempToken!);
      return response.data;
    }
    
    // ✅ Only store tokens if user is verified
    if (response.data.success && 
        response.data.token && 
        response.data.user?.emailVerified === true) {
      
      console.log("✅ [login] Storing login tokens for verified user");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("sessionId", response.data.sessionId);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error("🔴 [login] Error:", error);
    console.error("🔴 [login] Error Response:", error.response?.data);
    throw new Error(error.response?.data?.error || error.response?.data?.message || "Login failed");
  }
};



// ========== PASSWORD MANAGEMENT ==========

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

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
  localStorage.removeItem("tempToken");
};

// ========== SOCIAL AUTH ==========

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