import React, { useState } from 'react';
import { Wallet, Plus, ArrowDownLeft, CreditCard, Bitcoin, ChevronDown } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";



export default function WalletDashboard() {
     const { theme } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const transactions = [
    {
      id: 1,
      type: 'Monthly Premium subscription',
      date: '01/11/2025',
      method: 'Card',
      amount: '29.99 USD',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Monthly Premium subscription',
      date: '01/10/2025',
      method: 'Crypto',
      amount: '8 TON',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Wallet top-up',
      date: '15/10/2025',
      method: 'Mobile Money',
      amount: '9.99 USD',
      status: 'completed'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Wallet
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your balance and transactions
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* TON Balance */}
          <div className={`rounded-2xl shadow-lg p-8 border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center justify-between mb-6">
              <span className={`text-xs font-bold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                TON BALANCE
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-[#2a2b2d]' : 'bg-blue-50'}`}>
                <Bitcoin className="w-5 h-5 text-black dark:text-blue-600" />
              </div>
            </div>
            <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              25.5
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              ≈ $61.75 USD
            </div>
          </div>

          {/* ICT Balance */}
          <div className={`rounded-2xl shadow-lg p-8 border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center justify-between mb-6">
              <span className={`text-xs font-bold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                ICT BALANCE
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-[#2a2b2d]' : 'bg-blue-50'}`}>
                <Bitcoin className="w-5 h-5 text-black dark:text-blue-600" />
              </div>
            </div>
            <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              1250
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              ≈ $62.50 USD
            </div>
          </div>

          {/* Fiat Balance */}
          <div className={`rounded-2xl shadow-lg p-8 border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center justify-between mb-6">
              <span className={`text-xs font-bold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                FIAT BALANCE
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-[#2a2b2d]' : 'bg-blue-50'}`}>
                <CreditCard className="w-5 h-5 text-black dark:text-blue-500" />
              </div>
            </div>
            <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              $150.75
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              Available to spend
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Add Funds */}
          <div className={`rounded-2xl shadow-lg p-8 border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-6">
              <Plus className="w-6 h-6 text-blue-500" />
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Add Funds
              </h3>
            </div>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Top up your wallet balance
            </p>
            
            <div className="mb-5">
              <label className={`block text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount (USD)
              </label>
              <input
                type="text"
                placeholder="50.00"
                className={`w-full px-5 py-4 border-2 rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#2a2b2d] border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Payment Method
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 px-5 py-4 rounded-xl border-2 flex items-center justify-center gap-2 text-base font-bold transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-black dark:border-blue-500 bg-blue-50 dark:bg-[#2a2b2d] text-black dark:text-blue-600'
                      : theme === 'dark'
                      ? 'border-gray-700 bg-[#2a2b2d] text-gray-400'
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`flex-1 px-5 py-4 rounded-xl border-2 flex items-center justify-center gap-2 text-base font-bold transition-colors ${
                    paymentMethod === 'crypto'
                      ? 'border-black dark:border-blue-500 bg-blue-50 dark:bg-[#2a2b2d] text-black dark:text-blue-600'
                      : theme === 'dark'
                      ? 'border-gray-700 bg-[#2a2b2d] text-gray-400'
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  <Bitcoin className="w-5 h-5" />
                  Crypto
                </button>
              </div>
            </div>

            <button className="w-full bg-black dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-base shadow-lg">
              Add Funds
            </button>
          </div>

          {/* Withdraw */}
          <div className={`rounded-2xl shadow-lg p-8 border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-6">
              <ArrowDownLeft className="w-6 h-6 text-blue-500" />
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Withdraw
              </h3>
            </div>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Transfer funds to your account
            </p>
            
            <div className="mb-5">
              <label className={`block text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount (USD)
              </label>
              <input
                type="text"
                placeholder="25.00"
                className={`w-full px-5 py-4 border-2 rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#2a2b2d] border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Withdraw To
              </label>
              <input
                type="text"
                placeholder="Bank account or wallet address"
                className={`w-full px-5 py-4 border-2 rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#2a2b2d] border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <button className="w-full bg-black dark:bg-blue-600  text-white  hover:bg-black dark:hover:bg-blue-700 font-bold py-4 px-6 rounded-xl text-base  shadow-lg">
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className={`rounded-2xl shadow-lg border-2 ${theme === 'dark' ? 'bg-[#333436] border-gray-800' : 'bg-white border-gray-300'}`}>
          <div className="p-8 border-b-2 border-gray-200">
            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Transaction History
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Your payment and subscription transactions
            </p>
          </div>

          {/* Tabs */}
          <div className={`flex gap-8 px-8 pt-6 border-b-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
            {['All', 'Subscriptions', 'Top-ups'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-base font-bold transition-colors relative ${
                  activeTab === tab
                    ? theme === 'dark'
                      ? 'text-white'
                      : 'text-gray-900'
                    : theme === 'dark'
                    ? 'text-gray-400'
                    : 'text-gray-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 dark:bg-blue-600 bg-black rounded-t" />
                )}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          <div className="p-8">
            <div className="space-y-5">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-6 rounded-xl border-2 ${theme === 'dark' ? 'bg-[#2a2b2d] border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-[#333436]' : 'bg-white'}`}>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div>
                      <div className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.type}
                      </div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {transaction.date} • {transaction.method}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {transaction.amount}
                    </div>
                    <span className="dark:bg-blue-600 bg-black text-white text-sm font-bold px-4 py-2 rounded-full">
                      completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}