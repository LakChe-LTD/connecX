import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {  User, Heart, ShoppingCart,} from "lucide-react";

const HotspotRegistrationStep2 = () => {

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
    // alert('Kit information saved successfully!');

    navigate("/dashboard/registerKitStep3");   // ✅ ADD THIS
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Main Content */}
      <div className=" max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register Your Hotspot Kit</h1>
           <p className="text-base text-gray-500 mt-2">Follow these steps to register your custom hotspot hardware and start providing internet services.</p>
          <h2 className="text-gray-900 text-lg  font-bold mb-6 mt-2">Step 2 of 3 • KYC Verification</h2>
           {/* Progress Bar */}
          <div className="flex-1 h-3 bg-black rounded-full">
            <div className="bg-black h-3 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="p-15">
          {/* Operator Verification Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3">
              Operator Verification
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-1/2 px-5 py-4 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-3">
                Goverment ID Type
                </label>
                <select
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-1/2 px-5 py-4 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base"
                >
                  <option value="">Select</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  ID Number
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Enter your occupation"
                  className="w-1/2 px-5 py-4 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
            </div>
          </div>

          {/* Upload Front and Back of ID */}
         <div className="mb-10">
  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3">
    Upload Front and Back of ID
  </h3>

  <div className="space-y-6">
    <div className="border-2 border-dashed  border-gray-900 p-4 rounded-lg">
      <FileUploadBox
        label="Upload Front of ID"
        sublabel="Only government issued documents"
        onFileSelect={(file) => handleFileUpload('frontIdProof', file)}
      />
    </div>

            <div className="border-2 border-dashed border-gray-900 p-4 rounded-lg">
             <FileUploadBox
               label="Upload Back of ID"
                   sublabel="Only government issued documents"
                  onFileSelect={(file) => handleFileUpload('backIdProof', file)}
                 />
             </div>
          </div>
     </div>


          {/* Proof of Address */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200">
              Proof of Address
            </h3>
            <div>
            <div className="border-2 border-dashed  border-gray-900 p-4 rounded-lg">
              <FileUploadBox
                label="Upload Utility Bill or Statement"
                sublabel="Only government issued documents"
                onFileSelect={(file) => handleFileUpload('proofOfAddress', file)}
              />
              </div>
            </div>
          </div>

          {/* Selfie for Face Match */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200">
              Selfie for Face Match
            </h3>
            <div>

              <div className="border-2 border-dashed  border-gray-900 p-4 rounded-lg">
              <FileUploadBox
                label="Upload Selfie"
                sublabel="Hold your ID beside your face"
                onFileSelect={(file) => handleFileUpload('selfieWithId', file)}
              />
              </div>
            </div>
          </div>

          {/* Submit Button */}
         <div className="pt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all"
            >
              Proceed to Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUploadBox: React.FC<{
  label: string;
  sublabel: string;
  onFileSelect: (file: File | null) => void;
}> = ({ label, sublabel, onFileSelect }) => {
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
    <div className="border-3 border-dashed border-gray-400 rounded-xl p-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer" onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
      />
      <div className="mb-4">
        <div className="text-base font-bold text-gray-900 mb-2">{label}</div>
        <div className="text-sm text-gray-600">{sublabel}</div>
      </div>
      {fileName && (
        <div className="text-sm text-gray-700 mb-4 font-medium bg-gray-100 py-2 px-4 rounded-lg inline-block">
          Selected: {fileName}
        </div>
      )}
      <button
        type="button"
        className="px-6 py-3 bg-gray-900 text-white text-base font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md transition-all"
      >
        Upload Document
      </button>
    </div>
  );
};

export default HotspotRegistrationStep2;