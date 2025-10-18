# KonnectX Backend Implementation Guide
## Node.js Express Full Documentation

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Authentication & Authorization](#authentication--authorization)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Implementation Steps](#implementation-steps)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)

---

## Project Overview

**KonnectX** is a hotspot management and monetization platform that allows users to:
- Register and manage WiFi hotspots
- Monitor real-time analytics and bandwidth usage
- Earn rewards through bandwidth sharing
- Withdraw earnings
- Access admin dashboard (admin only)

**Key Features:**
- User authentication (Sign In/Register)
- Hotspot management (CRUD operations)
- Real-time analytics and charts
- Earnings tracking and withdrawal system
- Reward tier system (Bronze, Silver, Gold, Platinum)
- Admin panel for user and reward management
- Transaction history
- User profiles and settings

---

## Technology Stack

### Required Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "validator": "^13.9.0",
  "express-rate-limit": "^6.7.0",
  "helmet": "^7.0.0",
  "joi": "^17.9.2",
  "stripe": "^12.0.0",
  "nodemailer": "^6.9.0"
}
```

### Installation
```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors validator express-rate-limit helmet joi stripe nodemailer
npm install --save-dev typescript @types/express @types/node ts-node nodemon
```

---

## Database Schema

### 1. User Model
```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // Don't return password by default
  },
  phone: String,
  location: String,
  bio: String,
  profileImage: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  availableBalance: {
    type: Number,
    default: 0
  },
  bankAccount: {
    accountHolder: String,
    accountNumber: String,
    routingNumber: String,
    bankName: String
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
```

### 2. Hotspot Model
```javascript
// models/Hotspot.js
const hotspotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  ssid: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    city: String,
    state: String,
    country: String
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'maintenance'],
    default: 'offline'
  },
  bandwidthLimit: {
    type: Number, // in GB per month
    default: 100
  },
  bandwidthUsed: {
    type: Number,
    default: 0
  },
  connectedUsers: {
    type: Number,
    default: 0
  },
  maxConnections: {
    type: Number,
    default: 50
  },
  monthlyEarnings: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  hardware: {
    model: String,
    macAddress: String,
    ipAddress: String,
    firmwareVersion: String
  },
  performance: {
    averageSpeed: Number, // Mbps
    uptime: Number, // percentage
    lastChecked: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

hotspotSchema.index({ userId: 1 });
hotspotSchema.index({ status: 1 });
```

### 3. Analytics Model
```javascript
// models/Analytics.js
const analyticsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hotspotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotspot',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  bandwidthUsed: Number, // in GB
  dataIn: Number, // in MB
  dataOut: Number, // in MB
  activeUsers: Number,
  peakSpeed: Number, // Mbps
  averageSpeed: Number, // Mbps
  uptime: Number, // percentage
  earnings: Number,
  transactions: Number
}, { timestamps: true });

analyticsSchema.index({ hotspotId: 1, date: -1 });
analyticsSchema.index({ userId: 1, date: -1 });
```

### 4. Transaction Model
```javascript
// models/Transaction.js
const transactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['earning', 'withdrawal', 'bonus', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  hotspotId: mongoose.Schema.Types.ObjectId,
  paymentMethod: String,
  stripeTransactionId: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
}, { timestamps: true });

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
```

### 5. Reward Tier Model
```javascript
// models/RewardTier.js
const rewardTierSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    required: true,
    unique: true
  },
  minBandwidth: {
    type: Number, // in GB per month
    required: true
  },
  bonusPercentage: {
    type: Number,
    required: true
  },
  description: String,
  benefits: [String],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
```

### 6. User Reward Tier Model
```javascript
// models/UserRewardTier.js
const userRewardTierSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  tierName: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  monthlyBandwidth: {
    type: Number,
    default: 0
  },
  bonusRate: Number,
  earnedBonuses: {
    type: Number,
    default: 0
  },
  achievedAt: Date,
  upgradedAt: Date
}, { timestamps: true });

userRewardTierSchema.index({ userId: 1 });
```

### 7. Withdrawal Request Model
```javascript
// models/WithdrawalRequest.js
const withdrawalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 10 // minimum $10 withdrawal
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processing', 'completed'],
    default: 'pending'
  },
  bankAccount: {
    accountHolder: String,
    accountNumber: String,
    routingNumber: String,
    bankName: String
  },
  transactionId: mongoose.Schema.Types.ObjectId,
  rejectionReason: String,
  processedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

withdrawalSchema.index({ userId: 1, createdAt: -1 });
```

### 8. Support Ticket Model
```javascript
// models/SupportTicket.js
const ticketSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'billing', 'account', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  attachments: [String],
  replies: [{
    adminId: mongoose.Schema.Types.ObjectId,
    message: String,
    createdAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date
}, { timestamps: true });
```

---

## Authentication & Authorization

### 1. JWT Configuration
```javascript
// config/jwt.js
module.exports = {
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  secret: process.env.JWT_SECRET || 'your-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
};
```

### 2. Authentication Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
```

### 3. Password Hashing
```javascript
// utils/passwordUtils.js
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}

Response: 201
{
  "success": true,
  "message": "User registered successfully",
  "userId": "user_id",
  "token": "jwt_token"
}
```

#### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200
{
  "success": true,
  "token": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "firstName": "John",
    "role": "user"
  }
}
```

#### 3. Refresh Token
```
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}

Response: 200
{
  "success": true,
  "token": "new_jwt_token"
}
```

#### 4. Logout User
```
POST /api/auth/logout
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 5. Change Password
```
POST /api/auth/change-password
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}

Response: 200
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### 6. Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### User Endpoints

#### 1. Get User Profile
```
GET /api/users/profile
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "bio": "Hotspot owner",
    "totalEarnings": 1250.50,
    "availableBalance": 500.00,
    "role": "user",
    "createdAt": "2024-01-15"
  }
}
```

#### 2. Update User Profile
```
PUT /api/users/profile
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "bio": "Updated bio"
}

Response: 200
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

#### 3. Get User Statistics
```
GET /api/users/stats
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "stats": {
    "totalHotspots": 5,
    "activeHotspots": 4,
    "totalBandwidthUsed": 450.5,
    "totalEarnings": 1250.50,
    "availableBalance": 500.00,
    "monthlyEarnings": 125.50,
    "rewardTier": "Silver",
    "referralCount": 3
  }
}
```

#### 4. Enable Two-Factor Authentication
```
POST /api/users/2fa/enable
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "secret": "JBSWY3DPEBLW64TMMQ======"
}
```

#### 5. Verify Two-Factor Authentication
```
POST /api/users/2fa/verify
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "123456"
}

Response: 200
{
  "success": true,
  "message": "2FA enabled successfully"
}
```

---

### Hotspot Endpoints

#### 1. Create Hotspot
```
POST /api/hotspots
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Hotspot #1",
  "ssid": "MyWifi_001",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  },
  "bandwidthLimit": 100,
  "maxConnections": 50,
  "hardware": {
    "model": "TP-Link AC1200",
    "macAddress": "00:11:22:33:44:55"
  }
}

Response: 201
{
  "success": true,
  "message": "Hotspot created successfully",
  "hotspot": { ... }
}
```

#### 2. Get All Hotspots (User)
```
GET /api/hotspots
Headers: Authorization: Bearer <token>

Query Parameters:
- status: online|offline|maintenance
- limit: 10
- page: 1

Response: 200
{
  "success": true,
  "hotspots": [ ... ],
  "pagination": {
    "total": 5,
    "limit": 10,
    "page": 1,
    "pages": 1
  }
}
```

#### 3. Get Hotspot Details
```
GET /api/hotspots/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "hotspot": {
    "id": "hotspot_id",
    "name": "Hotspot #1",
    "ssid": "MyWifi_001",
    "status": "online",
    "connectedUsers": 12,
    "bandwidthUsed": 45.5,
    "monthlyEarnings": 125.50,
    "performance": { ... }
  }
}
```

#### 4. Update Hotspot
```
PUT /api/hotspots/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Hotspot Name",
  "bandwidthLimit": 150,
  "maxConnections": 60
}

Response: 200
{
  "success": true,
  "message": "Hotspot updated successfully",
  "hotspot": { ... }
}
```

#### 5. Delete Hotspot
```
DELETE /api/hotspots/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Hotspot deleted successfully"
}
```

#### 6. Get Hotspot Analytics
```
GET /api/hotspots/:id/analytics
Headers: Authorization: Bearer <token>

Query Parameters:
- startDate: 2024-01-01
- endDate: 2024-01-31
- granularity: daily|weekly|monthly

Response: 200
{
  "success": true,
  "analytics": [
    {
      "date": "2024-01-01",
      "bandwidthUsed": 5.2,
      "dataIn": 2500,
      "dataOut": 2700,
      "activeUsers": 15,
      "averageSpeed": 45.3,
      "uptime": 99.5,
      "earnings": 12.50
    }
  ]
}
```

#### 7. Update Hotspot Status
```
PATCH /api/hotspots/:id/status
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "online|offline|maintenance"
}

Response: 200
{
  "success": true,
  "message": "Status updated successfully"
}
```

---

### Analytics Endpoints

#### 1. Get Dashboard Overview
```
GET /api/analytics/overview
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "overview": {
    "totalHotspots": 5,
    "activeHotspots": 4,
    "totalConnectedUsers": 120,
    "totalBandwidthUsed": 450.5,
    "monthlyEarnings": 1250.50,
    "totalEarnings": 5000.00,
    "availableBalance": 2000.00,
    "rewardTier": "Silver"
  }
}
```

#### 2. Get Revenue Analytics
```
GET /api/analytics/revenue
Headers: Authorization: Bearer <token>

Query Parameters:
- period: day|week|month|year
- startDate: 2024-01-01
- endDate: 2024-01-31

Response: 200
{
  "success": true,
  "revenue": {
    "totalRevenue": 1250.50,
    "revenueByDay": [ ... ],
    "revenueByHotspot": [ ... ],
    "averageDailyRevenue": 40.34
  }
}
```

#### 3. Get Bandwidth Analytics
```
GET /api/analytics/bandwidth
Headers: Authorization: Bearer <token>

Query Parameters:
- hotspotId: optional
- period: day|week|month

Response: 200
{
  "success": true,
  "bandwidth": {
    "totalUsed": 450.5,
    "dailyData": [ ... ],
    "topHotspots": [ ... ],
    "trend": "increasing|decreasing"
  }
}
```

#### 4. Get User Analytics
```
GET /api/analytics/users
Headers: Authorization: Bearer <token>

Query Parameters:
- hotspotId: optional
- period: day|week|month

Response: 200
{
  "success": true,
  "users": {
    "totalConnections": 1500,
    "uniqueUsers": 400,
    "averageSessionDuration": 45,
    "peakHours": [ ... ],
    "dailyActiveUsers": [ ... ]
  }
}
```

---

### Earnings & Withdrawal Endpoints

#### 1. Get Earnings Summary
```
GET /api/earnings/summary
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "earnings": {
    "totalEarnings": 5000.00,
    "monthlyEarnings": 1250.50,
    "availableBalance": 2000.00,
    "pendingBalance": 250.00,
    "rewardBonus": 125.50,
    "rewardTier": "Silver",
    "nextTierProgress": 65
  }
}
```

#### 2. Get Transaction History
```
GET /api/earnings/transactions
Headers: Authorization: Bearer <token>

Query Parameters:
- type: earning|withdrawal|bonus|refund
- status: pending|completed|failed
- limit: 20
- page: 1
- startDate: 2024-01-01
- endDate: 2024-01-31

Response: 200
{
  "success": true,
  "transactions": [
    {
      "id": "transaction_id",
      "type": "earning",
      "amount": 25.50,
      "description": "Bandwidth earnings from Hotspot #1",
      "status": "completed",
      "createdAt": "2024-01-15"
    }
  ],
  "pagination": { ... }
}
```

#### 3. Request Withdrawal
```
POST /api/earnings/withdraw
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 500.00,
  "bankAccount": {
    "accountHolder": "John Doe",
    "accountNumber": "1234567890",
    "routingNumber": "021000021",
    "bankName": "Chase Bank"
  }
}

Response: 201
{
  "success": true,
  "message": "Withdrawal request created",
  "withdrawalId": "withdrawal_id",
  "estimatedDelivery": "2024-01-20"
}
```

#### 4. Get Withdrawal History
```
GET /api/earnings/withdrawals
Headers: Authorization: Bearer <token>

Query Parameters:
- status: pending|approved|processing|completed|rejected
- limit: 10
- page: 1

Response: 200
{
  "success": true,
  "withdrawals": [
    {
      "id": "withdrawal_id",
      "amount": 500.00,
      "status": "completed",
      "bankAccount": { ... },
      "processedAt": "2024-01-18",
      "createdAt": "2024-01-15"
    }
  ]
}
```

#### 5. Get Reward Tiers
```
GET /api/earnings/reward-tiers
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "tiers": [
    {
      "id": "tier_id",
      "name": "Bronze",
      "minBandwidth": 10,
      "bonusPercentage": 5,
      "description": "Entry level reward tier",
      "benefits": [ "5% bonus", "Priority support" ]
    },
    ...
  ],
  "userCurrentTier": "Silver"
}
```

#### 6. Get Reward Progress
```
GET /api/earnings/reward-progress
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "progress": {
    "currentTier": "Silver",
    "minBandwidth": 50,
    "currentBandwidth": 45.5,
    "bonusPercentage": 10,
    "earnedBonuses": 125.50,
    "nextTier": "Gold",
    "nextTierBandwidth": 100,
    "progressPercent": 45.5
  }
}
```

---

### Admin Endpoints

#### 1. Get All Users (Admin)
```
GET /api/admin/users
Headers: Authorization: Bearer <token>

Query Parameters:
- search: search by name or email
- status: active|inactive
- role: user|admin
- limit: 20
- page: 1
- sortBy: createdAt|earnings

Response: 200
{
  "success": true,
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "hotspots": 5,
      "totalEarnings": 1250.50,
      "status": "active",
      "joinedDate": "2024-01-15"
    }
  ],
  "pagination": { ... }
}
```

#### 2. Get User Details (Admin)
```
GET /api/admin/users/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "status": "active",
    "totalEarnings": 1250.50,
    "availableBalance": 500.00,
    "hotspots": [ ... ],
    "rewardTier": "Silver",
    "createdAt": "2024-01-15",
    "lastLogin": "2024-01-20"
  }
}
```

#### 3. Update User Status (Admin)
```
PATCH /api/admin/users/:id/status
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active|inactive|suspended"
}

Response: 200
{
  "success": true,
  "message": "User status updated"
}
```

#### 4. Get All Reward Tiers (Admin)
```
GET /api/admin/reward-tiers
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "tiers": [ ... ]
}
```

#### 5. Create Reward Tier (Admin)
```
POST /api/admin/reward-tiers
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Diamond",
  "minBandwidth": 500,
  "bonusPercentage": 20,
  "description": "Elite tier",
  "benefits": [ "20% bonus", "24/7 support" ]
}

Response: 201
{
  "success": true,
  "message": "Reward tier created",
  "tier": { ... }
}
```

#### 6. Update Reward Tier (Admin)
```
PUT /api/admin/reward-tiers/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "bonusPercentage": 25,
  "minBandwidth": 600
}

Response: 200
{
  "success": true,
  "message": "Reward tier updated"
}
```

#### 7. Delete Reward Tier (Admin)
```
DELETE /api/admin/reward-tiers/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Reward tier deleted"
}
```

#### 8. Get System Statistics (Admin)
```
GET /api/admin/stats
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "stats": {
    "totalUsers": 2450,
    "activeUsers": 1850,
    "totalHotspots": 1280,
    "activeHotspots": 980,
    "totalRevenue": 125450.50,
    "monthlyRevenue": 12500.00,
    "totalBandwidthUsed": 5420.5,
    "totalTransactions": 8500,
    "userGrowth": [ ... ],
    "revenueGrowth": [ ... ]
  }
}
```

#### 9. Get System Health (Admin)
```
GET /api/admin/health
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "health": {
    "apiStatus": "healthy",
    "databaseStatus": "healthy",
    "uptime": 99.98,
    "responseTime": 45,
    "errorRate": 0.02,
    "lastCheck": "2024-01-20T10:30:00Z"
  }
}
```

#### 10. Get Withdrawal Requests (Admin)
```
GET /api/admin/withdrawals
Headers: Authorization: Bearer <token>

Query Parameters:
- status: pending|approved|rejected|processing|completed
- limit: 20
- page: 1

Response: 200
{
  "success": true,
  "withdrawals": [
    {
      "id": "withdrawal_id",
      "userId": "user_id",
      "userName": "John Doe",
      "amount": 500.00,
      "status": "pending",
      "createdAt": "2024-01-20"
    }
  ]
}
```

#### 11. Approve Withdrawal (Admin)
```
PATCH /api/admin/withdrawals/:id/approve
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Withdrawal approved"
}
```

#### 12. Reject Withdrawal (Admin)
```
PATCH /api/admin/withdrawals/:id/reject
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Invalid bank account information"
}

Response: 200
{
  "success": true,
  "message": "Withdrawal rejected"
}
```

---

## Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB configuration
│   ├── jwt.js               # JWT configuration
│   └── stripe.js            # Stripe configuration
├── models/
│   ├── User.js
│   ├── Hotspot.js
│   ├── Analytics.js
│   ├── Transaction.js
│   ├── RewardTier.js
│   ├── UserRewardTier.js
│   ├── WithdrawalRequest.js
│   └── SupportTicket.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── hotspotController.js
│   ├── analyticsController.js
│   ├── earningsController.js
│   ├── adminController.js
│   └── supportController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── hotspotRoutes.js
│   ├── analyticsRoutes.js
│   ├── earningsRoutes.js
│   ├── adminRoutes.js
│   └── supportRoutes.js
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── authorize.js         # Authorization middleware
│   ├── errorHandler.js      # Error handling
│   ├── validation.js        # Request validation
│   └── rateLimit.js         # Rate limiting
├── utils/
│   ├── passwordUtils.js     # Password hashing
│   ├── tokenUtils.js        # Token generation
│   ├── emailUtils.js        # Email sending
│   ├── analyticsUtils.js    # Analytics calculations
│   └── rewardUtils.js       # Reward calculations
├── services/
│   ├── analyticsService.js
│   ├── earningsService.js
│   ├── rewardService.js
│   ├── paymentService.js    # Stripe integration
│   └── emailService.js
├── validators/
│   ├── authValidator.js
│   ├── userValidator.js
│   ├── hotspotValidator.js
│   └── transactionValidator.js
├── middleware/
│   └── errorHandler.js
├── .env.example
├── server.js                # Server entry point
└── package.json
```

---

## Implementation Steps

### Step 1: Setup Express Server
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/hotspots', require('./routes/hotspotRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/earnings', require('./routes/earningsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 2: Setup Database Connection
```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Step 3: Implement Authentication
```javascript
// controllers/authController.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: user._id,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
```

### Step 4: Implement Hotspot Management
```javascript
// controllers/hotspotController.js
const Hotspot = require('../models/Hotspot');

const createHotspot = async (req, res) => {
  try {
    const { name, ssid, location, bandwidthLimit, maxConnections } = req.body;

    const hotspot = new Hotspot({
      userId: req.userId,
      name,
      ssid,
      location,
      bandwidthLimit,
      maxConnections
    });

    await hotspot.save();

    res.status(201).json({
      success: true,
      message: 'Hotspot created successfully',
      hotspot
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserHotspots = async (req, res) => {
  try {
    const { status = '', limit = 10, page = 1 } = req.query;

    const query = { userId: req.userId };
    if (status) query.status = status;

    const hotspots = await Hotspot.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Hotspot.countDocuments(query);

    res.json({
      success: true,
      hotspots,
      pagination: {
        total,
        limit: limit * 1,
        page: page * 1,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createHotspot, getUserHotspots };
```

### Step 5: Implement Analytics
```javascript
// controllers/analyticsController.js
const Analytics = require('../models/Analytics');
const Hotspot = require('../models/Hotspot');
const Transaction = require('../models/Transaction');

const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.userId;

    // Get hotspot stats
    const hotspots = await Hotspot.find({ userId });
    const activeHotspots = hotspots.filter(h => h.status === 'online').length;
    
    const totalConnectedUsers = hotspots.reduce((sum, h) => sum + h.connectedUsers, 0);
    const totalBandwidthUsed = hotspots.reduce((sum, h) => sum + h.bandwidthUsed, 0);
    const totalEarnings = hotspots.reduce((sum, h) => sum + h.totalEarnings, 0);
    const monthlyEarnings = hotspots.reduce((sum, h) => sum + h.monthlyEarnings, 0);

    // Get available balance from transactions
    const transactions = await Transaction.find({ userId });
    const availableBalance = transactions
      .filter(t => t.status === 'completed' && t.type !== 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      success: true,
      overview: {
        totalHotspots: hotspots.length,
        activeHotspots,
        totalConnectedUsers,
        totalBandwidthUsed,
        monthlyEarnings,
        totalEarnings,
        availableBalance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardOverview };
```

---

## Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/konnectx
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/konnectx

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# Frontend
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

---

## Deployment

### Option 1: Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create konnectx-app

# Set environment variables
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set MONGODB_URI="your_mongodb_uri"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Deploy to AWS

1. Create EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Configure environment variables
6. Start server with PM2

```bash
npm install -g pm2
pm2 start server.js --name "konnectx"
pm2 save
pm2 startup
```

### Option 3: Deploy with Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t konnectx-backend .
docker run -p 5000:5000 --env-file .env konnectx-backend
```

---

## Security Best Practices

1. **Password Hashing**: Use bcryptjs with salt rounds of 10+
2. **JWT Tokens**: Use strong secrets and appropriate expiry times
3. **Input Validation**: Validate all user inputs with Joi or similar
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **CORS**: Configure CORS properly for frontend domain
6. **Environment Variables**: Never commit secrets to repository
7. **HTTPS**: Always use HTTPS in production
8. **SQL Injection**: Use parameterized queries (MongoDB handles this)
9. **XSS Protection**: Use helmet middleware
10. **Database**: Use strong passwords and IP whitelisting

---

## Testing

### Unit Tests
```bash
npm install --save-dev jest supertest
npm test
```

### API Testing with Postman
- Import the endpoints into Postman
- Create environment variables for tokens
- Test each endpoint with appropriate payloads

---

## Monitoring & Maintenance

1. **Monitor Logs**: Use services like Loggly or CloudWatch
2. **Monitor Performance**: Track API response times
3. **Monitor Errors**: Set up error tracking with Sentry
4. **Database Backups**: Schedule regular MongoDB backups
5. **Security Updates**: Keep dependencies updated

---

## Conclusion

This document provides a comprehensive backend implementation guide for the KonnectX platform. Follow the steps sequentially to build a robust, scalable backend system that integrates seamlessly with your React frontend.

For questions or issues, refer to:
- Express.js Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- JWT Documentation: https://jwt.io

