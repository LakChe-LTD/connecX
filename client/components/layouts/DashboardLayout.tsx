import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Menu, X, LogOut, Settings, Moon, Sun, Wifi, Users, Gift, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, theme, toggleTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isRewardPage = location.pathname === "/dashboard/Reward";

  const menuItems = [
    { label: "Hotspots", path: "/dashboard/hotspots", icon: Wifi },
    { label: "Referrals", path: "/dashboard/referrals", icon: Users },
    { label: "Rewards", path: "/dashboard/Reward", icon: Gift },
    { label: "Store", path: "/dashboard/store", icon: Home },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="/footericon/Frame4.png" 
            alt="KonnectX Logo"
            className="w-25 h-25 object-contain" 
          />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {isRewardPage ? (
            // Back button when on Reward page
            <a
              href="/dashboard/hotspots"
              className="flex items-center gap-8 px-4 py-3 rounded-lg transition bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800"
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
                className={`flex items-center gap-8 px-4 py-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 "
                    : "text-sidebar-foreground hover:bg-black hover:text-white"
                }`}
              >
                <item.icon className="w-7 h-7" />
                {sidebarOpen && <span className="font-Bold text-xl">{item.label}</span>}
              </a>
            ))
          )}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border">
          {/* Dark Mode & Logout */}
          <div className="p-4 space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition ${
                !sidebarOpen && "justify-center"
              }`}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {sidebarOpen && <span className="font-medium">{theme === "light" ? "Dark" : "Light"}</span>}
            </button>
            <button
              onClick={logout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition hover:text-red-500 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>

          {/* User Profile */}
          {sidebarOpen && (
            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">John Doe</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">victorajuzie580@gmail.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {isRewardPage ? "Rewards Dashboard" : "Dashboard Overview"}
          </h2>
          <div className="flex items-center gap-3">
            {isRewardPage ? (
              <>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Join Smith
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  Connect Wallet
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  ↑ Export
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  + Add Hotspot
                </button>
              </>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent rounded-lg transition text-foreground lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}