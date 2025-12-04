import { useState } from 'react';
import { Wifi, Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';

export default function PayHotspots() {
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
    alert(`Processing payment for ${selectedPlan} pass...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Wifi className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-blue-600">KonnectX</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Kits..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Heart className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">KYC</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ShoppingCart className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Kits (0)</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Pay for Hotspot Access
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-600 text-center mb-8">
            Connect to 'The Coffee Corner' hotspot provided by 'TechConnect Solutions'. Choose a subscription plan:
          </p>

          {/* Plan Selection */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handlePlanSelect('daily')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-md border transition-colors ${
                selectedPlan === 'daily'
                  ? 'bg-gray-100 border-gray-300 text-gray-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Daily Pass - $2 for 3 hours
            </button>
            <button
              onClick={() => handlePlanSelect('weekly')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-md border transition-colors ${
                selectedPlan === 'weekly'
                  ? 'bg-gray-100 border-gray-300 text-gray-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Weekly Pass - $10 for 7 days
            </button>
            <button
              onClick={() => handlePlanSelect('monthly')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-md border transition-colors ${
                selectedPlan === 'monthly'
                  ? 'bg-gray-100 border-gray-300 text-gray-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly Pass - $30 for 30 days
            </button>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mb-2"
          >
            Pay & Connect
          </button>

          {/* Payment Method Info */}
          <p className="text-xs text-gray-400 text-center">
            Pay with KonnectX Wallet or Saved payment method
          </p>
        </div>
      </main>
    </div>
  );
}