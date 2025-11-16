import { useState, useEffect } from "react";
import { X, Wifi, MapPin, Settings, CheckCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { updateHotspot, type Hotspot } from "@/api/services/hotspotService";

interface EditHotspotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (hotspot: Hotspot) => void;
  hotspot: Hotspot | null;
}

export default function EditHotspotModal({ isOpen, onClose, onSuccess, hotspot }: EditHotspotModalProps) {
  const { theme } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    ssid: "",
    location: {
      latitude: 0,
      longitude: 0,
      address: "",
      city: "",
      state: "",
      country: "",
    },
    bandwidthLimit: 100,
    maxConnections: 50,
    hardware: {
      model: "",
      macAddress: "",
    },
    status: "offline" as "online" | "offline" | "maintenance",
  });

  // Load hotspot data when modal opens
  useEffect(() => {
    if (hotspot && isOpen) {
      setFormData({
        name: hotspot.name,
        ssid: hotspot.ssid,
        location: hotspot.location,
        bandwidthLimit: hotspot.bandwidthLimit,
        maxConnections: hotspot.maxConnections,
        hardware: hotspot.hardware,
        status: hotspot.status,
      });
    }
  }, [hotspot, isOpen]);

  const updateField = (path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split(".");
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      }
      const [parent, child] = keys;
      return {
        ...prev,
        [parent]: { ...(prev as any)[parent], [child]: value },
      };
    });
  };

  const handleClose = () => {
    setStep(1);
    setError(null);
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotspot) return;

    setLoading(true);
    setError(null);

    try {
      const updatedHotspot = await updateHotspot(hotspot._id, formData);
      
      setSuccess(true);
      onSuccess?.(updatedHotspot);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      console.error("Error updating hotspot:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.ssid && formData.bandwidthLimit > 0 && formData.maxConnections > 0;
      case 2:
        return formData.location.address && formData.location.city && formData.location.state && formData.location.country;
      case 3:
        return formData.hardware.model && formData.hardware.macAddress;
      default:
        return false;
    }
  };

  if (!isOpen || !hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Success Overlay */}
        {success && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-80 rounded-xl">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500 animate-in zoom-in duration-300" />
              <h3 className="text-2xl font-bold text-white mb-2">Hotspot Updated!</h3>
              <p className="text-gray-300">Your changes have been saved successfully.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Edit Hotspot
          </h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                    s === step
                      ? "bg-blue-600 text-white scale-110"
                      : s < step
                      ? "bg-green-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      s < step
                        ? "bg-green-600"
                        : theme === "dark"
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-6 max-h-96 overflow-y-auto">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="text-blue-600" size={24} />
                  <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Basic Information
                  </h3>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Hotspot Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g., Downtown Hub"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    SSID (Network Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ssid}
                    onChange={(e) => updateField("ssid", e.target.value)}
                    placeholder="e.g., MyWifi_001"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Bandwidth Limit (Mbps) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.bandwidthLimit}
                      onChange={(e) => updateField("bandwidthLimit", Number(e.target.value))}
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Max Connections <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.maxConnections}
                      onChange={(e) => updateField("maxConnections", Number(e.target.value))}
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                {/* Status Toggle */}
                <div className={`flex items-center justify-between p-4 rounded-lg border ${
                  theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"
                }`}>
                  <div>
                    <label className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Hotspot Status
                    </label>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      Current status: {formData.status}
                    </p>
                  </div>
                  <select
                    value={formData.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-blue-600" size={24} />
                  <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Location Details
                  </h3>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location.address}
                    onChange={(e) => updateField("location.address", e.target.value)}
                    placeholder="123 Main St"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location.city}
                      onChange={(e) => updateField("location.city", e.target.value)}
                      placeholder="San Francisco"
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location.state}
                      onChange={(e) => updateField("location.state", e.target.value)}
                      placeholder="CA"
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location.country}
                    onChange={(e) => updateField("location.country", e.target.value)}
                    placeholder="USA"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.location.latitude}
                      onChange={(e) => updateField("location.latitude", Number(e.target.value))}
                      placeholder="37.7749"
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.location.longitude}
                      onChange={(e) => updateField("location.longitude", Number(e.target.value))}
                      placeholder="-122.4194"
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Hardware */}
            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="text-blue-600" size={24} />
                  <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Hardware Configuration
                  </h3>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Device Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hardware.model}
                    onChange={(e) => updateField("hardware.model", e.target.value)}
                    placeholder="e.g., TP-Link AC1200"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    MAC Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hardware.macAddress}
                    onChange={(e) => updateField("hardware.macAddress", e.target.value)}
                    placeholder="00:11:22:33:44:55"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <p className={`mt-1 text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                    Format: XX:XX:XX:XX:XX:XX
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500 bg-opacity-10 border border-red-500 animate-in slide-in-from-top duration-300">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}
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
              type="button"
              onClick={step === 1 ? handleClose : prevStep}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>

            <div className="flex gap-3">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isStepValid()}
                  className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Hotspot"
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}