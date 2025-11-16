import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Wifi, Users, Zap, Gift, Home, DollarSign, Settings, RefreshCw, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { getHotspots, deleteHotspot, type Hotspot } from "@/api/services/hotspotService";
import EditHotspotModal from "@/components/EditHotspotModal";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState('day');
  const { theme } = useApp();
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  
  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotspotToDelete, setHotspotToDelete] = useState<Hotspot | null>(null);

  const fetchHotspots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHotspots();
      setHotspots(data);
      console.log("Fetched hotspots:", data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching hotspots:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (hotspot: Hotspot) => {
    console.log("Opening delete dialog for:", hotspot.name);
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
    console.log("Opening edit modal for:", hotspot.name);
    setSelectedHotspot(hotspot);
    setEditModalOpen(true);
  };

  const handleEditSuccess = (updatedHotspot: Hotspot) => {
    console.log("Hotspot updated:", updatedHotspot);
    setHotspots((prev) =>
      prev.map((h) => (h._id === updatedHotspot._id ? updatedHotspot : h))
    );
  };

  useEffect(() => {
    fetchHotspots();

    // Listen for hotspot creation events from the modal
    const handleHotspotCreated = (event: CustomEvent) => {
      console.log("New hotspot created:", event.detail);
      fetchHotspots(); // Refetch all hotspots
    };

    window.addEventListener('hotspotCreated', handleHotspotCreated as EventListener);

    return () => {
      window.removeEventListener('hotspotCreated', handleHotspotCreated as EventListener);
    };
  }, []);

  // Calculate real stats from hotspots
  const activeHotspotsCount = hotspots.filter((h) => h.status === "online").length;
  const totalEarnings = hotspots.reduce((sum, h) => sum + h.totalEarnings, 0);
  const totalBandwidth = hotspots.reduce((sum, h) => sum + h.totalBandwidthUsed, 0);
  const avgUptime = hotspots.length > 0 
    ? ((activeHotspotsCount / hotspots.length) * 100).toFixed(1)
    : "0";

  const topStats = [
    {
      label: "Active Hotspots",
      icon: Wifi,
      value: activeHotspotsCount.toString(),
      sublabel: hotspots.length > 0 ? `${((activeHotspotsCount / hotspots.length) * 100).toFixed(1)}%` : "0%"
    },
    {
      label: "Average Uptime",
      icon: TrendingUp,
      value: `${avgUptime}%`,
      sublabel: "|1.2% "  
    },
    {
      label: "Connected Users",
      icon: Users,
      value: "1,284",
      sublabel: "|12.5"
    },
    {
      label: "Avg. Speed",
      icon: Zap,
      value: "125 Mbps",
      sublabel: "|8.2"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Edit Modal */}
      <EditHotspotModal
        isOpen={editModalOpen}
        onClose={() => {
          console.log("Closing edit modal");
          setEditModalOpen(false);
          setSelectedHotspot(null);
        }}
        onSuccess={handleEditSuccess}
        hotspot={selectedHotspot}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          console.log("Closing delete dialog");
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
                  <p className={`text-xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <h3 className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.value}
                    </h3>
                    {stat.sublabel && <span className="text-xl text-green-500">{stat.sublabel}</span>}
                  </div>
                </div>
                <stat.icon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Overview */}
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
                {['Day', 'Week', 'Month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? theme === 'dark'
                          ? 'bg-white text-black'
                          : 'bg-gray-900 text-white'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:bg-gray-900'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 700 280">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Y-axis labels */}
                {[0, 300, 600, 900, 1200, 1500].map((val, i) => (
                  <text
                    key={val}
                    x="25"
                    y={240 - i * 48}
                    fill={theme === 'dark' ? '#6b7280' : '#9ca3af'}
                    fontSize="11"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                ))}
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={240 - i * 48}
                    x2="670"
                    y2={240 - i * 48}
                    stroke={theme === 'dark' ? '#1f2937' : '#f3f4f6'}
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area under curve */}
                <path
                  d="M 50 180 
                     C 80 175, 110 170, 140 165
                     C 170 160, 200 155, 230 150
                     C 260 145, 290 140, 320 135
                     C 350 128, 380 115, 410 105
                     C 440 95, 470 88, 500 82
                     C 530 76, 560 72, 590 70
                     C 620 68, 645 67, 670 65
                     L 670 250 L 50 250 Z"
                  fill="url(#areaGradient)"
                />
                
                {/* Line */}
                <path
                  d="M 50 180 
                     C 80 175, 110 170, 140 165
                     C 170 160, 200 155, 230 150
                     C 260 145, 290 140, 320 135
                     C 350 128, 380 115, 410 105
                     C 440 95, 470 88, 500 82
                     C 530 76, 560 72, 590 70
                     C 620 68, 645 67, 670 65"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* X-axis */}
                <line
                  x1="50"
                  y1="250"
                  x2="670"
                  y2="250"
                  stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
                  strokeWidth="1"
                />
                
                {/* X-axis labels */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <text
                    key={day}
                    x={50 + i * 90}
                    y="268"
                    fill={theme === 'dark' ? '#6b7280' : '#9ca3af'}
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {day}
                  </text>
                ))}
              </svg>
            </div>
          </Card>

          {/* Rewards Distribution */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ?  'bg-[#333436] border-[#2b2b2c]'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Rewards Distribution
            </h3>
            <div className="flex items-center justify-center">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                <circle 
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  stroke={theme === 'dark' ? '#1f2937' : '#e5e7eb'} 
                  strokeWidth="20" 
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="40"
                  strokeDasharray="150 502"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray="125 502"
                  strokeDashoffset="-150"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="40"
                  strokeDasharray="100 502"
                  strokeDashoffset="-275"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray="127 502"
                  strokeDashoffset="-375"
                  transform="rotate(-90 100 100)"
                />
              </svg>
            </div>
          </Card>
        </div>

        {/* Active Hotspots Table */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ?  'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Active Hotspots
            </h3>
            <button
              onClick={fetchHotspots}
              disabled={loading}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                theme === 'dark'
                  ? 'text-blue-400 hover:bg-gray-900'
                  : 'text-blue-600 hover:bg-gray-100'
              } disabled:opacity-50`}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
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
          ) : hotspots.length === 0 ? (
            <div className="py-12 text-center">
              <Wifi
                className={`mx-auto mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                size={48}
              />
              <p className={`text-lg font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                No hotspots yet
              </p>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                Click the "+ Add Hotspot" button above to create your first hotspot
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Name
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Users
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Earnings
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hotspots.map((hotspot) => (
                    <tr 
                      key={hotspot._id}
                      className={`border-b ${
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
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          hotspot.status === 'online'
                            ? theme === 'dark'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-green-100 text-green-700'
                            : theme === 'dark'
                              ? 'bg-red-900/30 text-red-400'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            hotspot.status === 'online'
                              ? theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                              : theme === 'dark' ? 'bg-red-400' : 'bg-red-500'
                          }`}></div>
                          {hotspot.status === 'online' ? 'Active' : 'Offline'}
                        </span>
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
                          <button 
                            onClick={() => handleEdit(hotspot)}
                            className={`text-sm font-medium flex items-center gap-1 ${
                              theme === 'dark'
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(hotspot)}
                            disabled={deletingId === hotspot._id}
                            className={`text-sm font-medium flex items-center gap-1 disabled:opacity-50 ${
                              theme === 'dark'
                                ? 'text-red-400 hover:text-red-300'
                                : 'text-red-600 hover:text-red-700'
                            }`}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}