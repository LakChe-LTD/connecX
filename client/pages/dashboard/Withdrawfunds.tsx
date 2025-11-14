import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, User, Wifi } from 'lucide-react';

export default function WithdrawFunds() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const availableBalance = 5500.00;
  const fees = 50.00;

  const calculateTotal = () => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue + fees;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Wifi className="text-blue-600" size={24} />
            <span className="font-semibold text-lg">KonnectX</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Heart size={20} className="text-gray-600" />
          </button>
          <button className="relative">
            <ShoppingCart size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <User size={20} />
            <span className="text-sm">Account</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-2">Withdraw Funds</h1>
          <p className="text-sm text-gray-600 mb-6">
            Available balance: ₦{availableBalance.toFixed(2)}
          </p>

          {/* Amount Input */}
          <div className="mb-6">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter amount"
            />
          </div>

          {/* Withdraw Max Button */}
          <button className="text-blue-600 text-sm mb-6 hover:underline">
            Withdraw Max
          </button>

          {/* Payment Method Section */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-4">Select Payment Method</h2>
            
            {/* Bank Account Option */}
            <div className="mb-3">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedMethod === 'bank'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm">Bank Account (**** 1234)</span>
              </label>
            </div>

            {/* PayPal Option */}
            <div className="mb-4">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={selectedMethod === 'paypal'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm">PayPal</span>
              </label>
            </div>

            {/* Add New Payment Method */}
            <button className="text-blue-600 text-sm hover:underline">
              Add New Payment Method
            </button>
          </div>

          {/* Withdrawal Summary */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-4">Withdrawal Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-sm">{amount ? `₦${parseFloat(amount).toFixed(2)}` : '₦0.00'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Destination</p>
                <p className="text-sm">
                  {selectedMethod === 'bank' ? 'Bank Account (**** 1234)' : 'PayPal'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Fees</p>
                <p className="text-sm">₦{fees.toFixed(2)}</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-sm font-semibold">₦{calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}