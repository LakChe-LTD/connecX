import React, { useState } from 'react';
import { Search, Wifi } from 'lucide-react';
import { useNavigate } from "react-router-dom";



export default function VoucherManagement() {

    const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Vouchers</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your vouchers</p>
          </div>
          <button
            // onClick={() => setCurrentView('add')}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Hotspot
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
          <button className="pb-3 text-xs sm:text-sm font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
            Auto-Generate Vouchers
          </button>
          <button className="pb-3 text-xs sm:text-sm font-bold text-gray-500 hover:text-gray-700 whitespace-nowrap">
            Add Existing Vouchers
          </button>
        </div>

        {/* Filters */}
        <div className=" rounded-lg shadow-sm  p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="hotspot"
                value={formData.hotspot}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2.5 text-gray-900 font-bold border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Select Hotspot*"
              />
            </div>
            <div>
              <input
                type="number"
                name="vouchers"
                value={formData.vouchers}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2.5 font-bold border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Number of Vouchers"
              />
            </div>
            <div>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2.5 font-bold border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Duration"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2.5 font-bold border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="mt-4">
            <input
              type="date"
              className="w-full sm:max-w-xs px-3 py-2.5 font-bold border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Expiration Date"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleGenerateVouchers}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Vouchers
            </button>
          </div>
        </div>

        {/* Voucher List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Voucher List</h2>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vouchers"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Expiration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVouchers.map((voucher, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{voucher.code}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${
                        voucher.status === 'Active' ? 'bg-green-100 text-green-700' :
                        voucher.status === 'Used' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {voucher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{voucher.duration}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{voucher.price}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{voucher.expirationDate}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-blue-600 whitespace-pre-line leading-relaxed">
                        {voucher.actions}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredVouchers.map((voucher, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900 mb-1">{voucher.code}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${
                      voucher.status === 'Active' ? 'bg-green-100 text-green-700' :
                      voucher.status === 'Used' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {voucher.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{voucher.price}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <div className="font-bold text-gray-600 mb-1">Duration</div>
                    <div className="font-semibold text-gray-900">{voucher.duration}</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-600 mb-1">Expiration Date</div>
                    <div className="font-semibold text-gray-900">{voucher.expirationDate}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="text-xs font-bold text-gray-600 mb-2">Actions</div>
                  <div className="flex flex-wrap gap-2">
                    {voucher.actions.split('\n').map((action, i) => (
                      <button
                        key={i}
                        className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
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
  );
}