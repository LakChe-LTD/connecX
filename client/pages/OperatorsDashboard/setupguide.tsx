import React, { useState, useEffect } from 'react';
import { Wifi, ChevronDown, Lock, Eye, EyeOff, Shield, Check, Loader, MapPin, AlertCircle } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import setupGuideService from '@/api/services/setupgudeService'; // ✅ Correct: "setupGuide"


export default function KonnectXSetupGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [networkPassword, setNetworkPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useStatic, setUseStatic] = useState(false);
  const [devicePassword, setDevicePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [encryptionMode, setEncryptionMode] = useState('WPA3');
  const [securityToggles, setSecurityToggles] = useState({
    guestAccess: true,
    autoBan: true,
    blockSuspicious: false,
    dosProtection: true
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hotspotName, setHotspotName] = useState('');
  const [staticIP, setStaticIP] = useState({
    ip: '',
    subnet: '',
    gateway: '',
    dns1: '',
    dns2: ''
  });

  // ADD these states instead:
const [availableDevices, setAvailableDevices] = useState([]);
const [isLoadingDevices, setIsLoadingDevices] = useState(false);
const [deviceError, setDeviceError] = useState(null);


// Add these states after your existing states
const [isConnecting, setIsConnecting] = useState(false);
const [connectionError, setConnectionError] = useState(null);
const [connectionSuccess, setConnectionSuccess] = useState(false);
const [sessionId, setSessionId] = useState(null);
const [connectedAt, setConnectedAt] = useState(null);



  // Network scan states - ADD THESE
const [availableNetworks, setAvailableNetworks] = useState([]);
const [isScanning, setIsScanning] = useState(false);
const [scanError, setScanError] = useState(null);
const [scannedAt, setScannedAt] = useState(null);


// Network configuration states - ADD THESE
const [isConfiguringNetwork, setIsConfiguringNetwork] = useState(false);
const [configureError, setConfigureError] = useState(null);
const [configureSuccess, setConfigureSuccess] = useState(false);
const [networkDetails, setNetworkDetails] = useState(null);






const getUserEmail = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.email;
  }
  
  // Method 3: From auth token (decode JWT)
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email;
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
  }
  
  return null;
};




// ADD THIS FUNCTION
const getUserId = () => {
  // Method 1: From localStorage user object
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.id || user.user_id;
  }
  
  // Method 2: From auth token (decode JWT)
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload.user_id || payload.sub;
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
  }
  
  return null;
};




// In setupguide.tsx
const fetchAvailableDevices = async () => {
  setIsLoadingDevices(true);
  setDeviceError(null);
  
  try {
    // 1️⃣ GET USER EMAIL FIRST
    const email = getUserEmail();
    
    // 2️⃣ CHECK IF EMAIL EXISTS
    if (!email) {
      setDeviceError('Unable to get user email. Please log in again.');
      setIsLoadingDevices(false);
      return;
    }
    
    console.log('🔍 Fetching devices for email:', email);
    
    // 3️⃣ PASS EMAIL TO SERVICE - THIS WAS MISSING!
    const devices = await setupGuideService.getAvailableDevices(email); // ✅ Add email parameter
    console.log('✅ Devices received:', devices);
    
    // Map API response to component format
    const formattedDevices = devices.map(device => ({
      id: device.id,
      name: device.name,
      signal: capitalizeSignal(device.signal_strength),
      macAddress: device.mac_address,
      status: device.status,
      firmwareVersion: device.firmware_version,
    }));
    
    console.log('📦 Formatted devices:', formattedDevices);
    setAvailableDevices(formattedDevices);
    
  } catch (error) {
    console.error('❌ Error fetching devices:', error);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error status:', error.response?.status);
    
    let errorMessage = 'Failed to load devices. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Unauthorized. Please log in again.';
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } else if (error.response?.status === 404) {
      errorMessage = 'No devices found for your account.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response?.data?.message || 'Invalid request.';
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Is it running?';
    } else if (error.message?.includes('<!doctype')) {
      errorMessage = 'Backend endpoint not configured. Please contact support.';
    }
    
    setDeviceError(errorMessage);
  } finally {
    setIsLoadingDevices(false);
  }
};

// Helper function to capitalize signal strength
const capitalizeSignal = (signal: string): string => {
  return signal.charAt(0).toUpperCase() + signal.slice(1).toLowerCase();
};




// Add this function after fetchAvailableDevices
const handleConnectDevice = async () => {
  if (!selectedDevice) {
    setConnectionError('Please select a device first');
    return;
  }

  setIsConnecting(true);
  setConnectionError(null);
  setConnectionSuccess(false);

  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('Unable to get user ID. Please log in again.');
    }

    console.log('🔌 Connecting to device:', selectedDevice, 'for user:', userId);
    
    const response = await setupGuideService.connectDevice(selectedDevice, userId);
    
    console.log('✅ Connection response:', response);
    
    if (response.success) {
      setConnectionSuccess(true);
      setSessionId(response.data.session_id);
      setConnectedAt(response.data.connected_at);
      
      // Show success message briefly then move to next step
      setTimeout(() => {
        setCurrentStep(2);
      }, 1500);
    } else {
      throw new Error(response.error?.message || 'Connection failed');
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error);
    
    let errorMessage = 'Failed to connect to device. Please try again.';
    
    if (error.response?.status === 400) {
      const errorCode = error.response?.data?.error?.code;
      if (errorCode === 'DEVICE_UNAVAILABLE') {
        errorMessage = 'This device is no longer available. Please select another device.';
        // Refresh device list
        fetchAvailableDevices();
      } else {
        errorMessage = error.response?.data?.error?.message || 'Invalid request.';
      }
    } else if (error.response?.status === 401) {
      errorMessage = 'Your session has expired. Please log in again.';
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } else if (error.response?.status === 404) {
      errorMessage = 'Device not found. Please refresh and try again.';
      fetchAvailableDevices();
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setConnectionError(errorMessage);
  } finally {
    setIsConnecting(false);
  }
};




// Network scan handler
const handleScanNetworks = async () => {
  if (!selectedDevice || !sessionId) {
    setScanError('Missing device or session information. Please reconnect.');
    return;
  }

  setIsScanning(true);
  setScanError(null);

  try {
    console.log('📡 Scanning networks for device:', selectedDevice, 'session:', sessionId);
    
    const response = await setupGuideService.scanNetworks(selectedDevice, sessionId);
    
    console.log('✅ Scan response:', response);
    
    if (response.success && response.data.networks) {
      const formattedNetworks = response.data.networks.map(network => ({
        ssid: network.ssid,
        bssid: network.bssid,
        secured: network.secured,
        securityType: network.security_type,
        signal: network.signal_strength,
        frequency: network.frequency,
        channel: network.channel
      }));
      
      setAvailableNetworks(formattedNetworks);
      setScannedAt(response.data.scanned_at);
      console.log('📶 Networks found:', formattedNetworks.length);
    } else {
      throw new Error('No networks found in response');
    }
    
  } catch (error) {
    console.error('❌ Network scan error:', error);
    
    let errorMessage = 'Failed to scan networks. Please try again.';
    
    if (error.response?.status === 400) {
      errorMessage = error.response?.data?.error?.message || 'Invalid device or session.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Session expired. Please reconnect your device.';
      setTimeout(() => {
        setCurrentStep(1);
      }, 2000);
    } else if (error.response?.status === 404) {
      errorMessage = 'Device not found. Please reconnect.';
      setTimeout(() => {
        setCurrentStep(1);
      }, 2000);
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setScanError(errorMessage);
  } finally {
    setIsScanning(false);
  }
};





// Network configuration handler
const handleConfigureNetwork = async () => {
  if (!selectedDevice || !sessionId) {
    setConfigureError('Missing device or session information. Please reconnect.');
    return;
  }

  if (!selectedNetwork) {
    setConfigureError('Please select a network first.');
    return;
  }

  if (selectedNetwork.secured && !networkPassword) {
    setConfigureError('Please enter the network password.');
    return;
  }

  // Validate static IP fields if static is selected
  if (useStatic) {
    if (!staticIP.ip || !staticIP.subnet || !staticIP.gateway || !staticIP.dns1) {
      setConfigureError('Please fill in all required static IP fields.');
      return;
    }
  }

  setIsConfiguringNetwork(true);
  setConfigureError(null);
  setConfigureSuccess(false);

  try {
    console.log('🔧 Configuring network:', selectedNetwork.ssid);
    
    const networkConfig: any = {
  ssid: selectedNetwork.ssid,
  password: networkPassword,
  connectionType: useStatic ? 'static' : 'dhcp'
};

// Add static config if needed
if (useStatic) {
  networkConfig.staticConfig = {
    ip: staticIP.ip,
    subnet: staticIP.subnet,
    gateway: staticIP.gateway,
    dns1: staticIP.dns1,
    dns2: staticIP.dns2 || ''
  };
}

    const response = await setupGuideService.configureNetwork(
      selectedDevice, 
      sessionId, 
      networkConfig
    );
    
    console.log('✅ Configure response:', response);
    
    if (response.success) {
      setConfigureSuccess(true);
      setNetworkDetails(response.data);
      
      // Show success message briefly then move to next step
      setTimeout(() => {
        setCurrentStep(3);
      }, 2000);
    } else {
      throw new Error(response.error?.message || 'Network configuration failed');
    }
    
  } catch (error) {
    console.error('❌ Network configuration error:', error);
    
    let errorMessage = 'Failed to configure network. Please try again.';
    
    if (error.response?.status === 401) {
      const errorCode = error.response?.data?.error?.code;
      if (errorCode === 'INVALID_PASSWORD') {
        errorMessage = 'Incorrect network password. Please try again.';
      } else {
        errorMessage = 'Session expired. Please reconnect your device.';
        setTimeout(() => {
          setCurrentStep(1);
        }, 2000);
      }
    } else if (error.response?.status === 400) {
      errorMessage = error.response?.data?.error?.message || 'Invalid network configuration.';
    } else if (error.response?.status === 404) {
      errorMessage = 'Network not found. Please rescan.';
    } else if (error.response?.status === 408) {
      errorMessage = 'Connection timeout. The network may be out of range.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setConfigureError(errorMessage);
  } finally {
    setIsConfiguringNetwork(false);
  }
};


// Auto-scan networks when entering Step 2
useEffect(() => {
  if (currentStep === 2 && selectedDevice && sessionId && availableNetworks.length === 0) {
    handleScanNetworks();
  }
}, [currentStep, selectedDevice, sessionId]);


useEffect(() => {
  if (currentStep === 4 && !isAuthenticated) {
    // ... authentication logic
  }
}, [currentStep, isAuthenticated]);



useEffect(() => {
  fetchAvailableDevices();
}, []);

  const faqs = [
    {
      question: "How do I reset my hotspot device?",
      answer: "To reset your hotspot device, locate the reset button on the device and hold it for 10 seconds until the LED lights flash."
    },
    {
      question: "What should I do if my device isn't connecting?",
      answer: "Ensure your hotspot device is powered on and within range of your computer or mobile device."
    },
    {
      question: "How can I improve my hotspot's signal strength?",
      answer: "Place your device in an open area away from obstructions and electronic interference for optimal signal strength."
    }
  ];

  useEffect(() => {
    if (currentStep === 4 && !isAuthenticated) {
      setIsAuthenticating(true);
      const interval = setInterval(() => {
        setAuthProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAuthenticating(false);
            setIsAuthenticated(true);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [currentStep, isAuthenticated]);

  const getSignalColor = (signal) => {
    switch (signal.toLowerCase()) {
      case 'strong': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'weak': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const canContinueStep2 = () => {
    if (!selectedNetwork) return false;
    if (selectedNetwork.secured && !networkPassword) return false;
    if (useStatic) {
      return staticIP.ip && staticIP.subnet && staticIP.gateway && staticIP.dns1;
    }
    return true;
  };

  const canContinueStep3 = () => {
    if (!devicePassword || !confirmPassword) return false;
    if (devicePassword !== confirmPassword) return false;
    if (devicePassword.length < 6) return false;
    return true;
  };

  const renderStep1 = () => (
    <>
      <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Step 1: Device Connection</h2>
          <span className="text-sm text-gray-500 dark:text-gray-200">Step 1 of 4</span>
        </div>
        
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-10">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0 mt-1">
              <Wifi className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1 dark:text-gray-200">Connect Your Device</h3>
              <span className="text-sm text-gray-600 dark:text-gray-300">Next Reward: $100 Bonus</span>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                Ensure your hotspot device is powered on and within range of your computer or mobile device.
              </p>
            </div>
          </div>

          <div>
  <h4 className="text-sm font-bold text-gray-700 mb-3 dark:text-white">Available Devices</h4>
  
  {isLoadingDevices && (
    <div className="flex items-center justify-center py-8">
      <Loader className="w-6 h-6 animate-spin text-blue-600" />
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading devices...</span>
    </div>
  )}
  
  {deviceError && (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <p className="text-sm text-red-600 dark:text-red-400">{deviceError}</p>
      <button
        onClick={fetchAvailableDevices}
        className="mt-2 text-sm text-red-700 dark:text-red-300 underline"
      >
        Try again
      </button>
    </div>
  )}
  
  {!isLoadingDevices && !deviceError && availableDevices.length === 0 && (
    <p className="text-sm text-gray-500 dark:text-gray-400 py-4">No devices found</p>
  )}
  
        {!isLoadingDevices && !deviceError && availableDevices.length > 0 && (
                 <div className="space-y-2">
               {availableDevices.map((device) => (
           <div
          key={device.id}
          onClick={() => setSelectedDevice(device.id)}
          className={`border rounded-lg p-3 hover:border-blue-400 transition-colors cursor-pointer ${
            selectedDevice === device.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'
          }`}
        >
          <div className="font-medium text-gray-800 text-sm dark:text-gray-200">{device.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Signal Strength: {device.signal}</div>
        </div>
      ))}
    </div>
  )}
</div>
        </div>

{connectionError && (
  <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
    <div className="flex items-start gap-2">
      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">Connection Failed</p>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{connectionError}</p>
      </div>
    </div>
  </div>
)}

{connectionSuccess && (
  <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
    <div className="flex items-start gap-2">
      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Successfully Connected!</p>
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">Proceeding to network setup...</p>
      </div>
    </div>
  </div>
)}

<button
  onClick={handleConnectDevice}
  disabled={!selectedDevice || isConnecting || connectionSuccess}
  className="bg-black text-gray-200 px-6 py-2.5 rounded text-sm font-medium dark:bg-blue-600 dark:text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isConnecting ? (
    <>
      <Loader className="w-4 h-4 animate-spin" />
      Connecting...
    </>
  ) : connectionSuccess ? (
    <>
      <Check className="w-4 h-4" />
      Connected
    </>
  ) : (
    <>
      Continue to Network Setup
      <span>→</span>
    </>
  )}
</button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Step 2: Network Configuration</h2>
          <span className="text-sm text-gray-500 dark:text-gray-200">Step 2 of 4</span>
        </div>
        
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-10">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0 mt-1">
              <Wifi className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1 dark:text-gray-200">Select Wi-Fi Network</h3>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                Choose a network and configure connection settings for your hotspot.
              </p>
            </div>
          </div>

         <div className="mb-6">
  <div className="flex items-center justify-between mb-3">
    <h4 className="text-sm font-bold text-gray-700 dark:text-white">Available Networks</h4>
    <button
      onClick={handleScanNetworks}
      disabled={isScanning}
      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
    >
      {isScanning ? (
        <>
          <Loader className="w-3 h-3 animate-spin" />
          Scanning...
        </>
      ) : (
        <>
          <Wifi className="w-3 h-3" />
          Refresh
        </>
      )}
    </button>
  </div>

  {isScanning && availableNetworks.length === 0 && (
    <div className="flex items-center justify-center py-8 border border-gray-200 dark:border-gray-600 rounded-lg">
      <Loader className="w-6 h-6 animate-spin text-blue-600" />
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Scanning for networks...</span>
    </div>
  )}

  {scanError && (
    <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">Scan Failed</p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{scanError}</p>
        </div>
      </div>
    </div>
  )}

  {!isScanning && !scanError && availableNetworks.length === 0 && (
    <div className="text-center py-8 border border-gray-200 dark:border-gray-600 rounded-lg">
      <Wifi className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-500 dark:text-gray-400">No networks found</p>
      <button
        onClick={handleScanNetworks}
        className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        Scan again
      </button>
    </div>
  )}

  {!isScanning && availableNetworks.length > 0 && (
    <>
      <div className="space-y-2">
        {availableNetworks.map((network, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                  <div
                    onClick={() => setSelectedNetwork(network)}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                      selectedNetwork?.ssid === network.ssid ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {network.secured && <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                        <span className="font-medium text-gray-800 text-sm dark:text-gray-200">{network.ssid}</span>
                      </div>
                      <span className={`text-xs font-medium ${getSignalColor(network.signal)}`}>
                        {network.signal.charAt(0).toUpperCase() + network.signal.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {selectedNetwork?.ssid === network.ssid && network.secured && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Network Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={networkPassword}
                          onChange={(e) => setNetworkPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                          placeholder="Enter password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          
          {scannedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Last scanned: {new Date(scannedAt).toLocaleTimeString()}
            </p>
          )}
        </>
      )}
    </div>

    {/* 🟢 INSERT STATUS MESSAGES HERE */}
        {configureError && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Configuration Failed</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{configureError}</p>
              </div>
            </div>
          </div>
        )}

        {configureSuccess && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Network Connected!</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Connected to {selectedNetwork?.ssid}
                </p>
                {networkDetails && (
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <p>IP Address: {networkDetails.ip_address}</p>
                    <p>Gateway: {networkDetails.gateway}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


          <div className="border border-gray-200 dark:border-gray-600 rounded-lg mb-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Advanced Options</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
            
            {showAdvanced && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-600 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={useStatic}
                    onChange={(e) => setUseStatic(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">Use Static IP</label>
                </div>
                
                {useStatic && (
                  <div className="grid grid-cols-2 gap-3 pl-7">
                    <input
                      type="text"
                      placeholder="IP Address"
                      value={staticIP.ip}
                      onChange={(e) => setStaticIP({...staticIP, ip: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    />
                    <input
                      type="text"
                      placeholder="Subnet Mask"
                      value={staticIP.subnet}
                      onChange={(e) => setStaticIP({...staticIP, subnet: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    />
                    <input
                      type="text"
                      placeholder="Gateway"
                      value={staticIP.gateway}
                      onChange={(e) => setStaticIP({...staticIP, gateway: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    />
                    <input
                      type="text"
                      placeholder="DNS 1"
                      value={staticIP.dns1}
                      onChange={(e) => setStaticIP({...staticIP, dns1: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    />
                    <input
                      type="text"
                      placeholder="DNS 2 (Optional)"
                      value={staticIP.dns2}
                      onChange={(e) => setStaticIP({...staticIP, dns2: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 col-span-2"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep(1)}
            disabled={isConfiguringNetwork}
            className="px-6 py-2.5 rounded text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            onClick={handleConfigureNetwork}
            disabled={!canContinueStep2() || isConfiguringNetwork || configureSuccess}
            className="bg-black text-gray-200 px-6 py-2.5 rounded text-sm font-medium dark:bg-blue-600 dark:text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConfiguringNetwork ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Connecting to Network...
              </>
            ) : configureSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Connected
              </>
            ) : (
              <>
                Continue to Security Setup
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Step 3: Security Setup</h2>
          <span className="text-sm text-gray-500 dark:text-gray-200">Step 3 of 4</span>
        </div>
        
        <div className="mb-8 space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0 mt-1">
              <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1 dark:text-gray-200">Configure Security Settings</h3>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                Secure your hotspot device with a strong password and encryption settings.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 dark:text-white">Device Password</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={devicePassword}
                  onChange={(e) => setDevicePassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  placeholder="Re-enter password"
                />
                {confirmPassword && devicePassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 dark:text-white">Encryption Mode</h4>
            <div className="space-y-2">
              {['WPA3', 'WPA2', 'Open'].map((mode) => (
                <label key={mode} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="encryption"
                    value={mode}
                    checked={encryptionMode === mode}
                    onChange={(e) => setEncryptionMode(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{mode}</span>
                    {mode === 'WPA3' && <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Recommended)</span>}
                    {mode === 'Open' && <span className="ml-2 text-xs text-red-600 dark:text-red-400">(Not recommended)</span>}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 dark:text-white">Firewall Security</h4>
            <div className="space-y-3">
              {[
                { key: 'guestAccess', label: 'Enable guest access', info: 'Allow temporary access for guests' },
                { key: 'autoBan', label: 'Auto-ban repeated failed logins', info: 'Automatically block suspicious login attempts' },
                { key: 'blockSuspicious', label: 'Block suspicious MAC addresses', info: 'Prevent known malicious devices from connecting' },
                { key: 'dosProtection', label: 'Enable DoS protection', info: 'Protect against denial of service attacks' }
              ].map((toggle) => (
                <div key={toggle.key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800 dark:text-gray-200">{toggle.label}</span>
                    <div className="group relative">
                      <AlertCircle className="w-3 h-3 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                        {toggle.info}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securityToggles[toggle.key]}
                      onChange={(e) => setSecurityToggles({...securityToggles, [toggle.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2.5 rounded text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => canContinueStep3() && setCurrentStep(4)}
            disabled={!canContinueStep3()}
            className="bg-black text-gray-200 px-6 py-2.5 rounded text-sm font-medium dark:bg-blue-600 dark:text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Authentication
            <span>→</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderStep4 = () => (
    <>
      <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Step 4: Authentication Confirmation</h2>
          <span className="text-sm text-gray-500 dark:text-gray-200">Step 4 of 4</span>
        </div>
        
        <div className="mb-8">
          {isAuthenticating ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Loader className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                Authenticating your device...
              </h3>
              <div className="w-full max-w-md mx-auto mt-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${authProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{authProgress}%</p>
              </div>
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                      Your Hotspot is Successfully Connected!
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Device ID:</span> HSP-{selectedDevice}-{Date.now().toString().slice(-6)}
                      </p>
                      <p className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Status:</span> <span className="text-green-600 dark:text-green-400 font-bold">Online</span>
                      </p>
                      <p className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Signal Strength:</span> Excellent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 dark:text-white">Final Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hotspot Name
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={hotspotName}
                        onChange={(e) => setHotspotName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                        placeholder="Enter hotspot name"
                      />
                      <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300">
                        KonectX
                      </div>
                    </div>
                    {hotspotName && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Display name: {hotspotName} KonectX
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location (Optional)
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 cursor-pointer hover:border-blue-400">
                      <MapPin className="w-4 h-4" />
                      <span>Select location on map</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization (Optional)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                      <option>None</option>
                      <option>Personal</option>
                      <option>Business</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full bg-black text-gray-200 px-6 py-3 rounded text-sm font-medium dark:bg-blue-600 dark:text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Finish Setup → Go to Dashboard
              </button>
            </div>
          ) : null}
        </div>

        {!isAuthenticating && isAuthenticated && (
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </>
  );

  const renderProgressTracker = () => (
    <div className="bg-white dark:bg-[#333436] rounded-2xl p-6 border dark:border-gray-700 h-[330px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 dark:text-white">Setup Progress</h3>
      
      <div className="space-y-2">
        {[
          { step: 1, label: 'Device Connection' },
          { step: 2, label: 'Network Configuration' },
          { step: 3, label: 'Security Setup' },
          { step: 4, label: 'Authentication Confirmation' }
        ].map(({ step, label }) => (
          <div key={step} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              step < currentStep 
                ? 'bg-green-500' 
                : step === currentStep 
                ? 'bg-blue-600' 
                : 'bg-gray-300'
            }`}>
              {step < currentStep ? (
                <Check className="w-4 h-4 text-white" />
              ) : step === currentStep ? (
                <span className="text-xs text-white font-bold">{step}</span>
              ) : (
                <span className="text-xs text-gray-600">{step}</span>
              )}
            </div>
            <span className={`text-sm ${
              step < currentStep 
                ? 'text-green-600 dark:text-green-400 font-medium' 
                : step === currentStep 
                ? 'text-blue-600 dark:text-blue-400 font-medium' 
                : 'text-gray-500 dark:text-white'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">?</span>
          </div>
          <div className="text-xs text-gray-600">
            <span className="font-medium dark:text-white">Estimated time: 5 minutes</span>
            <div className="mt-1 dark:text-white">
              Need help? Contact support at 1-800-123-4567
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
     <>
      <Helmet>
        <title>Setup Guide | KonnectX</title>
        <meta
          name="description"
          content="Follow the KonnectX Setup Guide to easily configure your hotspots and devices. Step-by-step instructions for operators and users."
        />
        <meta
          name="keywords"
          content="KonnectX, setup guide, hotspot configuration, KXT token, operator guide, user guide"
        />
        <meta property="og:title" content="Setup Guide - KonnectX" />
        <meta
          property="og:description"
          content="Follow the KonnectX Setup Guide to easily configure your hotspots and devices. Step-by-step instructions for operators and users."
        />
      </Helmet>

    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 bg-white p-8 dark:bg-black">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {renderProgressTracker()}
      </div>

      <div className="w-full bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700 mx-8 mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`py-4 ${index !== faqs.length - 1 ? "border-b border-gray-300 dark:border-white" : ""}`}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFAQ === index && (
                <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-black border-t border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Hotspot Setup. All rights reserved.
        </div>
        <button className="bg-black dark:bg-blue-600 text-white px-4 py-1.5 rounded text-xs dark:text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
          Need Help?
        </button>
      </div>
    </div>
    </>
  );
}