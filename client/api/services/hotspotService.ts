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
  status: 'online' | 'offline' | 'maintenance';
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

export interface HotspotResponse {
  success: boolean;
  message: string;
  hotspot: Hotspot;
}

export interface HotspotsListResponse {
  success: boolean;
  hotspots: Hotspot[];
  total: number;
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
    // Using PUT to the base hotspot endpoint with ID
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
    await apiClient.delete(ENDPOINTS.HOTSPOT.DELETE(id));
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

export default {
  getHotspots,
  createHotspot,
  updateHotspot,
  deleteHotspot,
  getHotspotById,
};