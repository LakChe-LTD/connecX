import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Menu, X, LogOut, Settings, Moon, Sun, BarChart3, TrendingUp, User, Wifi, Users, Home, ArrowLeft, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, theme, toggleTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

   const isRewardPage = location.pathname === "/dashboard/Reward";
   const isReferralsPage = location.pathname === "/dashboard/Referrals";
   const isSetupguidePage = location.pathname === "/dashboard/setupguide";
   const isStorePage = location.pathname === "/dashboard/Store";

  const menuItems = [
    { label: "Hotspots", path: "/dashboard/", icon: Wifi },
    { label: "Referrals", path: "/dashboard/Referrals", icon: Users },
    { label: "Rewards", path: "/dashboard/Reward", icon: Gift },
    { label: "setupguide", path: "/dashboard/setupguide", icon: Sun },
    { label: "Store", path: "/dashboard/store", icon: Home },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } ${theme === 'dark' ?  'bg-[#333436] border-[#2b2b2c]' : 'bg-gray-100 border-gray-200'} border-r transition-all duration-300 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <img
            src="/footericon/Frame4.png" 
            alt="KonnectX Logo"
            className="w-25 h20- object-contain" 
          />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {isRewardPage ? (
            // Back button when on Reward page
            <a
              href="/dashboard/"
              className={`flex items-center gap-8 px-4 py-3 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ArrowLeft className="w-7 h-7" />
              {sidebarOpen && <span className="font-Bold text-xl">Back</span>}
            </a>
          ) : (
            // Regular menu items
            menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-8 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-blue-600 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <item.icon className="w-7 h-7" />
                {sidebarOpen && <span className="font-Bold text-xl">{item.label}</span>}
              </a>
            ))
          )}
        </nav>

        {/* Bottom Section */}
        <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
          {/* Dark Mode & Logout */}
          <div className="p-4 space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-200'
              } ${!sidebarOpen && "justify-center"}`}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {sidebarOpen && <span className="font-medium">{theme === "light" ? "Dark" : "Light"}</span>}
            </button>
            <button
              onClick={logout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:text-red-500 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-200'
              } ${!sidebarOpen && "justify-center"}`}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>

          {/* User Profile */}
          {sidebarOpen && (
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    John Doe
                  </p>
                  <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    victorajuzie580@gmail.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
               <header className={`px-6 py-4 flex items-center justify-between relative ${theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-2xl font-bold ${
            isReferralsPage || isSetupguidePage 
              ? `absolute left-1/2 transform -translate-x-1/2 ${theme === 'dark' ? 'text-white' : 'text-foreground'}` 
              : theme === 'dark' ? 'text-white' : 'text-foreground'
          }`}>
            {isRewardPage ? "Rewards Dashboard"  :    isReferralsPage ? "Referrals Program"  : isSetupguidePage? "Setup Guide" :  "Dashboard Overview"}
          </h2>
          <div className="flex items-center gap-3 ml-auto">
            {isRewardPage ? (
              <>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  theme === 'dark'
                    ? 'text-blue-500 bg-gray-900 border border-blue-500 hover:bg-gray-800'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}>
                  Join Smith
                </button>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  theme === 'dark'
                    ? 'text-black bg-blue-500 hover:bg-gray-200'
                    : 'text-white bg-gray-900 hover:bg-gray-800'
                }`}>
                  Connect Wallet
                </button>
              </>
            ) : isSetupguidePage ? (
              <button className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                theme === 'dark'
                  ? 'text-white bg-gray-900 border border-gray-700 hover:bg-gray-800'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}>
                English
                <span className="ml-1">▼</span>
              </button>
            ) : isReferralsPage ? (
              <button className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                theme === 'dark'
                  ? 'text-white bg-gray-900 border border-gray-700 hover:bg-gray-800'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}>
                <User className="w-4 h-4" />
                My account
              </button>
            ) : (
              <>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  theme === 'dark'
                    ? 'text-blue-500 bg-gray-900 border border-blue-500 hover:bg-gray-800'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}>
                  ↑ Export
                </button>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  theme === 'dark'
                    ? 'text-black bg-blue-500 hover:bg-gray-200'
                    : 'text-white bg-gray-900 hover:bg-gray-800'
                }`}>
                  + Add Hotspot
                </button>
              </>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition lg:hidden ${
                theme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-accent text-foreground'
              }`}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
        {/* Page Content */}
        <main className={`flex-1 overflow-auto ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}