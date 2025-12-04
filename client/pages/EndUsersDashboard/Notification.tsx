import React, { useState } from 'react';
import { Bell, AlertCircle, CreditCard, Trash2, Check } from 'lucide-react';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'subscription',
      title: 'Subscription Renewal',
      message: 'Your Monthly Premium plan will renew in 3 days',
      date: '12/11/2025 at 09:00:00',
      isNew: true,
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Low Data Alert',
      message: 'You have used 80% of your monthly data',
      date: '11/11/2025 at 13:00:00',
      isNew: false,
      read: true
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $29.99 was processed successfully',
      date: '01/11/2025 at 10:00:00',
      isNew: false,
      read: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true, isNew: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true, isNew: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'subscription':
        return <Bell className="w-6 h-6 text-blue-500" />;
      case 'alert':
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case 'payment':
        return <CreditCard className="w-6 h-6 text-green-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
                <p className="text-base text-gray-600 mt-2 font-medium">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Check className="w-5 h-5" />
                Mark All Read
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 px-8 pt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-2 text-base font-bold transition-colors relative ${
                activeTab === 'all'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
              {activeTab === 'all' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
              <span className="ml-2 px-2.5 py-1 text-sm font-bold bg-gray-100 text-gray-700 rounded-full">
                {notifications.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`pb-4 px-2 text-base font-bold transition-colors relative ${
                activeTab === 'unread'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Unread
              {activeTab === 'unread' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('read')}
              className={`pb-4 px-2 text-base font-bold transition-colors relative ${
                activeTab === 'read'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Read
              {activeTab === 'read' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-8 transition-colors ${
                  !notification.read ? 'bg-blue-50/40' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="mt-1.5">{getIcon(notification.type)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {notification.title}
                      </h3>
                      {notification.isNew && (
                        <span className="px-3 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-md">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-base text-gray-700 mb-3 font-medium leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{notification.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="p-16 text-center text-gray-500">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold">No {activeTab !== 'all' ? activeTab : ''} notifications</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View Button */}
      <button className="fixed bottom-8 right-8 px-7 py-3.5 bg-blue-600 text-white text-base font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
        Mobile View
      </button>
    </div>
  );
}