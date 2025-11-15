import React from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const FinanceDashboard = () => {
  const navigate = useNavigate();
  const chartData = [
    { week: 'Week 1', value: 30 },
    { week: '', value: 55 },
    { week: '', value: 45 },
    { week: '', value: 35 },
    { week: 'Week 2', value: 25 },
    { week: '', value: 35 },
    { week: '', value: 50 },
    { week: '', value: 40 },
    { week: 'Week 3', value: 45 },
    { week: '', value: 35 },
    { week: '', value: 25 },
    { week: '', value: 15 },
    { week: '', value: 20 },
    { week: '', value: 70 },
    { week: '', value: 55 },
    { week: 'Week 4', value: 40 },
    { week: '', value: 35 },
    { week: '', value: 55 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));



    const handleWithdraw = () => {

    navigate("/dashboard/Withdrawfunds");   
  };
  
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button className="text-gray-700 hover:text-gray-900">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                  <div className="absolute w-6 h-6 border-2 border-blue-600 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold text-blue-600">KonnectX</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search Kits..."
                className="w-full md:w-auto pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              />
              <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <Heart className="w-5 h-5" />
              <span className="text-sm">KYC</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm">Kits (0)</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
              <span className="text-sm">Account</span>
            </button>
          </div>
        </div>

        {/* Finances Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Finances</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Total Income</div>
            <div className="text-2xl font-bold text-gray-900">$1,250</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Vouchers Sold</div>
            <div className="text-2xl font-bold text-gray-900">320</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Active Subscribers</div>
            <div className="text-2xl font-bold text-gray-900">150</div>
          </div>
        </div>

        {/* Income Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">Income Trend</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-gray-900">$1,250</div>
              <div className="text-sm text-green-600 mb-1">Last 30 Days +15%</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-48 md:h-64 mb-8">
            <svg width="100%" height="100%" className="overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Yellow horizontal lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 25}
                  x2="100"
                  y2={i * 25}
                  stroke="#fbbf24"
                  strokeWidth="0.2"
                  opacity="0.3"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              {/* Smooth curved line chart */}
              <path
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                d={(() => {
                  const points = chartData.map((d, i) => ({
                    x: (i / (chartData.length - 1)) * 100,
                    y: 100 - (d.value / maxValue) * 100
                  }));
                  
                  if (points.length < 2) return '';
                  
                  let path = `M ${points[0].x} ${points[0].y}`;
                  
                  for (let i = 0; i < points.length - 1; i++) {
                    const current = points[i];
                    const next = points[i + 1];
                    const controlX = (current.x + next.x) / 2;
                    
                    path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`;
                    path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`;
                  }
                  
                  return path;
                })()}
              />
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          {/* Withdraw Button */}
          <div className="flex justify-end mt-6">
            <button onClick={handleWithdraw}
            className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;