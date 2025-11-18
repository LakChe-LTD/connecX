import { useState, useEffect } from "react";
import { X, Wifi, RefreshCw, Search, CheckCircle, MapPin } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getAvailableHotspots, type AvailableHotspot } from "@/api/services/hotspotService";

interface DeviceDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (macAddress: string, model: string, deviceInfo: AvailableHotspot) => void;
}

export default function DeviceDiscoveryModal({ isOpen, onClose, onSelect }: DeviceDiscoveryModalProps) {
  const { theme } = useApp();
  const [hotspots, setHotspots] = useState<AvailableHotspot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<AvailableHotspot | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualMAC, setManualMAC] = useState("");

  const scanHotspots = async () => {
    setLoading(true);
    setError(null);

    try {
      const availableHotspots = await getAvailableHotspots();
      setHotspots(availableHotspots);
      
      if (availableHotspots.length === 0) {
        setError("No devices found. Try manual entry.");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error scanning hotspots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      scanHotspots();
    }
  }, [isOpen]);

  const handleSelectHotspot = () => {
    if (manualMode) {
      if (manualMAC) {
        onSelect(manualMAC, "Manual Entry", { name: "Manual Entry", ssid: manualMAC });
        onClose();
      }
    } else {
      if (selectedHotspot) {
        const macAddress = selectedHotspot.hardware?.macAddress || selectedHotspot.ssid;
        const model = selectedHotspot.hardware?.model || "Unknown Model";
        onSelect(macAddress, model, selectedHotspot);
        onClose();
      }
    }
  };

  const getSignalStrength = (strength?: number) => {
    if (!strength) return 3;
    // Signal strength in dBm: -30 (excellent) to -90 (very weak)
    if (strength >= -40) return 5;
    if (strength >= -50) return 4;
    if (strength >= -60) return 3;
    if (strength >= -70) return 2;
    return 1;
  };

  const getSignalLabel = (strength?: number) => {
    if (!strength) return 'Unknown';
    if (strength >= -40) return 'Excellent';
    if (strength >= -50) return 'Good';
    if (strength >= -60) return 'Fair';
    if (strength >= -70) return 'Weak';
    return 'Very Weak';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500 bg-opacity-10">
              <Search className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Discover Hotspots
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Select a nearby hotspot or enter MAC manually
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scanHotspots}
              disabled={loading}
              className={`p-2 rounded-lg transition ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              } disabled:opacity-50`}
              title="Rescan"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Toggle Mode */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setManualMode(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                !manualMode
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Scan Nearby
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                manualMode
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual Entry
            </button>
          </div>

          {/* Auto-Discover Mode */}
          {!manualMode && (
            <div className="space-y-4">
              {loading && hotspots.length === 0 && (
                <div className="text-center py-8">
                  <RefreshCw className={`animate-spin h-10 w-10 mx-auto mb-3 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Scanning for hotspots...
                  </p>
                </div>
              )}

              {error && hotspots.length === 0 && (
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {error}
                  </p>
                </div>
              )}

              {hotspots.length > 0 && (
                <>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Found {hotspots.length} hotspot{hotspots.length !== 1 ? 's' : ''}:
                  </p>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {hotspots.map((hotspot, index) => {
                      const signalBars = getSignalStrength(hotspot.signalStrength);
                      const signalLabel = getSignalLabel(hotspot.signalStrength);
                      const isSelected = selectedHotspot === hotspot;
                      
                      return (
                        <button
                          key={hotspot.id || hotspot._id || index}
                          onClick={() => setSelectedHotspot(hotspot)}
                          className={`w-full p-4 rounded-lg border-2 transition text-left ${
                            isSelected
                              ? theme === 'dark'
                                ? 'border-blue-500 bg-blue-900/20'
                                : 'border-blue-500 bg-blue-50'
                              : theme === 'dark'
                                ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                            }`}>
                              <Wifi className={`w-6 h-6 ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {hotspot.name}
                                </h4>
                                {isSelected && (
                                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                )}
                              </div>

                              <p className={`text-sm mb-2 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                SSID: {hotspot.ssid}
                              </p>

                              {hotspot.hardware && (
                                <p className={`text-xs font-mono mb-2 ${
                                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                }`}>
                                  MAC: {hotspot.hardware.macAddress}
                                </p>
                              )}

                              {hotspot.location && (
                                <div className={`flex items-center gap-1 text-xs mb-2 ${
                                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                                }`}>
                                  <MapPin className="w-3 h-3" />
                                  {hotspot.location.city}, {hotspot.location.state}
                                </div>
                              )}

                              <div className="flex items-center gap-4 text-xs">
                                {/* Signal Strength */}
                                {hotspot.signalStrength && (
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((bar) => (
                                      <div
                                        key={bar}
                                        className={`w-1 rounded-full transition ${
                                          bar <= signalBars
                                            ? signalBars >= 4 ? 'bg-green-500' : signalBars >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                            : theme === 'dark'
                                              ? 'bg-gray-700'
                                              : 'bg-gray-300'
                                        }`}
                                        style={{ height: `${bar * 3}px` }}
                                      />
                                    ))}
                                    <span className={`ml-1 ${
                                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {signalLabel}
                                    </span>
                                  </div>
                                )}

                                {/* Status Badge */}
                                {hotspot.status && (
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    hotspot.status === 'available'
                                      ? 'bg-green-100 text-green-700'
                                      : hotspot.status?.toLowerCase() === 'offline'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {hotspot.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Manual Mode */}
          {manualMode && (
            <div className="space-y-4">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter the MAC address of your hotspot device manually:
              </p>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  MAC Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualMAC}
                  onChange={(e) => setManualMAC(e.target.value)}
                  placeholder="00:11:22:33:44:55"
                  className={`w-full px-4 py-3 rounded-lg border font-mono text-lg transition ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Format: XX:XX:XX:XX:XX:XX
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                  💡 Tip: You can find the MAC address on your device's label or in its settings.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between gap-4 px-6 py-4 border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSelectHotspot}
            disabled={!selectedHotspot && !manualMAC}
            className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {manualMode ? "Continue with MAC" : "Select Hotspot"}
          </button>
        </div>
      </div>
    </div>
  );
}