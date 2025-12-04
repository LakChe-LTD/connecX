import { useState, useEffect, useMemo } from "react";
import { TrendingUp, Wifi, Users, Zap, RefreshCw, Edit, Trash2, Play, Search, DollarSign, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { 
  getHotspots, 
  deleteHotspot, 
  getHotspotRealtimeStatus,
  getAllHotspotsStats,
  aggregateStats,
  type Hotspot,
  type HotspotStatsDataPoint 
} from "@/api/services/hotspotService";
import EditHotspotModal from "@/components/EditHotspotModal";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import HotspotSetupModal from "@/components/HotspotSetupModal";
import DeviceDiscoveryModal from "@/components/DeviceDiscoveryModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const { theme } = useApp();
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Stats state
  const [statsData, setStatsData] = useState<HotspotStatsDataPoint[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  
  // Real-time status state
  const [realtimeStatuses, setRealtimeStatuses] = useState<{ [id: string]: string }>({});
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "offline" | "maintenance">("all");
  const [sortBy, setSortBy] = useState<"name" | "earnings" | "status">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotspotToDelete, setHotspotToDelete] = useState<Hotspot | null>(null);
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [hotspotToSetup, setHotspotToSetup] = useState<Hotspot | null>(null);
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);

  const fetchHotspots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHotspots();
      setHotspots(data);
      console.log("Fetched hotspots:", data);
      
      // Start real-time status polling for each hotspot
      data.forEach(hotspot => {
        fetchRealtimeStatus(hotspot._id);
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching hotspots:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealtimeStatus = async (hotspotId: string) => {
    try {
      const status = await getHotspotRealtimeStatus(hotspotId);
      setRealtimeStatuses(prev => ({
        ...prev,
        [hotspotId]: status.status
      }));
    } catch (err) {
      console.error(`Error fetching status for ${hotspotId}:`, err);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const allStats = await getAllHotspotsStats(activeTab);
      const aggregated = aggregateStats(allStats);
      setStatsData(aggregated);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotspots();
    fetchStats();

    // Auto-refresh real-time status every 30 seconds
    const statusInterval = setInterval(() => {
      hotspots.forEach(hotspot => {
        fetchRealtimeStatus(hotspot._id);
      });
    }, 30000);

    const handleHotspotCreated = (event: CustomEvent) => {
      console.log("New hotspot created:", event.detail);
      fetchHotspots();
      fetchStats();
    };

    window.addEventListener('hotspotCreated', handleHotspotCreated as EventListener);

    return () => {
      clearInterval(statusInterval);
      window.removeEventListener('hotspotCreated', handleHotspotCreated as EventListener);
    };
  }, []);

  useEffect(() => {
    fetchStats();
  }, [activeTab, hotspots.length]);

  const handleDelete = (hotspot: Hotspot) => {
    setHotspotToDelete(hotspot);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!hotspotToDelete) return;
    try {
      setDeletingId(hotspotToDelete._id);
      await deleteHotspot(hotspotToDelete._id);
      setHotspots((prev) => prev.filter((h) => h._id !== hotspotToDelete._id));
      setDeleteDialogOpen(false);
      setHotspotToDelete(null);
    } catch (err: any) {
      alert(`Failed to delete hotspot: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setEditModalOpen(true);
  };

  const handleEditSuccess = (updatedHotspot: Hotspot) => {
  setHotspots((prev) =>
    prev.map((h) => (h._id === updatedHotspot._id ? updatedHotspot : h))
  );
  
  // Update realtime status immediately for instant UI feedback
  setRealtimeStatuses((prev) => ({
    ...prev,
    [updatedHotspot._id]: updatedHotspot.status
  }));
  
  // Optionally fetch fresh status after a short delay to confirm
  setTimeout(() => {
    fetchRealtimeStatus(updatedHotspot._id);
  }, 500);
};

  const handleSetup = (hotspot: Hotspot) => {
    setHotspotToSetup(hotspot);
    setSetupModalOpen(true);
  };

  const handleSetupSuccess = (hotspot: any) => {
    fetchHotspots();
    fetchStats();
  };

  const handleAddHotspot = () => {
    setDiscoveryModalOpen(true);
  };

  const handleDeviceSelected = (macAddress: string, model: string, deviceInfo: any) => {
    // For now, just close and show create modal
    // In a full implementation, this would pre-fill the create form
    console.log("Device selected:", { macAddress, model, deviceInfo });
    setDiscoveryModalOpen(false);
    // TODO: Open create modal with pre-filled data
  };

  // Filtered and sorted hotspots
  const filteredHotspots = useMemo(() => {
    let filtered = [...hotspots];

    if (statusFilter !== "all") {
      filtered = filtered.filter((h) => {
        const status = realtimeStatuses[h._id] || h.status;
        return status?.toLowerCase() === statusFilter;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.location.city.toLowerCase().includes(query) ||
          h.location.state.toLowerCase().includes(query) ||
          h.ssid.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "earnings") {
        comparison = a.totalEarnings - b.totalEarnings;
      } else if (sortBy === "status") {
        const statusA = realtimeStatuses[a._id] || a.status;
        const statusB = realtimeStatuses[b._id] || b.status;
        comparison = statusA.localeCompare(statusB);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [hotspots, statusFilter, searchQuery, sortBy, sortOrder, realtimeStatuses]);

  // Calculate stats
  const stats = useMemo(() => {
    const online = Object.values(realtimeStatuses).filter(
      (status) => status?.toLowerCase() === "online"
    ).length;
    const offline = Object.values(realtimeStatuses).filter(
      (status) => status?.toLowerCase() === "offline"
    ).length;
    const maintenance = Object.values(realtimeStatuses).filter(
      (status) => status?.toLowerCase() === "maintenance"
    ).length;
    const totalEarnings = hotspots.reduce((sum, h) => sum + h.totalEarnings, 0);
    const avgUptime = hotspots.length > 0 ? ((online / hotspots.length) * 100).toFixed(1) : "0";

    return { online, offline, maintenance, totalEarnings, avgUptime, total: hotspots.length };
  }, [hotspots, realtimeStatuses]);

  const topStats = [
    {
      label: "Online Hotspots",
      icon: Wifi,
      value: `${stats.online}/${stats.total}`,
      sublabel: `${stats.avgUptime}% uptime`,
      color: "green"
    },
    {
      label: "Average Uptime",
      icon: TrendingUp,
      value: `${stats.avgUptime}%`,
      sublabel: "+1.2% this week",
      color: "blue"
    },
    {
      label: "Total Earnings",
      icon: DollarSign,
      value: `$${stats.totalEarnings.toFixed(2)}`,
      sublabel: `From ${stats.total} hotspots`,
      color: "yellow"
    },
    {
      label: "Offline Hotspots",
      icon: Zap,
      value: stats.offline.toString(),
      sublabel: stats.offline > 0 ? "Need setup" : "All active",
      color: "red"
    }
  ];

  const toggleSort = (column: "name" | "earnings" | "status") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Prepare chart data
  const chartData = statsData.map(item => ({
    name: item.month || item.week || item.day || '',
    bandwidth: parseFloat(item.bandwidthUsedGB),
    earnings: parseFloat(item.earnings)
  }));

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Modals */}
      <DeviceDiscoveryModal
        isOpen={discoveryModalOpen}
        onClose={() => setDiscoveryModalOpen(false)}
        onSelect={handleDeviceSelected}
      />
      
      <HotspotSetupModal
        isOpen={setupModalOpen}
        onClose={() => {
          setSetupModalOpen(false);
          setHotspotToSetup(null);
        }}
        onSuccess={handleSetupSuccess}
        hotspot={hotspotToSetup}
      />

      <EditHotspotModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedHotspot(null);
        }}
        onSuccess={handleEditSuccess}
        hotspot={selectedHotspot}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setHotspotToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Hotspot"
        message="Are you sure you want to delete this hotspot?"
        itemName={hotspotToDelete?.name}
        loading={!!deletingId}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topStats.map((stat, idx) => (
            <Card key={idx} className={`p-6 ${
              theme === 'dark' 
                ?  'bg-[#333436] border-[#2b2b2c]'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.value}
                    </h3>
                  </div>
                  <p className={`text-xs mt-1 ${
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'red' && stats.offline > 0 ? 'text-red-500' :
                    'text-gray-500'
                  }`}>
                    {stat.sublabel}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-500/10' :
                  stat.color === 'blue' ? 'bg-blue-500/10' :
                  stat.color === 'yellow' ? 'bg-yellow-500/10' :
                  'bg-red-500/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'yellow' ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Overview with Real Data */}
          <Card className={`lg:col-span-2 p-6 ${
            theme === 'dark' 
              ?  'bg-[#333436] border-[#2b2b2c]'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Performance Overview
              </h3>
              <div className="flex gap-2">
                {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize ${
                      activeTab === tab
                        ? theme === 'dark'
                          ? 'bg-white text-black'
                          : 'bg-gray-900 text-white'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:bg-gray-900'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab === 'daily' ? 'Day' : tab === 'weekly' ? 'Week' : 'Month'}
                  </button>
                ))}
              </div>
            </div>
            
            {statsLoading ? (
              <div className="h-64 flex items-center justify-center">
                <RefreshCw className={`animate-spin h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorBandwidth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#6b7280' : '#9ca3af'}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#6b7280' : '#9ca3af'}
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                      border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                    formatter={(value: any) => [`${parseFloat(value).toFixed(2)} GB`, 'Bandwidth']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bandwidth" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBandwidth)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  No stats data available
                </p>
              </div>
            )}
          </Card>

          {/* Status Distribution */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ?  'bg-[#333436] border-[#2b2b2c]'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Status Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Online
                  </span>
                </div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.online}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Offline
                  </span>
                </div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.offline}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Maintenance
                  </span>
                </div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.maintenance}
                </span>
              </div>
              <div className={`pt-4 mt-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Hotspots
                  </span>
                  <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stats.total}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Hotspots Table with Filters */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ?  'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                All Hotspots
              </h3>
              <button
                onClick={fetchHotspots}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  theme === 'dark'
                    ? 'text-blue-400 hover:bg-gray-900'
                    : 'text-blue-600 hover:bg-gray-100'
                } disabled:opacity-50`}
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search by name, location, or SSID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === "all"
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter("online")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === "online"
                    ? theme === 'dark'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Online ({stats.online})
              </button>
              <button
                onClick={() => setStatusFilter("offline")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === "offline"
                    ? theme === 'dark'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Offline ({stats.offline})
              </button>
              {stats.maintenance > 0 && (
                <button
                  onClick={() => setStatusFilter("maintenance")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === "maintenance"
                      ? theme === 'dark'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Maintenance ({stats.maintenance})
                </button>
              )}
            </div>

            {searchQuery && (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Found {filteredHotspots.length} hotspot{filteredHotspots.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-500 bg-opacity-10 border border-red-500">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {loading && hotspots.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <RefreshCw className={`animate-spin h-8 w-8 mx-auto mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Loading hotspots...
                </p>
              </div>
            </div>
          ) : filteredHotspots.length === 0 ? (
            <div className="py-12 text-center">
              <Wifi
                className={`mx-auto mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                size={48}
              />
              <p className={`text-lg font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {searchQuery || statusFilter !== "all" ? "No hotspots match your filters" : "No hotspots yet"}
              </p>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Click the '+ Add Hotspot' button above to create your first hotspot"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <th 
                      onClick={() => toggleSort("name")}
                      className={`text-left py-3 px-4 text-sm font-semibold cursor-pointer hover:bg-opacity-50 ${
                        theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        {sortBy === "name" && (
                          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => toggleSort("status")}
                      className={`text-left py-3 px-4 text-sm font-semibold cursor-pointer hover:bg-opacity-50 ${
                        theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortBy === "status" && (
                          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Users
                    </th>
                    <th 
                      onClick={() => toggleSort("earnings")}
                      className={`text-left py-3 px-4 text-sm font-semibold cursor-pointer hover:bg-opacity-50 ${
                        theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Earnings
                        {sortBy === "earnings" && (
                          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotspots.map((hotspot) => {
                    const currentStatus = realtimeStatuses[hotspot._id] || hotspot.status;
                    const isOnline = currentStatus?.toLowerCase() === 'online';
                    const isOffline = currentStatus?.toLowerCase() === 'offline';
                    
                    return (
                      <tr 
                        key={hotspot._id}
                        className={`border-b transition ${
                          theme === 'dark' 
                            ? 'border-gray-900 hover:bg-gray-900' 
                            : 'border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                            }`}>
                              <Wifi className={`w-5 h-5 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <span className={`font-medium block ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {hotspot.name}
                              </span>
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                {hotspot.location.city}, {hotspot.location.state}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                              isOnline
                                ? theme === 'dark'
                                  ? 'bg-green-900/30 text-green-400'
                                  : 'bg-green-100 text-green-700'
                                : isOffline
                                  ? theme === 'dark'
                                    ? 'bg-red-900/30 text-red-400'
                                    : 'bg-red-100 text-red-700'
                                  : theme === 'dark'
                                    ? 'bg-yellow-900/30 text-yellow-400'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                isOnline
                                  ? 'bg-green-500 animate-pulse'
                                  : isOffline
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                              }`}></div>
                              {isOnline ? 'Active' : isOffline ? 'Offline' : currentStatus}
                            </span>
                            {isOnline && (
                              <Activity className="w-4 h-4 text-green-500" title="Live status" />
                            )}
                          </div>
                        </td>
                        <td className={`py-4 px-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {Math.floor(Math.random() * 200) + 50}
                        </td>
                        <td className={`py-4 px-4 font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${hotspot.totalEarnings.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            {/* Show Setup button for offline or maintenance status hotspots */}
                            {(currentStatus?.toLowerCase() === 'offline' || currentStatus?.toLowerCase() === 'maintenance') && (
                              <button 
                                onClick={() => handleSetup(hotspot)}
                                className={`text-sm font-medium flex items-center gap-1 px-2 py-1 rounded transition ${
                                  theme === 'dark'
                                    ? 'text-green-400 hover:text-green-300 hover:bg-green-900/20'
                                    : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                                }`}
                              >
                                <Play size={14} />
                                Setup
                              </button>
                            )}
                            <button 
                              onClick={() => handleEdit(hotspot)}
                              className={`text-sm font-medium flex items-center gap-1 px-2 py-1 rounded transition ${
                                theme === 'dark'
                                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20'
                                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                              }`}
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(hotspot)}
                              disabled={deletingId === hotspot._id}
                              className={`text-sm font-medium flex items-center gap-1 px-2 py-1 rounded transition disabled:opacity-50 ${
                                theme === 'dark'
                                  ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                              }`}
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}




