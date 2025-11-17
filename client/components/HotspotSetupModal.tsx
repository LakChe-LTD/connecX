import { useState } from "react";
import { X, Wifi, CheckCircle, Loader, AlertCircle, Play } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

interface HotspotSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (hotspot: any) => void;
  hotspot: any;
}

type SetupStep = "input" | "starting" | "firmware" | "completing" | "success" | "error";

export default function HotspotSetupModal({ isOpen, onClose, onSuccess, hotspot }: HotspotSetupModalProps) {
  const { theme } = useApp();
  const [setupCode, setSetupCode] = useState("");
  const [firmwareVersion, setFirmwareVersion] = useState("");
  const [step, setStep] = useState<SetupStep>("input");
  const [error, setError] = useState<string | null>(null);
  const [hotspotId, setHotspotId] = useState<string | null>(null);
  const [updatedHotspot, setUpdatedHotspot] = useState<any>(null);

  const handleClose = () => {
    setSetupCode("");
    setFirmwareVersion("");
    setStep("input");
    setError(null);
    setHotspotId(null);
    setUpdatedHotspot(null);
    onClose();
  };

  const startSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep("starting");

    try {
      const response = await apiClient.post(`${ENDPOINTS.HOTSPOT.LIST}/setup/start`, {
        setupCode: setupCode.trim(),
      });

      if (response.data.success) {
        setHotspotId(response.data.hotspotId);
        
        // Move to firmware input step
        setTimeout(() => {
          setStep("firmware");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to start setup");
      setStep("error");
    }
  };

  const completeSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep("completing");

    try {
      const response = await apiClient.post(`${ENDPOINTS.HOTSPOT.LIST}/setup/complete`, {
        setupCode: setupCode.trim(),
        firmwareVersion: firmwareVersion.trim(),
      });

      if (response.data.success) {
        setUpdatedHotspot(response.data.hotspot);
        setStep("success");
        
        // Call success callback and close after 2 seconds
        setTimeout(() => {
          onSuccess?.(response.data.hotspot);
          handleClose();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to complete setup");
      setStep("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 ${
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
              <Wifi className="text-blue-500" size={24} />
            </div>
            <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {step === "firmware" ? "Configure Firmware" : "Start Hotspot Setup"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={step === "starting" || step === "completing"}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Input Setup Code */}
          {step === "input" && (
            <form onSubmit={startSetup} className="space-y-4">
              <div>
                <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Enter the setup code from your hotspot device to begin activation.
                </p>
                
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Setup Code (MAC Address) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={setupCode}
                  onChange={(e) => setSetupCode(e.target.value)}
                  placeholder="00:11:22:33:44:55"
                  className={`w-full px-4 py-3 rounded-lg border font-mono text-lg transition ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <p className={`mt-2 text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  Format: XX:XX:XX:XX:XX:XX
                </p>
              </div>

              {hotspot && (
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                  <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Setting up: {hotspot.name}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {hotspot.location?.city}, {hotspot.location?.state}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Start Setup
              </button>
            </form>
          )}

          {/* Step 2: Starting */}
          {step === "starting" && (
            <div className="py-8 text-center">
              <Loader className={`animate-spin h-12 w-12 mx-auto mb-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
              <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Starting Setup...
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Connecting to your hotspot device
              </p>
            </div>
          )}

          {/* Step 3: Firmware Input */}
          {step === "firmware" && (
            <form onSubmit={completeSetup} className="space-y-4">
              <div>
                <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Setup initiated successfully! Now enter the firmware version to complete activation.
                </p>
                
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Firmware Version <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firmwareVersion}
                  onChange={(e) => setFirmwareVersion(e.target.value)}
                  placeholder="e.g., 2.1.3"
                  className={`w-full px-4 py-3 rounded-lg border font-mono text-lg transition ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <p className={`mt-2 text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  Format: X.X.X (e.g., 2.1.3)
                </p>
              </div>

              <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 mt-0.5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                      Setup Code Verified
                    </p>
                    <p className={`text-xs mt-1 font-mono ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
                      {setupCode}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Complete Setup
              </button>
            </form>
          )}

          {/* Step 4: Completing */}
          {step === "completing" && (
            <div className="py-8 text-center">
              <div className="relative">
                <Loader className={`animate-spin h-12 w-12 mx-auto mb-4 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wifi className={`h-6 w-6 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Completing Setup...
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Finalizing configuration and activating hotspot
              </p>
              <div className="mt-4 space-y-2">
                <div className={`h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                  <div className="h-full bg-green-500 animate-pulse" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === "success" && (
            <div className="py-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500 animate-in zoom-in duration-300" />
              <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Setup Complete!
              </h3>
              <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Your hotspot is now online and ready to use
              </p>
              {updatedHotspot && (
                <div className="space-y-2">
                  <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-green-900/20" : "bg-green-100"}`}>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                      {updatedHotspot.name}
                    </p>
                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
                      Status: {updatedHotspot.status}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                    <p className={`text-xs font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      ID: {updatedHotspot._id}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Step */}
          {step === "error" && (
            <div className="py-8 text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
              <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Setup Failed
              </h3>
              <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {error || "An error occurred during setup"}
              </p>
              <button
                onClick={() => {
                  setStep("input");
                  setError(null);
                  setSetupCode("");
                  setFirmwareVersion("");
                }}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  theme === "dark"
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}