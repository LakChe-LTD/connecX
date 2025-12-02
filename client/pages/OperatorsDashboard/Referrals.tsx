// client/src/pages/Referral.tsx
import React, { useState, useEffect } from 'react';
import { Users, Send, CheckCircle, Gift, Copy, Facebook, Twitter, Share2, Loader2 } from 'lucide-react';

import type { 
  ReferralStats, 
  ReferralActivity, 
  TopReferrer, 
  ReferralProgress, 
  Reward 
} from '@/api/services/referralService';
import referralService from '@/api/services/referralService';
import { Helmet } from "react-helmet-async";




export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for all data
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [activities, setActivities] = useState<ReferralActivity[]>([]);
  const [leaderboard, setLeaderboard] = useState<TopReferrer[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<{ rank: number; totalReferrals: number } | null>(null);
  const [progress, setProgress] = useState<ReferralProgress | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        linkData,
        statsData,
        activityData,
        leaderboardData,
        progressData,
        rewardsData,
      ] = await Promise.all([
        referralService.getReferralLink(),
        referralService.getStats(),
        referralService.getActivity({ limit: 10 }),
        referralService.getLeaderboard({ limit: 10 }),
        referralService.getProgress(),
        referralService.getRewards(),
      ]);

      setReferralLink(linkData.data.referralLink);
      setStats(statsData);
      setActivities(activityData.activities);
      setLeaderboard(leaderboardData.leaderboard);
      setCurrentUserRank(leaderboardData.currentUser);
      setProgress(progressData);
      setRewards(rewardsData.rewards);
    } catch (err: any) {
      console.error('Error fetching referral data:', err);
      setError(err.response?.data?.message || 'Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      await referralService.trackShare('link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async (platform: 'facebook' | 'twitter' | 'other') => {
    try {
      await referralService.trackShare(platform);
      
      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
      } else if (platform === 'twitter') {
        const text = 'Join me on this amazing platform!';
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`, '_blank');
      }
    } catch (err) {
      console.error('Error tracking share:', err);
    }
  };

  const getActivityIcon = (activity: ReferralActivity) => {
    if (activity.status === 'pending') return Send;
    if (activity.rewardType === 'achievement') return Gift;
    return CheckCircle;
  };

  const getActivityColor = (activity: ReferralActivity) => {
    if (activity.status === 'pending') return 'yellow';
    if (activity.rewardType === 'achievement') return 'purple';
    return 'green';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statsCards = [
    { 
      label: 'Total Referrals', 
      value: stats?.totalReferrals || 0, 
      icon: Users, 
      color: 'text-gray-600 dark:text-gray-400' 
    },
    { 
      label: 'Pending', 
      value: stats?.pendingReferrals || 0, 
      icon: Send, 
      color: 'text-yellow-500' 
    },
    { 
      label: 'Approved', 
      value: stats?.approvedReferrals || 0, 
      icon: CheckCircle, 
      color: 'text-green-500' 
    },
    { 
      label: 'Total Earnings', 
      value: `$${stats?.totalEarnings || 0}`, 
      icon: Gift, 
      color: 'text-purple-500' 
    }
  ];

  return (
    <>
      <Helmet>
        <title>Referral Program | KonnectX</title>
        <meta
          name="description"
          content="Invite friends to KonnectX and earn rewards with the Referral Program. Share your referral code and grow the decentralized network."
        />
        <meta
          name="keywords"
          content="KonnectX, referral program, invite friends, KXT token, rewards, decentralized network"
        />
        <meta property="og:title" content="Referral Program - KonnectX" />
        <meta
          property="og:description"
          content="Invite friends to KonnectX and earn rewards with the Referral Program. Share your referral code and grow the decentralized network."
        />
      </Helmet>

    <div className="w-full">
      {/* Title and Description */}
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Invite friends to join our platform and earn amazing rewards. The more friends you bring, the more rewards you unlock!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, idx) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Referral Link Section */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Your Referral Link</h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-[#2a2b2d] border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gray-900 dark:bg-blue-800 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-blue-700"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => handleShare('facebook')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Facebook className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="px-4 py-3 bg-blue-400 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-500"
              >
                <Twitter className="w-4 h-4" />
                Tweet
              </button>
              <button 
                onClick={() => handleShare('other')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Progress to Next Reward */}
          {progress && (
            <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white">Progress to Next Reward</h2>
                <span className="text-sm text-black dark:text-gray-400">
                  Next Reward: {progress.nextMilestone?.reward || 'Max Tier Achieved'}
                </span>
              </div>
              <div className="mb-6">
                <div className="text-sm text-black dark:text-gray-400 mb-2">
                  {progress.totalReferrals}/{progress.nextMilestone?.referralsRequired || progress.milestones[progress.milestones.length - 1]?.referralsRequired} Referrals
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black dark:bg-blue-600 transition-all duration-500" 
                    style={{ width: `${progress.progress}%` }}
                  ></div>
                </div>
              </div>
              {/* Milestone Markers */}
              <div className="flex justify-between items-start">
                {progress.milestones.map((milestone) => (
                  <div key={milestone.name} className="text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto ${
                      milestone.achieved 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {milestone.achieved ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <Gift className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-black dark:text-white">{milestone.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{milestone.referralsRequired} Referrals</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            {activities.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No referral activity yet</p>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity);
                  const color = getActivityColor(activity);
                  
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2b2d] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${color}-100 dark:bg-${color}-900`}>
                          <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.referredUser.name}{' '}
                            <span className="font-normal text-gray-600 dark:text-gray-400">
                              joined using your referral
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(activity.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${
                        activity.status === 'approved' && activity.earningsAwarded > 0
                          ? 'text-green-600 dark:text-green-400'
                          : activity.status === 'pending'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-purple-600 dark:text-purple-400'
                      }`}>
                        {activity.status === 'approved' && activity.earningsAwarded > 0
                          ? `+$${activity.earningsAwarded}`
                          : activity.status.charAt(0).toUpperCase() + activity.status.slice(1)
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Top Referrers */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Top Referrers</h2>
            {leaderboard.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No leaderboard data yet</p>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((referrer, index) => (
                  <div key={referrer.userId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index < 3
                          ? 'bg-black dark:bg-blue-900 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{referrer.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{referrer.totalReferrals} Referrals</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${referrer.totalEarnings}
                    </div>
                  </div>
                ))}
                
                {/* Show current user if not in top list */}
                {currentUserRank && currentUserRank.rank > leaderboard.length && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          {currentUserRank.rank}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">You</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{currentUserRank.totalReferrals} Referrals</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${stats?.totalEarnings || 0}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Available Rewards */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Rewards</h2>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div 
                  key={reward.id} 
                  className={`pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 ${
                    reward.available ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {reward.name}
                      {reward.available && (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                          Available
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {reward.referralsRequired} referrals
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{reward.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}