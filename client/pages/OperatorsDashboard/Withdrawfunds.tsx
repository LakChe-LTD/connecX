import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, User, Wifi } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";




export default function WithdrawFunds() {
  const { theme } = useApp();
  
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const availableBalance = 5500.00;
  const fees = 50.00;

  const calculateTotal = () => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue + fees;
  };

  return (
    <>
      <Helmet>
        <title>Withdraw Funds | KonnectX</title>
        <meta
          name="description"
          content="Withdraw your earnings securely from your KonnectX wallet. Manage your $KXT token funds efficiently."
        />
        <meta
          name="keywords"
          content="KonnectX, withdraw funds, wallet, KXT token, earnings"
        />
        <meta property="og:title" content="Withdraw Funds - KonnectX" />
        <meta
          property="og:description"
          content="Withdraw your earnings securely from your KonnectX wallet. Manage your $KXT token funds efficiently."
        />
      </Helmet>
    <div>


      {/* Main Content */}
      <div className={`max-w-6xl p-8  ml-6 ${
        theme === 'dark' ? 'bg-black' : 'border-gray-200'
      }`}>
        <div className={`shadow-lg rounded-lg p-8  ${
          theme === 'dark'
            ? 'bg-black'
            : ''
        }`}>
          <h1 className={`text-3xl font-extrabold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Withdraw Funds
          </h1>
          <p className={`text-base font-bold mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Available balance: <span className={`${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>₦{availableBalance.toFixed(2)}</span>
          </p>

          {/* Amount Input */}
          <div className="mb-6">
            <label className={`block text-sm font-extrabold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                  : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
              }`}
              placeholder="Enter amount"
            />
          </div>

          {/* Withdraw Max Button */}
          <button className={`font-extrabold text-base mb-8 transition-colors ${
            theme === 'dark'
              ? 'text-blue-600 hover:text-blue-300'
              : 'text-black '
          }`}>
            Withdraw Max
          </button>

          {/* Payment Method Section */}
          <div className="mb-8">
            <h2 className={`text-xl font-extrabold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Select Payment Method
            </h2>
            
            {/* Bank Account Option */}
            <div className="mb-3">
              <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'bank'
                  ? theme === 'dark'
                    ? 'bg-[#3a3a3c] border-blue-500'
                    : 'bg-blue-50 border-black'
                  : theme === 'dark'
                    ? 'bg-[#2a2a2c] border-gray-600 hover:border-gray-500'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedMethod === 'bank'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-5 h-5 text-black dark:text-blue-600"
                />
                <span className={`ml-3 text-base font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Bank Account (**** 1234)
                </span>
              </label>
            </div>

            {/* PayPal Option */}
            <div className="mb-5">
              <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'paypal'
                  ? theme === 'dark'
                    ? 'bg-[#3a3a3c] border-blue-500'
                    : 'bg-blue-50 border-black'
                  : theme === 'dark'
                    ? 'bg-[#2a2a2c] border-gray-600 hover:border-gray-500'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={selectedMethod === 'paypal'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className={`ml-3 text-base font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  PayPal
                </span>
              </label>
            </div>

            {/* Add New Payment Method */}
            <button className={`font-extrabold text-base transition-colors ${
              theme === 'dark'
                ? 'text-blue-600 hover:text-blue-300'
                : 'text-black'
            }`}>
              Add New Payment Method
            </button>
          </div>

          {/* Withdrawal Summary */}
          <div className="mb-8">
            <h2 className={`text-xl font-extrabold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Withdrawal Summary
            </h2>
            
            <div className={`space-y-4 p-4 rounded-lg border-2 ${
              theme === 'dark'
                ? 'bg-[#2a2a2c] border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`text-sm font-extrabold mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Amount
                </p>
                <p className={`text-base font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {amount ? `₦${parseFloat(amount).toFixed(2)}` : '₦0.00'}
                </p>
              </div>

              <div>
                <p className={`text-sm font-extrabold mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Destination
                </p>
                <p className={`text-base font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedMethod === 'bank' ? 'Bank Account (**** 1234)' : 'PayPal'}
                </p>
              </div>

              <div>
                <p className={`text-sm font-extrabold mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Fees
                </p>
                <p className={`text-base font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  ₦{fees.toFixed(2)}
                </p>
              </div>

              <div className={`pt-4 border-t-2 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <p className={`text-sm font-extrabold mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total
                </p>
                <p className={`text-xl font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  ₦{calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-black dark:bg-blue-600 text-white py-4 rounded-lg text-base font-extrabold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
    </>
  );
}