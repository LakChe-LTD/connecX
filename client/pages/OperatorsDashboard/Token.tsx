import React, { useState } from 'react';
import { Gift, ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";




const KonnectXToken = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = [
    { date: '2024-02-20 18:30', description: 'Claimed Rewards', amount: '+250.00 KXT' },
    { date: '2024-02-20 18:30', description: 'Claimed Rewards', amount: '+250.00 KXT' },
    { date: '2024-02-20 18:30', description: 'Claimed Rewards', amount: '+250.00 KXT' },
  ];

  const filteredTransactions = transactions.filter(tx =>
    tx.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClaim = () => {
    console.log('Claiming tokens...');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !walletAddress) {
      alert('Please enter amount and wallet address');
      return;
    }
    console.log(`Withdrawing ${withdrawAmount} KXT to ${walletAddress}`);
  };

  return (
     <>
      <Helmet>
        <title>Token Dashboard | KonnectX</title>
        <meta
          name="description"
          content="View and manage your $KXT tokens on KonnectX. Track balances, transactions, and token activity securely."
        />
        <meta
          name="keywords"
          content="KonnectX, KXT token, token dashboard, wallet, transactions, crypto"
        />
        <meta property="og:title" content="Token Dashboard - KonnectX" />
        <meta
          property="og:description"
          content="View and manage your $KXT tokens on KonnectX. Track balances, transactions, and token activity securely."
        />
      </Helmet>


    <div className="min-h-screen bg-gray-50 dark:bg-black">

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md  dark:bg-[#333436] p-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-6">Token Summary</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-5 border border- border-[#2c2d2f] dark:bg-[#303133]">
                  <div className="text-sm text-gray-700 mb-2 font-bold dark:text-gray-300">Available $KXT</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-300">1,234.56</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-5 border border-[#2c2d2f] dark:bg-[#303133]">
                  <div className="text-sm text-gray-700 mb-2 font-bold dark:text-gray-300">Wallet Balance</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-300">5,678.90</div>
                </div>
              </div>

              <button
                onClick={handleClaim}
                className="w-full bg-black text-white py-4 rounded-lg font-bold text-base flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors dark:bg-blue-700 dark:text-black shadow-md"
              >
                <Gift className="w-5 h-5" />
                <span>Claim Tokens</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md  dark:bg-[#333436] p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300 mb-5">Transaction History</h2>

              <div className="flex items-center space-x-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#303133] focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer  dark:bg-[#303133] font-medium "
                >
                  <option>All Types</option>
                  <option>Claimed Rewards</option>
                  <option>Withdrawals</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 ">
                      <th className="text-left py-3.5 px-2 text-sm font-bold text-gray-700 dark:text-gray-300">Date</th>
                      <th className="text-left py-3.5 px-2 text-sm font-bold text-gray-700 dark:text-gray-300">Description</th>
                      <th className="text-right py-3.5 px-2 text-sm font-bold text-gray-700 dark:text-gray-300">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-2 text-sm text-gray-700 dark:text-gray-300 font-medium">{tx.date}</td>
                        <td className="py-4 px-2 text-sm text-gray-900 dark:text-gray-300 font-medium">{tx.description}</td>
                        <td className="py-4 px-2 text-sm text-green-600 text-right font-bold">{tx.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-200">
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Showing 1 to 3 of results
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="p-2 border-2 border-gray-300 rounded hover:bg-gray-50 dark:text-gray-300 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm font-bold min-w-[32px]">1</button>
                  <button className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 rounded text-sm font-medium min-w-[32px]">2</button>
                  <button className="px-3 py-1.5 hover:bg-gray-100 text-gray-700 rounded text-sm font-medium min-w-[32px]">3</button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 border-2 border-gray-300 rounded dark:text-gray-300 hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md  dark:bg-[#333436] p-8">
              <h2 className="text-4xl font-bold text-gray-900  dark:text-gray-300 mb-6">Withdraw Tokens</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Amount</label>
                  <input
                    type="text"
                    placeholder="Enter KXT amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:bg-[#303133]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-300 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:bg-[#303133]"
                  />
                </div>

                <button
                  onClick={handleWithdraw}
                  className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-900 transition-colors text-base mt-2  dark:bg-blue-700 dark:text-black shadow-md"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default KonnectXToken;