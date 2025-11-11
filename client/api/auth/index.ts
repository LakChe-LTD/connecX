
// client/src/api/auth/index.ts
// Export all auth functions
export { login, type LoginRequest, type LoginResponse } from './login';
export { register, type RegisterRequest, type RegisterResponse } from './register';
export { getMe, type MeResponse } from './me';
export { logout, type LogoutResponse } from './logout';
export { refreshToken, type RefreshTokenRequest, type RefreshTokenResponse } from './refreshToken';