// client/src/api/services/referralService.ts
import { apiClient } from '../client';
import { ENDPOINTS, buildQueryString } from '../endpoints';

// Types
export interface ReferralStats {
  totalReferrals: number;
  approvedReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
}

export interface ReferralActivity {
  id: string;
  referredUser: {
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  rewardType: 'cash' | 'bonus' | 'achievement';
  earningsAwarded: number;
  createdAt: string;
  approvedAt?: string;
}

export interface TopReferrer {
  userId: string;
  name: string;
  email: string;
  totalReferrals: number;
  totalEarnings: number;
}

export interface Milestone {
  name: string;
  referralsRequired: number;
  reward: string;
  achieved: boolean;
}

export interface ReferralProgress {
  totalReferrals: number;
  currentMilestone: Milestone | null;
  nextMilestone: Milestone | null;
  progress: number;
  milestones: Milestone[];
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  referralsRequired: number;
  type: 'cash' | 'feature';
  amount: number;
  available: boolean;
}

export interface UserRank {
  rank: number;
  name: string;
  totalReferrals: number;
  totalEarnings: number;
}

// API Service Functions
export const referralService = {
  // Get referral link
  getReferralLink: async () => {
    const response = await apiClient.get(ENDPOINTS.REFERRAL.LINK);
    return response.data;
  },

  // Get referral statistics
  getStats: async () => {
    const response = await apiClient.get<{ success: boolean; data: ReferralStats }>(
      ENDPOINTS.REFERRAL.STATS
    );
    return response.data.data;
  },

  // Get referral activity with pagination
  getActivity: async (params?: { limit?: number; offset?: number }) => {
    const queryString = params ? buildQueryString(params) : '';
    const response = await apiClient.get<{
      success: boolean;
      data: {
        activities: ReferralActivity[];
        pagination: {
          total: number;
          limit: number;
          offset: number;
          hasMore: boolean;
        };
      };
    }>(`${ENDPOINTS.REFERRAL.ACTIVITY}${queryString}`);
    return response.data.data;
  },

  // Get leaderboard
  getLeaderboard: async (params?: { limit?: number }) => {
    const queryString = params ? buildQueryString(params) : '';
    const response = await apiClient.get<{
      success: boolean;
      data: {
        leaderboard: TopReferrer[];
        currentUser: {
          rank: number;
          totalReferrals: number;
        };
      };
    }>(`${ENDPOINTS.REFERRAL.LEADERBOARD}${queryString}`);
    return response.data.data;
  },

  // Get referral progress
  getProgress: async () => {
    const response = await apiClient.get<{
      success: boolean;
      data: ReferralProgress;
    }>(ENDPOINTS.REFERRAL.PROGRESS);
    return response.data.data;
  },

  // Get available rewards
  getRewards: async () => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        rewards: Reward[];
        totalReferrals: number;
      };
    }>(ENDPOINTS.REFERRAL.REWARDS);
    return response.data.data;
  },

  // Get user rank
  getUserRank: async () => {
    const response = await apiClient.get<{
      success: boolean;
      data: UserRank;
    }>(ENDPOINTS.REFERRAL.USER_RANK);
    return response.data.data;
  },

  // Track share action
  trackShare: async (platform: 'facebook' | 'twitter' | 'link' | 'other') => {
    const response = await apiClient.post(ENDPOINTS.REFERRAL.SHARE, { platform });
    return response.data;
  },
};

export default referralService;