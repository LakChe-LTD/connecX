import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Menu, X, LogOut, Settings, Moon, Sun, BarChart3, TrendingUp, User, Wifi, Users, Gift, Home, ArrowLeft } from "lucide-react";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, theme, toggleTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();
  const isRewardPage = pathname === '/dashboard/reward';

  const menuItems = [
    { label: "Hotspots", path: "/dashboard/Overview", icon: Wifi },
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
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">KX</span>
              </div>
              <span className="font-bold text-sidebar-foreground">KonnectX</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition text-sidebar-foreground"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {isRewardPage ? (
            // Back button when on Reward page
            <a
              href="/dashboard/Overview"
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

        {/* Bottom Actions */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            {sidebarOpen && <span>{theme === "light" ? "Dark" : "Light"}</span>}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition hover:text-red-500"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-card border-b border-border/40 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-foreground/60">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
