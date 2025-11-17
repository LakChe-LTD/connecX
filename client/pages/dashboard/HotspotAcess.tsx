import { useState } from 'react';
import { Wifi, Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

export default function HotspotAcess() {
  const navigate = useNavigate();
  const { theme } = useApp();
  
  const [formData, setFormData] = useState({
    deviceBrand: '',
    deviceModel: '',
    macAddress: '',
    serialNumber: ''
  });

  const [selectedPlan, setSelectedPlan] = useState('daily');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    navigate("/dashboard/MyHotspots");   
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
    }`}>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-8">
          {/* Title */}
          <h1 className={`text-4xl font-extrabold text-center mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Pay for Hotspot Access
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg font-semibold text-center mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Connect to 'The Coffee Corner' hotspot provided by 'TechConnect Solutions'. Choose a subscription plan:
          </p>

          {/* Plan Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => handlePlanSelect('daily')}
              className={`flex-1 px-6 py-4 text-base font-bold rounded-lg border-2 transition-all duration-200 ${
                selectedPlan === 'daily'
                  ? theme === 'dark'
                    ? 'bg-[#333436] border-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 border-gray-400 text-gray-900 shadow-md'
                  : theme === 'dark'
                    ? 'bg-[#1a1a1b] border-gray-700 text-gray-300 hover:bg-[#2a2a2b] hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className="block text-lg font-extrabold mb-1">Daily Pass</span>
              <span className={`block text-sm ${
                selectedPlan === 'daily'
                  ? theme === 'dark' ? 'text-blue-400' : 'text-gray-700'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                $2 for 3 hours
              </span>
            </button>
            
            <button
              onClick={() => handlePlanSelect('weekly')}
              className={`flex-1 px-6 py-4 text-base font-bold rounded-lg border-2 transition-all duration-200 ${
                selectedPlan === 'weekly'
                  ? theme === 'dark'
                    ? 'bg-[#333436] border-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 border-gray-400 text-gray-900 shadow-md'
                  : theme === 'dark'
                    ? 'bg-[#1a1a1b] border-gray-700 text-gray-300 hover:bg-[#2a2a2b] hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className="block text-lg font-extrabold mb-1">Weekly Pass</span>
              <span className={`block text-sm ${
                selectedPlan === 'weekly'
                  ? theme === 'dark' ? 'text-blue-400' : 'text-gray-700'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                $10 for 7 days
              </span>
            </button>
            
            <button
              onClick={() => handlePlanSelect('monthly')}
              className={`flex-1 px-6 py-4 text-base font-bold rounded-lg border-2 transition-all duration-200 ${
                selectedPlan === 'monthly'
                  ? theme === 'dark'
                    ? 'bg-[#333436] border-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 border-gray-400 text-gray-900 shadow-md'
                  : theme === 'dark'
                    ? 'bg-[#1a1a1b] border-gray-700 text-gray-300 hover:bg-[#2a2a2b] hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className="block text-lg font-extrabold mb-1">Monthly Pass</span>
              <span className={`block text-sm ${
                selectedPlan === 'monthly'
                  ? theme === 'dark' ? 'text-blue-400' : 'text-gray-700'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                $30 for 30 days
              </span>
            </button>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className={`w-full font-bold text-lg py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-black'
                : 'bg-black hover:bg-black text-white'
            }`}
          >
            Pay & Connect
          </button>

          {/* Payment Method Info */}
          <p className={`text-sm font-semibold text-center mt-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
          }`}>
            Pay with KonnectX Wallet or Saved payment method
          </p>
        </div>
      </main>
    </div>
  );
}