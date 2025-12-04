import React from 'react';
import { Check } from 'lucide-react';

export default function PricingPlans() {
  const plans = {
    daily: [
      { name: 'Basic', price: 2, period: 'day', data: '1GB Data', access: 'Unlimited Access' },
      { name: 'Standard', price: 5, period: 'day', data: '5 GB Data', access: 'Unlimited Access' },
      { name: 'Premium', price: 10, period: 'day', data: 'Unlimited Data', access: 'Unlimited Access' }
    ],
    weekly: [
      { name: 'Basic', price: 10, period: 'week', data: '7 GB Data', access: 'Unlimited Access' },
      { name: 'Standard', price: 25, period: 'week', data: '35 GB Data', access: 'Unlimited Access' },
      { name: 'Premium', price: 50, period: 'week', data: 'Unlimited Data', access: 'Unlimited Access' }
    ],
    monthly: [
      { name: 'Basic', price: 30, period: 'month', data: '30 GB Data', access: 'Unlimited Access' },
      { name: 'Standard', price: 75, period: 'month', data: '100 GB Data', access: 'Unlimited Access' },
      { name: 'Premium', price: 150, period: 'month', data: 'Unlimited Data', access: 'Unlimited Access' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose a Plan</h1>
        
        {/* Daily Plans */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.daily.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2.5 rounded font-medium hover:bg-slate-700 transition-colors mb-4">
                  Subscribe
                </button>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.data}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.access}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Plans */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.weekly.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2.5 rounded font-medium hover:bg-slate-700 transition-colors mb-4">
                  Subscribe
                </button>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.data}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.access}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Plans */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.monthly.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2.5 rounded font-medium hover:bg-slate-700 transition-colors mb-4">
                  Subscribe
                </button>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.data}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{plan.access}</span>
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