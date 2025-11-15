// client/src/api/endpoints.ts
// Centralized API endpoint URLs

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    ME: `${API_BASE}/auth/me`,
    REFRESH_TOKEN: `${API_BASE}/auth/refresh-token`,
    VERIFY_2FA: `${API_BASE}/auth/2fa/verify`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,      // NEW
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,  
    CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,  // ✅ CORRECT          // NEW
  },

  // User endpoints
  USER: {
    PROFILE: `${API_BASE}/user/profile`,
    SESSIONS: `${API_BASE}/user/sessions`,
    UPDATE: `${API_BASE}/user/update`,
    PASSWORD: `${API_BASE}/user/change-password`,                    // NEW - Change password
    DEVICES: `${API_BASE}/user/devices`,                      // NEW - Get connected devices
    REMOVE_DEVICE: (deviceId: string) => `${API_BASE}/user/devices/${deviceId}`, // NEW
    NOTIFICATIONS: `${API_BASE}/user/notifications/preferences`, // NEW
    TWO_FA: {
      ENABLE: `${API_BASE}/user/2fa/enable`,                  // NEW
      DISABLE: `${API_BASE}/user/2fa/disable`,                // NEW
      VERIFY: `${API_BASE}/user/2fa/verify`,                  // NEW
    },
  },

  // Wallet endpoints
  WALLET: {
    BALANCE: `${API_BASE}/wallet/balance`,
    TRANSACTIONS: `${API_BASE}/wallet/transactions`,
    DEPOSIT: `${API_BASE}/wallet/deposit`,
    WITHDRAW: `${API_BASE}/wallet/withdraw`,
  },

  // Store endpoints
  STORE: {
    PRODUCTS: `${API_BASE}/store/products`,
    PURCHASE: `${API_BASE}/store/purchase`,
  },

  // Hotspot endpoints
  HOTSPOT: {
    LIST: `${API_BASE}/hotspots`,
    CREATE: `${API_BASE}/hotspots/create`,
    UPDATE: (id: string) => `${API_BASE}/hotspots/${id}`,
    DELETE: (id: string) => `${API_BASE}/hotspots/${id}`,
  },

  // Admin endpoints
  ADMIN: {
    ANALYTICS: `${API_BASE}/admin/analytics`,
    USERS: `${API_BASE}/admin/users`,
    SETTINGS: `${API_BASE}/admin/settings`,
  },

  // Cart & Checkout
  CART: {
    GET: `${API_BASE}/cart`,
    ADD: `${API_BASE}/cart/add`,
    REMOVE: `${API_BASE}/cart/remove`,
  },
  
  CHECKOUT: {
    CREATE: `${API_BASE}/checkout/create`,
    PROCESS: `${API_BASE}/checkout/process`,
  },

  // Referrals
  REFERRAL: {
    CODE: `${API_BASE}/referrals/code`,
    STATS: `${API_BASE}/referrals/stats`,
  },
};

// Helper to build query strings
export const buildQueryString = (params: Record<string, any>): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return query ? `?${query}` : '';
};

export default ENDPOINTS;