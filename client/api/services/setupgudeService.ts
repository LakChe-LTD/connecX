// client/src/api/services/setupGuideService.ts
import { apiClient } from '../client';
import { ENDPOINTS, buildQueryString } from '../endpoints';

export interface Device {
  id: string;
  name: string;
  mac_address: string;
  signal_strength: string;
  status: string;
  firmware_version: string;
}

export const setupGuideService = {
  /**
   * Get available devices for a specific user by email
   * @param email - User's email address
   */
  getAvailableDevices: async (email: string): Promise<Device[]> => {
    try {
      console.log('📡 Fetching devices for email:', email);
      console.log('📡 Calling endpoint:', ENDPOINTS.DEVICES.AVAILABLE);
      
      // Send email as query parameter
      const response = await apiClient.get<{
        success: boolean;
        data: {
          devices: Device[];
        };
      }>(`${ENDPOINTS.DEVICES.AVAILABLE}?email=${encodeURIComponent(email)}`);
      
      console.log('✅ Response:', response.data);
      
      return response.data.data.devices;
    } catch (error) {
      console.error('❌ Service Error:', error);
      throw error;
    }
  },




  connectDevice: async (deviceId, userId) => {
    try {
      const response = await fetch(ENDPOINTS.DEVICES.CONNECT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          device_id: deviceId,
          user_id: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          response: {
            status: response.status,
            data: errorData
          }
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Connect device error:', error);
      throw error;
    }
  },





  scanNetworks: async (deviceId, sessionId) => {
    try {
      const url = new URL(ENDPOINTS.NETWORKS.SCAN);
      url.searchParams.append('device_id', deviceId);
      url.searchParams.append('session_id', sessionId);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          response: {
            status: response.status,
            data: errorData
          }
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Scan networks error:', error);
      throw error;
    }
  },

   /**
 * Configure network connection
 */
configureNetwork: async (deviceId, sessionId, networkConfig) => {
  try {
    const payload: any = {
      device_id: deviceId,
      session_id: sessionId,
      ssid: networkConfig.ssid,
      password: networkConfig.password,
      connection_type: networkConfig.connectionType
    };

    // Add static IP config if using static
    if (networkConfig.connectionType === 'static' && networkConfig.staticConfig) {
      payload.static_config = {
        ip_address: networkConfig.staticConfig.ip,
        subnet_mask: networkConfig.staticConfig.subnet,
        gateway: networkConfig.staticConfig.gateway,
        dns_primary: networkConfig.staticConfig.dns1,
        dns_secondary: networkConfig.staticConfig.dns2
      };
    }

      const response = await fetch(ENDPOINTS.NETWORKS.CONFIGURE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          response: {
            status: response.status,
            data: errorData
          }
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Configure network error:', error);
      throw error;
    }
  }


};

export default setupGuideService;