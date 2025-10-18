# KonnectX Authentication & Login System
## Complete Admin & User Authentication Guide

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [User Login Flow](#user-login-flow)
4. [Admin Login Flow](#admin-login-flow)
5. [Frontend Implementation](#frontend-implementation)
6. [Backend Implementation](#backend-implementation)
7. [Token Management](#token-management)
8. [Session Management](#session-management)
9. [Security Best Practices](#security-best-practices)
10. [Testing & Troubleshooting](#testing--troubleshooting)

---

## System Overview

The KonnectX authentication system is a **JWT-based (JSON Web Token)** authentication system that handles both **user** and **admin** roles with different access levels and permissions.

### Key Features:
- ✅ Email/Password authentication
- ✅ JWT token-based sessions
- ✅ Refresh token mechanism
- ✅ Role-based access control (RBAC)
- ✅ Automatic token expiration
- ✅ Secure password hashing
- ✅ Two-factor authentication support
- ✅ Session persistence

### Authentication Flow Diagram:
```
User/Admin submits credentials (email + password)
                    ↓
         Backend validates credentials
                    ↓
         Password verified with bcrypt
                    ↓
         Generate JWT tokens (access + refresh)
                    ↓
    Return tokens to frontend + user data
                    ↓
Frontend stores tokens in localStorage/sessionStorage
                    ↓
Attach token to API requests in Authorization header
                    ↓
Backend validates token on each request
                    ↓
Grant/Deny access based on token validity & role
```

---

## Architecture

### Three-Layer Architecture:

#### Layer 1: Frontend (React)
- Sign In/Register UI components
- Form validation
- Token storage
- Protected routes
- Context-based state management

#### Layer 2: Backend (Express.js)
- Authentication endpoints
- Password hashing & verification
- JWT token generation
- Role-based authorization middleware

#### Layer 3: Database (MongoDB)
- User credentials storage
- Role information
- Authentication logs

### User Roles:

```javascript
{
  "user": {
    "permissions": [
      "create_hotspot",
      "view_own_hotspots",
      "view_own_earnings",
      "withdraw_funds",
      "manage_own_profile"
    ]
  },
  "admin": {
    "permissions": [
      "view_all_users",
      "manage_users",
      "view_system_stats",
      "manage_reward_tiers",
      "approve_withdrawals",
      "manage_all_hotspots"
    ]
  }
}
```

---

## User Login Flow

### Step 1: User Accesses Sign In Page

The user navigates to `/signin` route:

```
Landing Page
    ↓
Click "Sign In" button
    ↓
Navigate to /signin
    ↓
SignIn Component loads
```

### Step 2: Sign In Form Submission

**Frontend (React Component):**

```javascript
// pages/SignIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send credentials to backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store tokens
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Store user data in context
      setUser(data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-secondary/90">
      <form onSubmit={handleSignIn} className="max-w-md mx-auto p-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
```

### Step 3: Backend Authentication

**Backend (Express Controller):**

```javascript
// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Verify password using bcryptjs
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: "Account is suspended. Contact support."
      });
    }

    // Generate Access Token (15 minutes)
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate Refresh Token (7 days)
    const refreshToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Response with tokens (don't include password)
    res.json({
      success: true,
      message: "Login successful",
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        totalEarnings: user.totalEarnings,
        availableBalance: user.availableBalance
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Server error. Please try again later."
    });
  }
};
```

### Step 4: Token Storage

**Frontend stores tokens in localStorage:**

```javascript
// Token storage location
localStorage.setItem("accessToken", data.token);         // 15-minute token
localStorage.setItem("refreshToken", data.refreshToken); // 7-day token
localStorage.setItem("user", JSON.stringify(data.user)); // User metadata
```

### Step 5: Redirect to Dashboard

```
User successfully authenticated
    ↓
Tokens stored in localStorage
    ↓
User object stored in Context
    ↓
Redirect to /dashboard
    ↓
Dashboard checks for valid token
    ↓
User Dashboard loads
```

---

## Admin Login Flow

The admin login flow is **identical to user login**, with one key difference: **role verification**.

### Admin Sign In Page

```javascript
// pages/SignIn.tsx (same component for both admin and user)

const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // Store tokens
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);

    // Check user role and redirect accordingly
    if (data.user.role === "admin") {
      navigate("/admin"); // Redirect to admin dashboard
    } else {
      navigate("/dashboard"); // Redirect to user dashboard
    }
  } catch (err) {
    setError("Network error. Please try again.");
  }
};
```

### Admin Route Protection

**Frontend Route Guard:**

```javascript
// App.tsx
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminRoute({ element }: { element: React.ReactNode }) {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return element;
}

// Usage in routes
<Route path="/admin" element={<AdminRoute element={<AdminLayout />} />} />
```

**Backend Route Guard:**

```javascript
// middleware/authorize.js
const authorize = (requiredRole) => {
  return (req, res, next) => {
    // req.userRole is set by authentication middleware
    if (req.userRole !== requiredRole) {
      return res.status(403).json({
        success: false,
        error: `Access denied. ${requiredRole} role required.`
      });
    }
    next();
  };
};

// Usage in routes
router.get(
  "/admin/users",
  authenticate,
  authorize("admin"),
  adminController.getAllUsers
);
```

---

## Frontend Implementation

### 1. AppContext for Authentication State

**Create a React Context to manage auth globally:**

```javascript
// contexts/AppContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  totalEarnings?: number;
  availableBalance?: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load auth data:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        logout,
        token
      }}
    >
      {!isLoading && children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

### 2. Protected Routes

```javascript
// components/ProtectedRoute.tsx
import { useApp } from "@/contexts/AppContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: "user" | "admin";
}

export function ProtectedRoute({
  element,
  requiredRole
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
}
```

### 3. API Interceptor for Tokens

```javascript
// utils/apiClient.ts
export async function apiCall(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("accessToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // If token expired (401), try to refresh
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
      });

      if (refreshResponse.ok) {
        const { token: newToken } = await refreshResponse.json();
        localStorage.setItem("accessToken", newToken);

        // Retry original request
        headers["Authorization"] = `Bearer ${newToken}`;
        return fetch(url, { ...options, headers });
      } else {
        // Refresh failed, redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin";
      }
    }
  }

  return response;
}
```

---

## Backend Implementation

### 1. Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "No authorization header provided"
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded token data to request
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired",
        code: "TOKEN_EXPIRED"
      });
    }

    return res.status(401).json({
      success: false,
      error: "Invalid token"
    });
  }
};

module.exports = authenticate;
```

### 2. Authorization Middleware

```javascript
// middleware/authorize.js
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
        requiredRole: allowedRoles
      });
    }
    next();
  };
};

module.exports = authorize;
```

### 3. Register Endpoint

```javascript
// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters"
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email is already registered"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (role defaults to 'user')
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user" // Default role
    });

    await user.save();

    // Generate tokens
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed"
    });
  }
};
```

### 4. Refresh Token Endpoint

```javascript
// controllers/authController.js
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "Refresh token required"
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Get fresh user data
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: "User not found or account inactive"
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token: newAccessToken
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid refresh token"
    });
  }
};
```

### 5. Logout Endpoint

```javascript
// controllers/authController.js
exports.logout = async (req, res) => {
  try {
    // Note: Since we're using stateless JWT tokens, logout is handled client-side
    // by removing tokens from localStorage. This endpoint is optional but useful
    // for logging audit trails, blacklisting tokens, etc.

    const userId = req.userId;

    // Optional: Log logout event
    console.log(`User ${userId} logged out`);

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Logout failed"
    });
  }
};
```

### 6. Auth Routes

```javascript
// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

// Protected routes
router.post("/logout", authenticate, authController.logout);

module.exports = router;
```

---

## Token Management

### Access Token
- **Purpose**: Short-lived token for API requests
- **Expiry**: 15 minutes
- **Usage**: Included in `Authorization: Bearer <token>` header

### Refresh Token
- **Purpose**: Long-lived token to get new access tokens
- **Expiry**: 7 days
- **Storage**: localStorage (secure alternative: httpOnly cookies)
- **Usage**: Sent to `/api/auth/refresh` endpoint to get new access token

### Token Payload Structure

```javascript
// Access Token Payload
{
  userId: "user_id_123",
  email: "user@example.com",
  role: "user|admin",
  iat: 1705760400,
  exp: 1705761300
}

// Refresh Token Payload
{
  userId: "user_id_123",
  iat: 1705760400,
  exp: 1705851300
}
```

### Token Refresh Flow

```
User makes API request with access token
    ↓
Token is valid → Request succeeds
    ↓
Token is expired → Response: 401 Unauthorized
    ↓
Frontend receives 401 error
    ↓
Frontend sends refresh token to /api/auth/refresh
    ↓
Backend validates refresh token
    ↓
Backend generates new access token
    ↓
Frontend stores new access token
    ↓
Frontend retries original request with new token
    ↓
Request succeeds
```

---

## Session Management

### Session Storage

**localStorage:** Persistent across browser sessions
```javascript
// Advantages:
// - Survives browser close/reopen
// - Simple to implement
// - Automatic persistence

// Disadvantages:
// - Vulnerable to XSS attacks
// - Cannot be httpOnly

localStorage.setItem("accessToken", token);
localStorage.getItem("accessToken");
localStorage.removeItem("accessToken");
```

**sessionStorage:** Session-only storage
```javascript
// Advantages:
// - Automatically clears on browser close
// - XSS protection

// Disadvantages:
// - Lost on page refresh
// - Not persistent

sessionStorage.setItem("accessToken", token);
```

### Recommended: Hybrid Approach

```javascript
// Store refresh token in httpOnly cookie (most secure)
// Store access token in memory or sessionStorage
// Use short-lived access tokens (15-30 minutes)

// Backend sets httpOnly cookie
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,      // Not accessible by JavaScript
  secure: true,        // Only sent over HTTPS
  sameSite: "strict",  // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### Auto Logout on Token Expiry

```javascript
// utils/tokenMonitor.ts
export function setupTokenMonitor() {
  const token = localStorage.getItem("accessToken");

  if (!token) return;

  const decoded = JSON.parse(atob(token.split(".")[1]));
  const expiryTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeUntilExpiry = expiryTime - currentTime;

  // Set timeout to logout when token expires
  setTimeout(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  }, timeUntilExpiry);
}
```

---

## Security Best Practices

### 1. Password Security

✅ **DO:**
- Hash passwords with bcryptjs (10+ salt rounds)
- Enforce strong password requirements (8+ chars, mixed case, numbers)
- Use slow hashing algorithm (bcrypt delays brute force attacks)
- Never store plain text passwords

❌ **DON'T:**
- Log passwords
- Send passwords in URLs
- Use fast hashing (MD5, SHA1)
- Store passwords in frontend

```javascript
// Good practice
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Bad practice
const hashedPassword = crypto.md5(password); // ❌ Too fast
```

### 2. Token Security

✅ **DO:**
- Use strong, random secrets for JWT signing
- Set appropriate token expiry times
- Store tokens securely (httpOnly cookies preferred)
- Verify token signature on every request
- Use HTTPS in production

❌ **DON'T:**
- Expose JWT secret in frontend code
- Use weak secrets
- Store sensitive data in token payload (it's encoded, not encrypted)
- Use tokens without expiry

```javascript
// Good practice
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "15m"
});

// Bad practice
const token = jwt.sign(payload, "my-secret"); // ❌ Weak secret
```

### 3. Input Validation

```javascript
// Good practice - Validate all inputs
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const { error, value } = loginSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
```

### 4. Rate Limiting

```javascript
// Prevent brute force attacks
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per windowMs
  message: "Too many login attempts. Try again later."
});

router.post("/login", loginLimiter, authController.login);
```

### 5. CORS Configuration

```javascript
// Only allow requests from your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

---

## Testing & Troubleshooting

### Test Scenarios

#### Test 1: User Login with Valid Credentials
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "ValidPassword123"
}

Expected Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Test 2: Admin Login with Valid Credentials
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "AdminPassword123"
}

Expected Response: 200 OK
{
  "success": true,
  "user": {
    "role": "admin" // ← Admin role returned
  }
}
```

#### Test 3: Login with Invalid Password
```bash
POST /api/auth/login

{
  "email": "user@example.com",
  "password": "WrongPassword"
}

Expected Response: 401 Unauthorized
{
  "success": false,
  "error": "Invalid email or password"
}
```

#### Test 4: Token Refresh
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Expected Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..." // New access token
}
```

#### Test 5: Protected Route Access
```bash
GET /api/users/profile
Authorization: Bearer <access_token>

Expected Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

#### Test 6: Admin-Only Route Access (User tries to access)
```bash
GET /api/admin/users
Authorization: Bearer <user_token>

Expected Response: 403 Forbidden
{
  "success": false,
  "error": "Access denied. admin role required."
}
```

### Common Issues & Solutions

#### Issue 1: "Invalid token" Error
**Causes:**
- Token expired
- Wrong JWT secret
- Token corrupted
- Token from different environment

**Solution:**
- Check token expiry: `jwt.decode(token)`
- Verify JWT_SECRET matches frontend and backend
- Refresh token using refresh endpoint
- Clear localStorage and login again

#### Issue 2: CORS Errors on Login
**Cause:**
- Frontend URL not in CORS whitelist

**Solution:**
```javascript
// backend - update CORS config
app.use(cors({
  origin: "http://localhost:3000", // Add your frontend URL
  credentials: true
}));
```

#### Issue 3: Token Not Being Sent to Backend
**Cause:**
- Authorization header not set correctly
- Token not in localStorage

**Solution:**
```javascript
// Verify token is being sent
const token = localStorage.getItem("accessToken");
console.log("Token:", token);

// Check API request
const response = await fetch("/api/users/profile", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

#### Issue 4: "User not found" After Login
**Cause:**
- User deleted from database after login
- Database not synced

**Solution:**
- Check database connection
- Verify user exists in database
- Logout and login again

### Using Postman to Test

1. **Create Environment Variables:**
   - `base_url`: http://localhost:5000
   - `token`: (empty initially)
   - `refresh_token`: (empty initially)

2. **Login Request:**
   - Method: POST
   - URL: `{{base_url}}/api/auth/login`
   - Body:
     ```json
     {
       "email": "user@example.com",
       "password": "Password123"
     }
     ```
   - Tests (save tokens):
     ```javascript
     pm.environment.set("token", pm.response.json().token);
     pm.environment.set("refresh_token", pm.response.json().refreshToken);
     ```

3. **Protected Route Request:**
   - Method: GET
   - URL: `{{base_url}}/api/users/profile`
   - Headers: `Authorization: Bearer {{token}}`

---

## Frontend Login/Logout Flow Summary

### Login Flow
```
User enters credentials in SignIn component
    ↓
Submit form → POST /api/auth/login
    ↓
Receive tokens + user data
    ↓
Store tokens in localStorage
    ↓
Store user in AppContext
    ↓
Redirect to /dashboard or /admin based on role
    ↓
Protected routes now accessible
```

### Logout Flow
```
User clicks logout button
    ↓
Call logout function from useApp hook
    ↓
Clear localStorage
    ↓
Clear AppContext user data
    ↓
Redirect to landing page
    ↓
Protected routes now redirect to /signin
```

### Redirects Based on Role

| Scenario | User Role | Redirect To |
|----------|-----------|------------|
| After Login | user | /dashboard |
| After Login | admin | /admin |
| Access /admin | user | /dashboard |
| Access /dashboard | admin | /admin (allowed) |
| No token | any | /signin |
| Token expired | any | /signin |

---

## Environment Variables Needed

Create `.env` file in backend root:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars

# Database
MONGODB_URI=mongodb://localhost:27017/konnectx

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email (for password reset)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## Conclusion

The KonnectX authentication system provides:

✅ Secure JWT-based authentication
✅ Role-based access control (User/Admin)
✅ Token refresh mechanism
✅ Automatic logout on expiry
✅ Protected routes
✅ Password hashing
✅ Session persistence

Follow this guide to implement and maintain a robust authentication system for your KonnectX platform.

---

## Additional Resources

- JWT.io: https://jwt.io
- bcryptjs: https://github.com/dcodeIO/bcrypt.js
- Express Middleware: https://expressjs.com/en/guide/using-middleware.html
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
