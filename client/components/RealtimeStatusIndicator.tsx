import { useState, useEffect } from "react";
import { Wifi, Users, Activity, Zap } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getHotspotRealtimeStatus, type HotspotRealtimeStatus } from "@/api/services/hotspotService";

interface RealtimeStatusIndicatorProps {
  hotspotId: string;
  hotspotName: string;
  compact?: boolean;
}

export default function RealtimeStatusIndicator({ 
  hotspotId, 
  hotspotName,
  compact = false 
}: RealtimeStatusIndicatorProps) {
  const { theme } = useApp();
  const [status, setStatus] = useState<HotspotRealtimeStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setError(null);
      const data = await getHotspotRealtimeStatus(hotspotId);
      setStatus(data);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error fetching status for ${hotspotName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [hotspotId]);

  if (loading) {
    return (
      <div className={`animate-pulse ${compact ? 'h-4 w-4' : 'h-8 w-8'} rounded-full ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
      }`} />
    );
  }

  if (error || !status) {
    return (
      <div className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-gray-500`} 
           title="Status unavailable" />
    );
  }

  if (compact) {
    return (
      <div 
        className={`w-2 h-2 rounded-full ${status.online ? 'bg-green-500' : 'bg-red-500'} ${
          status.online ? 'animate-pulse' : ''
        }`}
        title={status.online ? `Online - ${status.connectedUsers} users` : 'Offline'}
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <div className="relative">
        <Wifi className={`w-5 h-5 ${status.online ? 'text-green-500' : 'text-red-500'}`} />
        {status.online && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {status.online ? 'Online' : 'Offline'}
          </span>
          {status.online && (
            <>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {status.connectedUsers} users
              </span>
            </>
          )}
        </div>
        {status.online && (
          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {status.currentBandwidth.toFixed(1)} Mbps • Uptime: {Math.floor(status.uptime / 60)}h
          </div>
        )}
      </div>
    </div>
  );
}