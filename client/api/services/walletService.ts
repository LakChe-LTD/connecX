// client/src/services/walletService.ts
import apiClient from '@/api/client';
import ENDPOINTS from '@/api/endpoints';

// Types
export interface WalletBalance {
  available: number;
  wallet: number;
}

export interface Transaction {
  date: string;
  description: string;
  type: string;
  amount: string;
}

export interface EarningsSummary {
  totalEarned: number;
  totalEarnedChange: string;
  monthlyRewards: number;
  monthlyRewardsChange: string;
  pendingRewardsChange: string;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface TrendData {
  month: string;
  value: number;
}

export interface WithdrawRequest {
  amount: number;
  externalAddress: string;
}

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Wallet Service
export const walletService = {
  // Get wallet balance
  async getBalance(): Promise<WalletBalance> {
    const response = await apiClient.get<ApiResponse<WalletBalance>>(
      ENDPOINTS.WALLET.BALANCE
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch balance');
    }
    
    return response.data.data!;
  },

  // Get transactions
  async getTransactions(): Promise<Transaction[]> {
    const response = await apiClient.get<ApiResponse<Transaction[]>>(
      ENDPOINTS.WALLET.TRANSACTIONS
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch transactions');
    }
    
    return response.data.data || [];
  },

  // Get earnings summary
  async getEarningsSummary(): Promise<EarningsSummary> {
    const response = await apiClient.get<ApiResponse<EarningsSummary>>(
      ENDPOINTS.WALLET.EARNINGS.SUMMARY
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch earnings summary');
    }
    
    return response.data.data!;
  },

  // Get monthly earnings
  async getMonthlyEarnings(): Promise<MonthlyEarning[]> {
    const response = await apiClient.get<ApiResponse<MonthlyEarning[]>>(
      ENDPOINTS.WALLET.EARNINGS.MONTHLY
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch monthly earnings');
    }
    
    return response.data.data || [];
  },

  // Get earnings trend
  async getEarningsTrend(): Promise<TrendData[]> {
    const response = await apiClient.get<ApiResponse<TrendData[]>>(
      ENDPOINTS.WALLET.EARNINGS.TREND
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch earnings trend');
    }
    
    return response.data.data || [];
  },

  // Claim rewards
  async claimRewards(): Promise<void> {
    const response = await apiClient.post<ApiResponse<any>>(
      ENDPOINTS.WALLET.CLAIM
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to claim rewards');
    }
  },

  // Withdraw funds
  async withdraw(request: WithdrawRequest): Promise<void> {
    const response = await apiClient.post<ApiResponse<any>>(
      ENDPOINTS.WALLET.WITHDRAW,
      request
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to process withdrawal');
    }
  }
};

export default walletService;