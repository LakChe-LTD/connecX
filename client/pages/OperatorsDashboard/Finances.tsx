import React from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useApp();
  
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

      <>
      <Helmet>
        <title>Finance Dashboard | KonnectX</title>
        <meta
          name="description"
          content="Manage your finances within the KonnectX decentralized network. View transactions, earnings, and financial reports for your hotspots and operations."
        />
        <meta
          name="keywords"
          content="KonnectX, finance dashboard, KXT token, transactions, earnings, hotspot management, decentralized network"
        />
        <meta property="og:title" content="Finance Dashboard - KonnectX" />
        <meta
          property="og:description"
          content="Manage your finances within the KonnectX decentralized network. View transactions, earnings, and financial reports for your hotspots and operations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>

    <div>
      <div className="max-w-4xl mx-auto">
        {/* Finances Title */}
        <h1 className={`text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Finances
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`rounded-lg shadow-lg p-6 border-2 ${
            theme === 'dark'
              ? 'bg-[#333436] border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <div className={`text-sm font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total Income
            </div>
            <div className={`text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              $1,250
            </div>
          </div>
          <div className={`rounded-lg shadow-lg p-6 border-2 ${
            theme === 'dark'
              ? 'bg-[#333436] border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <div className={`text-sm font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Vouchers Sold
            </div>
            <div className={`text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              320
            </div>
          </div>
          <div className={`rounded-lg shadow-lg p-6 border-2 ${
            theme === 'dark'
              ? 'bg-[#333436] border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <div className={`text-sm font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Active Subscribers
            </div>
            <div className={`text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              150
            </div>
          </div>
        </div>

        {/* Income Trend Chart */}
        <div className={`rounded-lg shadow-lg p-6 md:p-8 border-2 ${
          theme === 'dark'
            ? 'bg-[#333436] border-gray-700'
            : 'bg-white border-gray-100'
        }`}>
          <div className="mb-6">
            <div className={`text-sm font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Income Trend
            </div>
            <div className="flex items-end gap-2">
              <div className={`text-3xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                $1,250
              </div>
              <div className={`text-sm font-bold mb-1 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                Last 30 Days +15%
              </div>
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
                  stroke={theme === 'dark' ? '#fbbf24' : '#fbbf24'}
                  strokeWidth="0.2"
                  opacity={theme === 'dark' ? '0.5' : '0.3'}
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              {/* Smooth curved line chart */}
              <path
                fill="none"
                stroke={theme === 'dark' ? '#fbbf24' : '#fbbf24'}
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
            <div className={`absolute -bottom-6 left-0 right-0 flex justify-between text-xs font-bold ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          {/* Withdraw Button */}
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleWithdraw}
              className="w-full md:w-auto px-6 py-3 bg-black dark:bg-blue-600 text-white text-sm font-extrabold rounded-lg  transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FinanceDashboard;