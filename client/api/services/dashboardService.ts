// client/src/api/services/dashboardService.ts
import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface DashboardCardsData {
  onlineHotspots: number;
  onlineChange: number;
  averageUptime: number;
  totalEarnings: number;
  offlineHotspots: number;
}

/**
 * Fetch dashboard cards data
 */
export const getDashboardCards = async (): Promise<DashboardCardsData> => {
  try {
    const response = await apiClient.get<DashboardCardsData>(ENDPOINTS.DASHBOARD.CARDS);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching dashboard cards:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard cards');
  }
};

export default {
  getDashboardCards,
};