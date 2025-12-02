import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {  User, Heart, ShoppingCart,} from "lucide-react";
import { Helmet } from "react-helmet-async";


const HotspotRegistrationStep2 = () => {
  const { theme } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kitType: '',
    oneTimeUse: '',
    quantity: '',
    deploymentLocation: '',
    networkCoverageRadius: '',
    fullName: '',
    username: '',
    occupation: '',
    frontIdProof: null as File | null,
    backIdProof: null as File | null,
    proofOfAddress: null as File | null,
    utilityBill: null as File | null,
    selfieWithId: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (name: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigate("/dashboard/registerKitStep3");
  };

  return (
     <>
      <Helmet>
        <title>Hotspot Registration Step 2 | KonnectX</title>
        <meta
          name="description"
          content="Proceed with Step 2 of your KonnectX hotspot registration. Configure your device and network settings before activating on the decentralized network."
        />
        <meta
          name="keywords"
          content="KonnectX, hotspot registration, KXT token, step 2, device configuration, decentralized network"
        />
        <meta property="og:title" content="Hotspot Registration Step 2 - KonnectX" />
        <meta
          property="og:description"
          content="Proceed with Step 2 of your KonnectX hotspot registration. Configure your device and network settings before activating on the decentralized network."
        />
      </Helmet>
    
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Register Your Hotspot Kit</h1>
          <p className={`text-lg font-medium mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Follow these steps to register your custom hotspot hardware and start providing internet services.</p>
          <h2 className={`text-xl font-bold mb-6 mt-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Step 2 of 3 • KYC Verification</h2>
          {/* Progress Bar */}
          <div className={`flex-1 h-3 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-black'}`} style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="p-15">
          {/* Operator Verification Section */}
          <div className="mb-10">
            <h2 className={`text-2xl font-bold mb-6 pb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Operator Verification
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-1/2 px-5 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-900 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Government ID Type
                </label>
                <select
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-1/2 px-5 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white'
                      : 'bg-white border-gray-900 text-gray-900'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>

              <div>
                <label className={`block text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ID Number
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Enter your occupation"
                  className={`w-1/2 px-5 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium ${
                    theme === 'dark'
                      ? 'bg-[#333436] border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-900 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Upload Front and Back of ID */}
          <div className="mb-10">
            <h3 className={`text-2xl font-bold mb-6 pb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Upload Front and Back of ID
            </h3>

            <div className="space-y-6">
              <div className={`border-2 border-dashed p-4 rounded-lg ${theme === 'dark' ? 'bg-[#333436]' : 'border-gray-900'}`}>
                <FileUploadBox
                  label="Upload Front of ID"
                  sublabel="Only government issued documents"
                  onFileSelect={(file) => handleFileUpload('frontIdProof', file)}
                  theme={theme}
                />
              </div>

              <div className={`border-2 border-dashed p-4 rounded-lg ${theme === 'dark' ? 'bg-[#333436] border-gray-700' : 'border-gray-900'}`}>
                <FileUploadBox
                  label="Upload Back of ID"
                  sublabel="Only government issued documents"
                  onFileSelect={(file) => handleFileUpload('backIdProof', file)}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Proof of Address */}
          <div className="mb-10">
            <h3 className={`text-2xl font-bold mb-6 pb-3 ${theme === 'dark' ? 'text-white border-b-2 border-gray-800' : 'text-gray-900 border-b-2 border-gray-200'}`}>
              Proof of Address
            </h3>
            <div>
              <div className={`border-2 border-dashed p-4 rounded-lg ${theme === 'dark' ? 'bg-[#333436] border-gray-700' : 'border-gray-900'}`}>
                <FileUploadBox
                  label="Upload Utility Bill or Statement"
                  sublabel="Only government issued documents"
                  onFileSelect={(file) => handleFileUpload('proofOfAddress', file)}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Selfie for Face Match */}
          <div className="mb-10">
            <h3 className={`text-2xl font-bold mb-6 pb-3 ${theme === 'dark' ? 'text-white border-b-2 border-gray-800' : 'text-gray-900 border-b-2 border-gray-200'}`}>
              Selfie for Face Match
            </h3>
            <div>
              <div className={`border-2 border-dashed p-4 rounded-lg ${theme === 'dark' ? 'bg-[#333436] border-gray-700' : 'border-gray-900'}`}>
                <FileUploadBox
                  label="Upload Selfie"
                  sublabel="Hold your ID beside your face"
                  onFileSelect={(file) => handleFileUpload('selfieWithId', file)}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-10 py-4  bg-black dark:bg-blue-600 text-white text-lg font-bold rounded-lg  focus:outline-none focus:ring-2  shadow-md hover:shadow-lg transition-all"
            >
              Proceed to Verification
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const FileUploadBox: React.FC<{
  label: string;
  sublabel: string;
  onFileSelect: (file: File | null) => void;
  theme: 'light' | 'dark';
}> = ({ label, sublabel, onFileSelect, theme }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (

   
    <div 
      className={`border-3 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
        theme === 'dark'
          ? 'border-gray-600 '
          : 'border-gray-400 '
      }`} 
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
      />
      <div className="mb-4">
        <div className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{label}</div>
        <div className={`text-base font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{sublabel}</div>
      </div>
      {fileName && (
        <div className={`text-sm font-medium mb-4 py-2 px-4 rounded-lg inline-block ${
          theme === 'dark'
            ? 'text-gray-300 bg-gray-800'
            : 'text-gray-700 bg-gray-100'
        }`}>
          Selected: {fileName}
        </div>
      )}
      <button
        type="button"
        className={`px-8 py-3 text-base font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md transition-all ${
          theme === 'dark'
            ? 'bg-blue-600 text-white  focus:ring-blue-500'
            : 'bg-gray-900 text-white  focus:ring-gray-500'
        }`}
      >
        Upload Document
      </button>
    </div>
  );
};

export default HotspotRegistrationStep2;