// client/src/services/hotspotService.ts
import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';

export interface Hotspot {
  _id: string;
  user: string;
  name: string;
  ssid: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  bandwidthLimit: number;
  maxConnections: number;
  hardware: {
    model: string;
    macAddress: string;
  };
  status: string;
  totalBandwidthUsed: number;
  totalEarnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHotspotData {
  name: string;
  ssid: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  bandwidthLimit: number;
  maxConnections: number;
  hardware: {
    model: string;
    macAddress: string;
  };
}

export interface HotspotStatsDataPoint {
  month?: string; // For monthly
  week?: string; // For weekly
  day?: string; // For daily
  bandwidthUsedGB: string;
  earnings: string;
}

export interface HotspotStatsResponse {
  success: boolean;
  hotspotId: string;
  range: 'daily' | 'weekly' | 'monthly';
  stats: HotspotStatsDataPoint[];
}

export interface HotspotRealtimeStatusResponse {
  success: boolean;
  id: string;
  name: string;
  status: string;
}

export interface AvailableHotspot {
  id?: string;
  name: string;
  ssid: string;
  signalStrength?: number;
  status?: string;
  // Full hotspot object if it's already created
  _id?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  hardware?: {
    model: string;
    macAddress: string;
  };
  bandwidthLimit?: number;
  maxConnections?: number;
  totalBandwidthUsed?: number;
  totalEarnings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AvailableHotspotsResponse {
  success: boolean;
  message: string;
  hotspots: AvailableHotspot[];
}

export interface HotspotResponse {
  success: boolean;
  message: string;
  hotspot: Hotspot;
}

export interface HotspotsListResponse {
  success: boolean;
  hotspots: Hotspot[];
  total?: number;
}

/**
 * Fetch all hotspots for the authenticated user
 */
export const getHotspots = async (): Promise<Hotspot[]> => {
  try {
    const response = await apiClient.get<HotspotsListResponse>(ENDPOINTS.HOTSPOT.LIST);
    return response.data.hotspots || [];
  } catch (error: any) {
    console.error('Error fetching hotspots:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotspots');
  }
};

/**
 * Create a new hotspot
 */
export const createHotspot = async (data: CreateHotspotData): Promise<Hotspot> => {
  try {
    const response = await apiClient.post<HotspotResponse>(ENDPOINTS.HOTSPOT.LIST, data);
    return response.data.hotspot;
  } catch (error: any) {
    console.error('Error creating hotspot:', error);
    throw new Error(error.response?.data?.message || 'Failed to create hotspot');
  }
};

/**
 * Update an existing hotspot
 */
export const updateHotspot = async (id: string, data: Partial<CreateHotspotData>): Promise<Hotspot> => {
  try {
    const response = await apiClient.put<HotspotResponse>(`${ENDPOINTS.HOTSPOT.LIST}/${id}`, data);
    return response.data.hotspot;
  } catch (error: any) {
    console.error('Error updating hotspot:', error);
    throw new Error(error.response?.data?.message || 'Failed to update hotspot');
  }
};

/**
 * Delete a hotspot
 */
export const deleteHotspot = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`${ENDPOINTS.HOTSPOT.LIST}/${id}`);
  } catch (error: any) {
    console.error('Error deleting hotspot:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete hotspot');
  }
};

/**
 * Get a single hotspot by ID
 */
export const getHotspotById = async (id: string): Promise<Hotspot> => {
  try {
    const response = await apiClient.get<HotspotResponse>(`${ENDPOINTS.HOTSPOT.LIST}/${id}`);
    return response.data.hotspot;
  } catch (error: any) {
    console.error('Error fetching hotspot:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotspot');
  }
};

/**
 * Get hotspot stats (daily, weekly, or monthly)
 */
export const getHotspotStats = async (
  id: string, 
  range: 'daily' | 'weekly' | 'monthly' = 'daily'
): Promise<HotspotStatsResponse> => {
  try {
    const response = await apiClient.get<HotspotStatsResponse>(
      `${ENDPOINTS.HOTSPOT.LIST}/${id}/stats?range=${range}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching hotspot stats:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotspot stats');
  }
};

/**
 * Get real-time status of a hotspot
 */
export const getHotspotRealtimeStatus = async (id: string): Promise<HotspotRealtimeStatusResponse> => {
  try {
    const response = await apiClient.get<HotspotRealtimeStatusResponse>(
      `${ENDPOINTS.HOTSPOT.LIST}/${id}/status`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching hotspot status:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotspot status');
  }
};

/**
 * Get available hotspots for setup
 */
export const getAvailableHotspots = async (): Promise<AvailableHotspot[]> => {
  try {
    const response = await apiClient.get<AvailableHotspotsResponse>(
      `${ENDPOINTS.HOTSPOT.LIST}/setup/available`
    );
    return response.data.hotspots || [];
  } catch (error: any) {
    console.error('Error fetching available hotspots:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch available hotspots');
  }
};

/**
 * Get aggregated stats for all hotspots
 */
export const getAllHotspotsStats = async (
  range: 'daily' | 'weekly' | 'monthly' = 'daily'
): Promise<{ [hotspotId: string]: HotspotStatsResponse }> => {
  try {
    const hotspots = await getHotspots();
    const statsPromises = hotspots.map(async (hotspot) => {
      try {
        const stats = await getHotspotStats(hotspot._id, range);
        return { id: hotspot._id, stats };
      } catch (error) {
        console.error(`Failed to fetch stats for ${hotspot.name}`);
        return { id: hotspot._id, stats: null };
      }
    });

    const results = await Promise.all(statsPromises);
    
    const statsMap: { [hotspotId: string]: HotspotStatsResponse } = {};
    results.forEach(({ id, stats }) => {
      if (stats) {
        statsMap[id] = stats;
      }
    });

    return statsMap;
  } catch (error: any) {
    console.error('Error fetching all hotspots stats:', error);
    throw new Error('Failed to fetch stats for all hotspots');
  }
};

/**
 * Aggregate stats from multiple hotspots
 */
export const aggregateStats = (
  statsMap: { [hotspotId: string]: HotspotStatsResponse }
): HotspotStatsDataPoint[] => {
  const dateMap: { [period: string]: { bandwidth: number; earnings: number } } = {};

  // Aggregate data by time period
  Object.values(statsMap).forEach((statsResponse) => {
    if (!statsResponse || !statsResponse.stats) return;

    statsResponse.stats.forEach((item) => {
      const period = item.month || item.week || item.day || 'unknown';
      
      if (!dateMap[period]) {
        dateMap[period] = { bandwidth: 0, earnings: 0 };
      }
      
      dateMap[period].bandwidth += parseFloat(item.bandwidthUsedGB || '0');
      dateMap[period].earnings += parseFloat(item.earnings || '0');
    });
  });

  // Convert back to array
  const aggregated: HotspotStatsDataPoint[] = Object.entries(dateMap).map(([period, data]) => ({
    month: period, // Will work for month, week, or day
    bandwidthUsedGB: data.bandwidth.toFixed(2),
    earnings: data.earnings.toFixed(2),
  }));

  return aggregated;
};

export default {
  getHotspots,
  createHotspot,
  updateHotspot,
  deleteHotspot,
  getHotspotById,
  getHotspotStats,
  getHotspotRealtimeStatus,
  getAvailableHotspots,
  getAllHotspotsStats,
  aggregateStats,
};