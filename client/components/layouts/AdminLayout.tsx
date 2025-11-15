import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Menu, X, LogOut, Moon, Sun, Wifi, Share, DollarSign, BarChart3, Users, Search, Bell, Gift } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, theme, toggleTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "User", path: "/admin", icon: Users },
    { label: "Hotspots", path: "/admin/users", icon: Wifi },
    { label: "Referrals", path: "/admin/rewards", icon: Share },
    { label: "Payouts", path: "/admin/rewards", icon: DollarSign },
  ];

  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     navigate("/signin");
  //   }
  // }, [user, navigate]);

 
  // if (!user || user.role !== "admin") {
  //   return null;
  // }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } ${theme === 'dark' ?  'bg-[#333436] border-[#2b2b2c]' : 'bg-gray-100 border-gray-200'} border-r transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
          <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
           {sidebarOpen && (
            <div className="flex items-center gap-2">
          <img
            src="/footericon/Frame4.png"
           alt="KonnectX Logo"
          className="w-20 h-20 object-contain"
        />
    </div>
  )}

  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 hover:bg-sidebar-accent rounded-lg transition text-sidebar-foreground"
  >
    {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
  </button>
   </div>

        <div className="flex items-center gap-5">
            <div className="text-right">
               <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {user.name.charAt(0)}
               
                </div>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-foreground/60">Administrator</p>
              
            </div>
           
          </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
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
        <header className={`px-6 py-4 flex items-center justify-between relative ${theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-gray-50'}`}>
          <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-sm text-gray-300">Overview and management of platform activities</p>
           </div>
          <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600 " />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full dark:bg-gray-300"></span>
              </button>
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
