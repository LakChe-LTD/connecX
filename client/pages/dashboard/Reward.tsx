// client/src/pages/DashboardReward.tsx
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useApp } from "@/contexts/AppContext";
import { useWallet } from "@/hooks/useWallet";
import { ErrorModal, SuccessModal, WithdrawModal } from '@/components/walletmodals';


export default function DashboardReward() {
  const { theme } = useApp();
  const {
    balance,
    transactions,
    summary,
    monthlyEarnings,
    trendData,
    loading,
    claiming,
    withdrawing,
    error,
    claimRewards,
    withdraw,
    clearError
  } = useWallet();

  // Modal states
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle claim rewards
  const handleClaim = async () => {
    try {
      await claimRewards();
      setSuccessMessage({
        title: 'Success!',
        message: 'Rewards claimed successfully!'
      });
      setSuccessModalOpen(true);
    } catch (err) {
      // Error handled by hook
    }
  };

  // Handle withdraw
  const handleWithdraw = async (amount: number, address: string) => {
    try {
      await withdraw({ amount, externalAddress: address });
      setWithdrawModalOpen(false);
      setSuccessMessage({
        title: 'Withdrawal Successful!',
        message: `${amount} KXT has been withdrawn to ${address.substring(0, 10)}...`
      });
      setSuccessModalOpen(true);
    } catch (err) {
      setWithdrawModalOpen(false);
      // Error handled by hook
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Pagination calculations
  const totalPages = Math.ceil((transactions?.length || 0) / itemsPerPage);
  const paginatedTransactions = transactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Total KXT Earned</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{summary?.totalEarned?.toFixed(2) || '0.00'}</h3>
          <p className="text-sm mt-2">
            <span className="text-green-600 font-semibold">{summary?.totalEarnedChange || '0%'}</span>{' '}
            <span className="text-gray-300">vs last month</span>
          </p>
        </Card>

        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Monthly Rewards</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{summary?.monthlyRewards?.toFixed(2) || '0.00'}</h3>
          <p className="text-sm mt-2">
            <span className="text-green-600 font-semibold">{summary?.monthlyRewardsChange || '0%'}</span>{' '}
            <span className="text-gray-300">vs previous average</span>
          </p>
        </Card>

        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Available Balance</p>
          <h3 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{balance?.available?.toFixed(2) || '0.00'}</h3>
          <p className="text-sm mt-2">
            <span className="text-green-600 font-semibold">{summary?.pendingRewardsChange || '0%'}</span>{' '}
            <span className="text-gray-300">vs last month</span>
          </p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Claim Rewards</h3>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Pending: {balance?.wallet?.toFixed(2) || '0.00'} KXT
          </p>
          <Button
            onClick={handleClaim}
            disabled={claiming || !balance?.wallet || balance.wallet === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-700"
          >
            {claiming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Claiming...
              </>
            ) : (
              'Claim Rewards'
            )}
          </Button>
        </Card>

        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Withdraw Funds</h3>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Available: {balance?.available?.toFixed(2) || '0.00'} KXT
          </p>
          <Button
            onClick={() => setWithdrawModalOpen(true)}
            disabled={!balance?.available || balance.available === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700"
          >
            Withdraw
          </Button>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Earnings Bar Chart */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Monthly Earnings</h3>
            <select className={`border rounded px-3 py-1 text-sm ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-800 text-white'
                : 'border-gray-300'
            }`}>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#FFFFFF' : '#A9A9A9'} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                  color: theme === 'dark' ? '#fff' : '#000'
                }} 
              />
              <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Earnings Trend Area Chart */}
        <Card className={`p-6 ${
          theme === 'dark' 
            ? 'bg-[#333436] border-[#2b2b2c]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Earnings Trend</h3>
            <select className={`border rounded px-3 py-1 text-sm ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-800 text-white'
                : 'border-gray-300'
            }`}>
              <option>1 month</option>
              <option>3 months</option>
              <option>6 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#FFFFFF' : '#A9A9A9'} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                  color: theme === 'dark' ? '#fff' : '#000'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Hotspots List */}
      <Card className={`p-6 ${
        theme === 'dark'
          ? 'bg-black border-black'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h3 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Transaction History
          </h3>

          <div className="flex items-center justify-center gap-3 w-full md:w-auto">
            <div className="flex justify-center my-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className={`border rounded-md pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-black border-gray-800 text-white placeholder-gray-500'
                      : 'border-gray-300'
                  }`}
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <select className={`border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 text-blue-500'
                : 'border-gray-300'
            }`}>
              <option>All Status</option>
              <option>Referral</option>
              <option>Storage</option>
            </select>

            <Button className={`px-4 py-2 flex items-center ${
              theme === 'dark'
                ? 'bg-blue-500 text-black text-xl hover:bg-gray-200'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                theme === 'dark' 
                  ? 'border-black bg-black'
                  : 'border-white bg-white'
              }`}>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Date</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Description</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Type</th>
                <th className={`text-left py-4 px-4 font-semibold text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((item, idx) => (
                  <tr key={idx} className={`border-b transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-900 hover:bg-gray-900'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <td className={`py-4 px-4 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{item.date}</td>
                    <td className={`py-4 px-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{item.description}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'Referral' ? 'bg-green-100 text-green-700' :
                        item.type === 'Storage' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className={`py-4 px-4 text-sm font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {transactions.length > 0 && (
          <div className={`flex items-center justify-between mt-6 pt-4 border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, transactions.length)}</span> of {transactions.length} results
            </p>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 ${
                  theme === 'dark'
                    ? 'border-gray-800 hover:bg-gray-900 text-white'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                ‹
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 ${
                    currentPage === i + 1
                      ? theme === 'dark'
                        ? 'bg-white text-black hover:bg-gray-200 border-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
                      : theme === 'dark'
                        ? 'border-gray-800 hover:bg-gray-900 text-white'
                        : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 ${
                  theme === 'dark'
                    ? 'border-gray-800 hover:bg-gray-900 text-white'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                ›
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        onConfirm={handleWithdraw}
        loading={withdrawing}
        availableBalance={balance?.available || 0}
        theme={theme}
      />

      <ErrorModal
        isOpen={!!error}
        onClose={clearError}
        title="Error"
        message={error || ''}
        theme={theme}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title={successMessage.title}
        message={successMessage.message}
        theme={theme}
      />
    </div>
  );        
}