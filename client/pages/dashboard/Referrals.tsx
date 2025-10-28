import React, { useState } from 'react';
import { Users, Send, CheckCircle, Gift, Copy, Facebook, Twitter, Share2 } from 'lucide-react';

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);

  const referralLink = "https://platform.com/ref/john123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Total Referrals', value: '24', icon: Users, color: 'text-gray-600 dark:text-gray-400' },
    { label: 'Pending', value: '4', icon: Send, color: 'text-yellow-500' },
    { label: 'Total Referrals', value: '24', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Total Referrals', value: '24', icon: Gift, color: 'text-purple-500' }
  ];

  const topReferrers = [
    { rank: 1, name: 'John Smith', referrals: 12, amount: '$900' },
    { rank: 2, name: 'Emma Wilson', referrals: 12, amount: '$701' },
    { rank: 3, name: 'Mike Johnson', referrals: 12, amount: '$640' },
    { rank: 4, name: 'You', referrals: 12, amount: '$420' }
  ];

  const recentActivity = [
    { name: 'Sarah Johnson', action: 'joined using your referral', time: '2 hours ago', amount: '+$20', type: 'pending', icon: Send },
    { name: 'Sarah Johnson', action: 'joined using your referral', time: '2 hours ago', status: 'Pending', type: 'pending', icon: Send },
    { name: 'Sarah Johnson', action: 'joined using your referral', time: '2 hours ago', status: 'Achievement', type: 'achievement', icon: Gift }
  ];

  const rewards = [
    { title: '$20 Cash Bonus', description: 'Instant cash reward earned', required: '5 referrals' },
    { title: 'Premium Features', description: '1 month free premium access', required: '10 referrals' },
    { title: '$100 Bonus', description: 'One-time bonus payment', required: '20 referrals' }
  ];

  return (
    <div className="w-full">
      {/* Title and Description */}
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Invite friends to join our platform and earn amazing rewards. The more friends you bring, the more rewards you unlock!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-white text-xl">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* Referral Link Section */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Your Referral Link</h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-[#333436] border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gray-900 dark:bg-blue-800 text-white rounded-lg text-sm  font-medium flex items-center gap-2    hover:bg-gray-800 dark:hover:bg-gray-600"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
                <Facebook className="w-4 h-4" />
                Share
              </button>
              <button className="px-4 py-3 bg-blue-400 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-500">
                <Twitter className="w-4 h-4" />
                Tweet
              </button>
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Progress to Next Reward */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black dark:text-white">Progress to Next Reward</h2>
              <span className="text-sm text-black dark:text-gray-400">Next Reward: $100 Bonus</span>
            </div>
            <div className="mb-6">
              <div className="text-sm text-black dark:text-gray-400 mb-2">21/30 Referrals</div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-black dark:bg-blue-600" style={{ width: '70%' }}></div>
              </div>
            </div>
            {/* Milestone Markers */}
            <div className="flex justify-between items-start">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-xs font-bold text-black dark:text-white">Bronze</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10 Referrals</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-xs font-bold text-black dark:text-white">Silver</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">15 Referrals</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Gift className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-xs font-bold text-black dark:text-white">Gold</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">20 Referrals</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Gift className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-xs font-bold text-black dark:text-white">Platinum</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">30 Referrals</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-[#333436] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-purple-100 dark:bg-purple-900'
                    }`}>
                      <activity.icon className={`w-5 h-5 ${
                        activity.type === 'pending' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Sarah Johnson <span className="font-normal text-gray-600 dark:text-gray-400">{activity.action}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${
                    activity.amount ? 'text-green-600 dark:text-green-400' : activity.type === 'pending' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'
                  }`}>
                    {activity.amount || activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Top Referrers */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Top Referrers</h2>
            <div className="space-y-3">
              {topReferrers.map((referrer) => (
                <div key={referrer.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      referrer.rank === 1 ? 'bg-black dark:bg-blue-900 text-white dark:text-white' :
                      referrer.rank === 2 ? 'bg-black dark:bg-blue-900 text-white dark:text-white' :
                      referrer.rank === 3 ? 'bg-black dark:bg-blue-900 text-white dark:text-white' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {referrer.rank}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{referrer.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{referrer.referrals} Referrals</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{referrer.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Rewards</h2>
            <div className="space-y-4">
              {rewards.map((reward, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{reward.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{reward.required}</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{reward.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}