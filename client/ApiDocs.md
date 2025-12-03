## ✅ **Full Documentation File**

````{"id":"59210","variant":"standard"}
# 📘 API Documentation

This document describes all API endpoints used in the ConnecX client application.

---

# 🔧 Base URL  
The application loads the API base URL from environment variables:

```
VITE_API_URL = <from .env>
```

If not found, it defaults to:

```
http://localhost:5000/api
```

---

# 🔐 AUTHENTICATION ENDPOINTS

## **Auth Routes**
| Name | Method | URL | Description |
|------|--------|-----|-------------|
| Login | POST | `/auth/login` | Login user and retrieve tokens |
| Register | POST | `/auth/register` | Create a new user account |
| Logout | POST | `/auth/logout` | Invalidate session |
| Me | GET | `/auth/me` | Retrieve logged-in user information |
| Refresh Token | POST | `/auth/refresh-token` | Get a new access token |
| Verify 2FA | POST | `/auth/2fa/verify` | Validate 2FA code |
| Forgot Password | POST | `/auth/forgot-password` | Send password reset link/code |
| Reset Password | POST | `/auth/reset-password` | Reset password |
| Change Password | POST | `/auth/change-password` | Change user password |

---

# 👤 USER ENDPOINTS

## **Profile & Account**
| Name | Method | URL | Description |
|------|--------|-----|-------------|
| Get Profile | GET | `/user/profile` | Fetch user profile details |
| Update User | PUT | `/user/update` | Update core user details |
| Update Profile | PUT | `/user/profile/update` | Update profile info |
| Change Password | POST | `/user/change-password` | Update password |
| Sessions | GET | `/user/sessions` | Get active login sessions |
| Devices | GET | `/user/devices` | List all logged-in devices |
| Remove Device | DELETE | `/user/devices/:deviceId` | Logout a device |
| Notification Preferences | GET | `/user/notifications/preferences` | Get notification preferences |
| Update Notifications | PUT | `/user/notifications/update` | Update notification settings |
| Upload Avatar | POST | `/user/avatar/upload` | Upload profile image |

### **User 2FA**
| Action | Method | URL |
|--------|--------|-----|
| Enable 2FA | POST | `/user/2fa/enable` |
| Disable 2FA | POST | `/user/2fa/disable` |
| Verify 2FA | POST | `/user/2fa/verify` |
| 2FA Status | GET | `/user/2fa/status` |

---

# 📊 DASHBOARD ENDPOINTS
| Name | Method | URL |
|------|--------|-----|
| Cards | GET | `/dashboard/cards` |

---

# 💰 WALLET ENDPOINTS
| Action | Method | URL |
|--------|--------|-----|
| Balance | GET | `/wallet/balance` |
| Transactions | GET | `/wallet/transactions` |
| Deposit | POST | `/wallet/deposit` |
| Withdraw | POST | `/wallet/withdraw` |

---

# 🛒 STORE ENDPOINTS
| Name | Method | URL |
|------|--------|-----|
| Products | GET | `/store/products` |
| Purchase | POST | `/store/purchase` |

---

# 📡 HOTSPOT ENDPOINTS
| Action | Method | URL |
|--------|--------|-----|
| List Hotspots | GET | `/hotspots` |
| Create Hotspot | POST | `/hotspots/create` |
| Update Hotspot | PUT | `/hotspots/:id` |
| Delete Hotspot | DELETE | `/hotspots/:id` |

---

# 🛠️ ADMIN ENDPOINTS
| Name | Method | URL |
|------|--------|-----|
| Analytics | GET | `/admin/analytics` |
| Users | GET | `/admin/users` |
| Settings | PUT | `/admin/settings` |

---

# 🛍️ CART ENDPOINTS
| Action | Method | URL |
|--------|--------|-----|
| Get Cart | GET | `/cart` |
| Add to Cart | POST | `/cart/add` |
| Remove from Cart | POST | `/cart/remove` |

---

# 💳 CHECKOUT ENDPOINTS
| Action | Method | URL |
|--------|--------|-----|
| Create Checkout | POST | `/checkout/create` |
| Process Payment | POST | `/checkout/process` |

---

# 🎁 REFERRAL ENDPOINTS
| Name | Method | URL |
|------|--------|-----|
| Get Referral Link | GET | `/referrals/link` |
| Stats | GET | `/referrals/stats` |
| Activity | GET | `/referrals/activity` |
| Leaderboard | GET | `/referrals/leaderboard` |
| Progress | GET | `/referrals/progress` |
| Rewards | GET | `/referrals/rewards` |
| User Rank | GET | `/referrals/user-rank` |
| Share | POST | `/referrals/share` |

---

# 📌 Query String Helper

```ts
buildQueryString(params: Record<string, any>): string
```

### ✔ Example
```ts
const url = ENDPOINTS.STORE.PRODUCTS + buildQueryString({
  page: 2,
  search: "router",
});
```

Generated URL:
```
/store/products?page=2&search=router
```

---

# 📬 Request/Response Examples

## Example Login Request
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "your_password"
}
```

## Example Login Response
```json
{
  "success": true,
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

## Example Product Fetch
```
GET /store/products?page=1&limit=20
```

### Response:
```json
{
  "products": [],
  "page": 1,
  "total": 0
}
```

---

# 📘 Notes
- All protected routes require **Bearer Token** in headers.
- Upload routes must use **multipart/form-data**.
- Pagination queries can be added using `buildQueryString`.


