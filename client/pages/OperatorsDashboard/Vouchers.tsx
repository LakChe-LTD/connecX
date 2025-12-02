import React, { useState } from 'react';
import { Search, Wifi } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";


export default function VoucherManagement() {
  const navigate = useNavigate();
  const { theme } = useApp();
  
  const [formData, setFormData] = useState({
    hotspot: '',
    vouchers: '',
    duration: '',
    price: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const vouchers = [
    { code: 'VOUCHER1', status: 'Active', duration: '1 Hour', price: '$5.00', expirationDate: '2025-07-25', actions: 'Share QR\nShare\nShare URL\nEdit\nDelete' },
    { code: 'VOUCHER2', status: 'Used', duration: '3 Hours', price: '$8.00', expirationDate: '2025-07-18', actions: 'Share QR\nShare\nShare URL\nEdit\nDelete' },
    { code: 'VOUCHER3', status: 'Expired', duration: '5 Hours', price: '$5.00', expirationDate: '2025-07-15', actions: 'Share QR\nShare\nShare URL\nEdit\nDelete' },
    { code: 'VOUCHER4', status: 'Active', duration: '1 Hour', price: '$5.00', expirationDate: '2025-07-30', actions: 'Share QR\nShare\nShare URL\nEdit\nDelete' },
    { code: 'VOUCHER5', status: 'Used', duration: '2 Hours', price: '$5.00', expirationDate: '2025-07-18', actions: 'Share QR\nShare\nShare URL\nEdit\nDelete' }
  ];

  const filteredVouchers = vouchers.filter(v => 
    v.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateVouchers = () => {
    navigate("/dashboard/Finances");
  };

  return (

    <>
      <Helmet>
        <title>Voucher Management | KonnectX</title>
        <meta
          name="description"
          content="Manage and track all your KonnectX vouchers. Redeem, assign, and monitor $KXT token vouchers efficiently."
        />
        <meta
          name="keywords"
          content="KonnectX, voucher management, KXT token, redeem vouchers, dashboard"
        />
        <meta property="og:title" content="Voucher Management - KonnectX" />
        <meta
          property="og:description"
          content="Manage and track all your KonnectX vouchers. Redeem, assign, and monitor $KXT token vouchers efficiently."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>
    <div>
      <div className="max-w-6xl mx-auto">
        
        {/* Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Vouchers
            </h1>
            <p className={`text-sm sm:text-base font-semibold mt-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Manage your vouchers
            </p>
          </div>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-black dark:bg-blue-600 text-white text-sm font-bold rounded-lg  transition-colors shadow-md hover:shadow-lg"
          >
            Add Hotspot
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex gap-4 sm:gap-6 border-b mb-4 sm:mb-6 overflow-x-auto ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button className="pb-3 text-sm sm:text-base font-extrabold text-black dark:text-blue-600 border-b-2 border-blue-600 dark:border-black whitespace-nowrap">
            Auto-Generate Vouchers
          </button>
          <button className={`pb-3 text-sm sm:text-base font-extrabold whitespace-nowrap ${
            theme === 'dark' 
              ? 'text-gray-400 hover:text-gray-300' 
              : 'text-gray-500 hover:text-gray-700'
          }`}>
            Add Existing Vouchers
          </button>
        </div>

        {/* Filters */}
        <div className={`rounded-lg shadow-lg border-2 p-4 sm:p-6 mb-4 sm:mb-6 ${
          theme === 'dark'
            ? 'bg-[#333436] border-gray-700'
            : 'bg-white border-gray-300'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="hotspot"
                value={formData.hotspot}
                onChange={handleInputChange}
                className={`w-1/2 px-3 py-3 font-bold border-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
                placeholder="Select Hotspot*"
              />
            </div>
            <div>
              <input
                type="number"
                name="vouchers"
                value={formData.vouchers}
                onChange={handleInputChange}
                className={`w-1/2 px-3 py-3 font-bold border-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
                placeholder="Number of Vouchers"
              />
            </div>
            <div>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`w-1/2 px-3 py-3 font-bold border-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
                placeholder="Duration"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-1/2 px-3 py-3 font-bold border-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="mt-4">
            <input
              type="date"
              className={`w-full sm:max-w-xs px-3 py-3 font-bold border-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                theme === 'dark'
                  ? 'bg-[#2a2a2c] text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
              placeholder="Expiration Date"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleGenerateVouchers}
              className="w-full sm:w-auto px-6 py-3 bg-black dark:bg-blue-600 text-white text-sm font-extrabold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Generate Vouchers
            </button>
          </div>
        </div>

        {/* Voucher List */}
        <div className={`rounded-lg shadow-lg border-2 ${
          theme === 'dark'
            ? 'bg-[#333436] border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-4 sm:p-6 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg sm:text-xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Voucher List
            </h2>
            <div className="mt-4 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vouchers"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2c] text-white border-gray-600 placeholder-gray-500'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b-2 ${
                theme === 'dark'
                  ? 'bg-[#2a2a2c] border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Code
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Duration
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Price
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Expiration Date
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark'
                  ? 'bg-[#333436] divide-gray-700'
                  : 'bg-white divide-gray-200'
              }`}>
                {filteredVouchers.map((voucher, index) => (
                  <tr key={index} className={`${
                    theme === 'dark' ? 'hover:bg-[#3a3a3c]' : 'hover:bg-gray-50'
                  }`}>
                    <td className={`px-6 py-4 text-sm font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {voucher.code}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-extrabold rounded ${
                        voucher.status === 'Active' 
                          ? theme === 'dark'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-green-100 text-green-700'
                          : voucher.status === 'Used' 
                            ? theme === 'dark'
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                            : theme === 'dark'
                              ? 'bg-red-900 text-red-200'
                              : 'bg-red-100 text-red-700'
                      }`}>
                        {voucher.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {voucher.duration}
                    </td>
                    <td className={`px-6 py-4 text-sm font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {voucher.price}
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {voucher.expirationDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-xs font-bold whitespace-pre-line leading-relaxed ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {voucher.actions}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className={`lg:hidden divide-y ${
            theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {filteredVouchers.map((voucher, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className={`text-sm font-extrabold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {voucher.code}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-extrabold rounded ${
                      voucher.status === 'Active' 
                        ? theme === 'dark'
                          ? 'bg-green-900 text-green-200'
                          : 'bg-green-100 text-green-700'
                        : voucher.status === 'Used' 
                          ? theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                          : theme === 'dark'
                            ? 'bg-red-900 text-red-200'
                            : 'bg-red-100 text-red-700'
                    }`}>
                      {voucher.status}
                    </span>
                  </div>
                  <div className={`text-sm font-extrabold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {voucher.price}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <div className={`font-extrabold mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Duration
                    </div>
                    <div className={`font-bold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {voucher.duration}
                    </div>
                  </div>
                  <div>
                    <div className={`font-extrabold mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Expiration Date
                    </div>
                    <div className={`font-bold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {voucher.expirationDate}
                    </div>
                  </div>
                </div>

                <div className={`pt-3 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <div className={`text-xs font-extrabold mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Actions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {voucher.actions.split('\n').map((action, i) => (
                      <button
                        key={i}
                        className={`px-3 py-1.5 text-xs font-extrabold rounded transition-colors ${
                          theme === 'dark'
                            ? 'text-blue-400 bg-blue-900 hover:bg-blue-800'
                            : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>  
  );
}