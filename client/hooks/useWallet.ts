// client/src/hooks/useWallet.ts
import walletService, { EarningsSummary, MonthlyEarning, Transaction, TrendData, WalletBalance, WithdrawRequest } from '@/api/services/walletService';
import { useState, useEffect, useCallback } from 'react';


interface UseWalletReturn {
  // Data
  balance: WalletBalance | null;
  transactions: Transaction[];
  summary: EarningsSummary | null;
  monthlyEarnings: MonthlyEarning[];
  trendData: TrendData[];
  
  // Loading states
  loading: boolean;
  claiming: boolean;
  withdrawing: boolean;
  
  // Error state
  error: string | null;
  
  // Actions
  fetchAllData: () => Promise<void>;
  claimRewards: () => Promise<void>;
  withdraw: (request: WithdrawRequest) => Promise<void>;
  clearError: () => void;
}

export const useWallet = (): UseWalletReturn => {
  // Data states
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [monthlyEarnings, setMonthlyEarnings] = useState<MonthlyEarning[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Fetch all wallet data
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        balanceData,
        transactionsData,
        summaryData,
        monthlyData,
        trendDataRes
      ] = await Promise.all([
        walletService.getBalance(),
        walletService.getTransactions(),
        walletService.getEarningsSummary(),
        walletService.getMonthlyEarnings(),
        walletService.getEarningsTrend()
      ]);

      setBalance(balanceData);
      setTransactions(transactionsData);
      setSummary(summaryData);
      setMonthlyEarnings(monthlyData);
      setTrendData(trendDataRes);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wallet data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Claim rewards
  const claimRewards = useCallback(async () => {
    try {
      setClaiming(true);
      setError(null);
      
      await walletService.claimRewards();
      
      // Refresh data after claiming
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to claim rewards');
      throw err;
    } finally {
      setClaiming(false);
    }
  }, [fetchAllData]);

  // Withdraw funds
  const withdraw = useCallback(async (request: WithdrawRequest) => {
    try {
      setWithdrawing(true);
      setError(null);
      
      await walletService.withdraw(request);
      
      // Refresh data after withdrawal
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to process withdrawal');
      throw err;
    } finally {
      setWithdrawing(false);
    }
  }, [fetchAllData]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    balance,
    transactions,
    summary,
    monthlyEarnings,
    trendData,
    loading,
    claiming,
    withdrawing,
    error,
    fetchAllData,
    claimRewards,
    withdraw,
    clearError
  };
};

export default useWallet;