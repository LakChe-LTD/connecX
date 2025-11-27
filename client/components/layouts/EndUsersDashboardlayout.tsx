import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Menu, X, LogOut, Settings, Moon, Sun, Wifi, Users, Home, ArrowLeft, Gift, Heart, ShoppingCart, DollarSign, ChevronDown, ChevronRight, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateHotspotModal from "@/components/CreateHotspotModal";

export default function EndUserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, theme, toggleTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operatorKitOpen, setOperatorKitOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  const isRewardPage = location.pathname === "/dashboard/Reward";
  const isReferralsPage = location.pathname === "/dashboard/Referrals";
  const isSetupguidePage = location.pathname === "/dashboard/setupguide";
  const isStorePage = location.pathname === "/dashboard/store";
  const isTokenPage = location.pathname === "/dashboard/Token";
  const isSettingsPage = location.pathname === "/dashboard/Settings";
  const isregisterKitPage = location.pathname === "/dashboard/registerKit";
  const isregisterKitpageStep2 = location.pathname === "/dashboard/registerKitStep3"
  const isregisterKitpageStep3 = location.pathname === "/dashboard/registerKitStep2"
  const Independentoperator = location.pathname === "/dashboard/independentOperator";
  const HotspotAcess = location.pathname === "/dashboard/HotspotAcess";
  const Vouchers = location.pathname === "/dashboard/Vouchers";
  const Finances = location.pathname === "/dashboard/Finances";
  const Withdrawfunds = location.pathname === "/dashboard/Withdrawfunds";
  const isAllKitsPage = location.pathname === "/dashboard/allkits";
  const isOperatorKitPage = location.pathname === "/dashboard/operatorkit";




  const menuItems = [
    { label: "Dashboard", path: "/Dashboardoverview", icon: Wifi},
    { label: "Hotspots", path: "/Hotspots", icon: Wifi },
    { label: "Plans", path: "/dashboard/Referrals", icon: Users },
    { label: "Subcriptions", path: "/Subscription", icon: Gift },
    { label: "Wallet", path: "/Wallet", icon: Sun },
    { label: "Profile", path: "/dashboard/store", icon: Home },
    { label: "Notification", path: "/dashboard/Settings", icon: Settings },
  ];


  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); 
      } else {
        setSidebarOpen(false); 
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch start handler for mobile sidebar
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX.current;
    
    if (sidebarOpen) {
      // Dragging to close (swipe left)
      if (diff < 0) {
        setDragPosition(Math.max(diff, -256)); // 256px = sidebar width
      }
    } else {
      // Dragging to open (swipe right from edge)
      if (dragStartX.current < 20 && diff > 0) {
        setDragPosition(Math.min(diff - 256, 0));
      }
    }
  };
const handleLogoutClick = () => {
  // Show confirmation dialog
  if (window.confirm('Are you sure you want to logout?')) {
    logout();
  }
};
  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return;
    setIsDragging(false);
    
    // Determine if sidebar should open or close based on drag distance
    if (Math.abs(dragPosition) > 128) {
      setSidebarOpen(!sidebarOpen);
    }
    
    setDragPosition(0);
  };

  const handleHotspotCreated = (hotspot: any) => {
    console.log("Hotspot created successfully!", hotspot);
    window.dispatchEvent(new CustomEvent('hotspotCreated', { detail: hotspot }));
  };

  const handleOperatorKitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sidebarOpen && !isMobile) {
      setOperatorKitOpen(!operatorKitOpen);
    } else {
      navigate("/dashboard/operatorkit");
    }
  };

  function getInitials(name?: string, email?: string): string {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      } else if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
      }
    }
    
    if (email) {
      const emailPrefix = email.split('@')[0];
      const words = emailPrefix.match(/[A-Za-z]+/g) || [];
      if (words.length >= 2) {
        return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
      }
      return emailPrefix.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  }

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
      {/* Create Hotspot Modal */}
      <CreateHotspotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleHotspotCreated}
      />

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isMobile && isDragging ? `translateX(${dragPosition}px)` : undefined,
        }}
        className={`
          ${isMobile ? 'fixed' : 'relative'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isMobile ? 'w-64' : sidebarOpen ? 'w-64' : 'w-20'}
          ${theme === 'dark' ? 'bg-[#333436] border-[#2b2b2c]' : 'bg-gray-100 border-gray-200'}
          border-r transition-all duration-300 flex flex-col h-full z-50
          ${isMobile ? 'top-0 left-0' : ''}
        `}
      >
        {/* Logo Section - Always Visible */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${sidebarOpen || isMobile ? 'gap-3' : 'justify-center w-full'}`}>
              <img 
                src="/KonnectXLogo.png" 
                alt="KonnecX Logo"
                className={`${sidebarOpen || isMobile ? 'h-220 w-220' : 'h-220 w-220'} object-contain transition-all duration-300`}
              />
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              >
                <X size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {isRewardPage || isStorePage ? (
            <a
              href="/dashboard/"
              className={`flex items-center ${isMobile ? 'gap-4' : 'gap-8'} px-4 py-3 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ArrowLeft className="w-7 h-7 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span className="font-bold text-xl">Back</span>}
            </a>
          ) : (
            <>
              {/* Regular menu items */}
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center ${isMobile ? 'gap-4' : 'gap-8'} px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-black text-white dark:bg-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-blue-600 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  <item.icon className="w-7 h-7 flex-shrink-0" />
                  {(sidebarOpen || isMobile) && <span className="font-bold text-xl">{item.label}</span>}
                </a>
              ))}

              {/* Operator Kit with Dropdown */}
              <div>
                <div className={`w-full flex items-center justify-between ${isMobile ? 'gap-4' : 'gap-8'} px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === "/dashboard/operatorkit" || location.pathname === "/dashboard/allkits"
                      ? 'bg-black text-white dark:bg-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-blue-600 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-900 hover:text-white'
                  }`}>
                  <a
                    href="/dashboard/operatorkit"
                    onClick={(e) => { e.preventDefault(); navigate('/dashboard/operatorkit'); }}
                    className="flex items-center gap-4 flex-1"
                  >
                    <DollarSign className="w-7 h-7 flex-shrink-0" />
                    {(sidebarOpen || isMobile) && <span className="font-bold text-xl">Operator Kit</span>}
                  </a>

                  {(sidebarOpen || isMobile) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setOperatorKitOpen((s) => !s); }}
                      aria-expanded={operatorKitOpen}
                      aria-controls="operator-kit-dropdown"
                      className="p-1 rounded focus:outline-none"
                    >
                      {operatorKitOpen ? <ChevronDown className="w-5 h-5 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 flex-shrink-0" />}
                    </button>
                  )}
                </div>

                {/* Dropdown Menu */}
                {(sidebarOpen || isMobile) && operatorKitOpen && (
                  <div id="operator-kit-dropdown" className="ml-4 mt-1 space-y-1">
                    <a
                      href="/dashboard/allkits"
                      onClick={(e) => { e.preventDefault(); navigate('/dashboard/allkits'); }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                        location.pathname === "/dashboard/allkits"
                          ? 'bg-black text-white dark:bg-blue-600'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:bg-blue-600 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-900 hover:text-white'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current flex-shrink-0" />
                      <span className="font-medium text-base">All Kits</span>
                    </a>
                  </div>
                )}
              </div>
            </>
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
              } ${!sidebarOpen && !isMobile && "justify-center"}`}
            >
              {theme === "light" ? <Moon className="w-5 h-5 flex-shrink-0" /> : <Sun className="w-5 h-5 flex-shrink-0" />}
              {(sidebarOpen || isMobile) && <span className="font-medium">{theme === "light" ? "Dark" : "Light"}</span>}
            </button>
          
<button
  onClick={logout}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:text-red-500 ${
    theme === 'dark' 
      ? 'text-gray-300 hover:bg-gray-800' 
      : 'text-gray-700 hover:bg-gray-200'
  } ${!sidebarOpen && !isMobile && "justify-center"}`}
>
  <LogOut className="w-5 h-5 flex-shrink-0" />
  {(sidebarOpen || isMobile) && <span className="font-medium">Logout</span>}
</button>
          </div>

          {/* User Profile */}
          {(sidebarOpen || isMobile) && user && (
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {user.initials || getInitials(user.name, user.email)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {user.name || 'User'}
                  </p>
                  <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className={`px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative ${theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-gray-50'}`}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`lg:hidden p-2 rounded-lg transition mr-2 ${
              theme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-accent text-foreground'
            }`}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Collapse Button */}
          {!isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hidden lg:block p-2 rounded-lg transition mr-4 ${
                theme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-accent text-foreground'
              }`}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          {(isOperatorKitPage || isregisterKitPage || isregisterKitpageStep2 || isregisterKitpageStep3 || Independentoperator || HotspotAcess || Vouchers || Finances || Withdrawfunds) ? (
            <>
              <h2 className={`text-lg sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                {isOperatorKitPage ? "Manage Kit" : isregisterKitpageStep2 ? "Register Kit": isregisterKitpageStep3 ? "Register Kit": ""}
              </h2>

              {/* Centered Wide Search Button */}
              <div className="flex-1 flex justify-center items-center px-4 sm:px-8 max-w-md mx-auto">
                <button className={`flex items-center justify-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition w-full ${
                  theme === 'dark'
                    ? 'text-gray-300 bg-gray-900 border border-gray-700 hover:bg-gray-800'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}>
                  <Search className="w-5 h-5" />
                  <span>Search Kits</span>
                </button>
              </div>

              {/* Right Side Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* KYC Button */}
                <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  <Heart className="w-5 h-5" />
                  <span className="hidden sm:inline">KYC</span>
                </button>

                {/* Kits Cart Button */}
                <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Kits</span>
                </button>

                {/* Account Button */}
                <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Account</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className={`text-lg sm:text-2xl font-bold truncate ${
                isReferralsPage || isSetupguidePage 
                  ? `flex-1 text-center ${theme === 'dark' ? 'text-white' : 'text-foreground'}` 
                  : theme === 'dark' ? 'text-white' : 'text-foreground'
              }`}>
                {isAllKitsPage ? "All Kits" : isRewardPage ? "Rewards Dashboard" : isReferralsPage ? "Referrals Program" : isSetupguidePage ? "Setup Guide" : isStorePage ? "Store" : isTokenPage ? "Claim & Withdraw" : isSettingsPage ? "Account Settings" : "Dashboard Overview"}
              </h2>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                {isRewardPage ? (
                  <>
                    <button className={`hidden sm:flex px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark'
                        ? 'text-blue-500 bg-gray-900 border border-blue-500 hover:bg-gray-800'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}>
                      Join Smith
                    </button>
                    <button className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark'
                        ? 'text-black bg-blue-500 hover:bg-gray-200'
                        : 'text-white bg-gray-900 hover:bg-gray-800'
                    }`}>
                      <span className="hidden sm:inline">Connect Wallet</span>
                      <span className="sm:hidden">Connect</span>
                    </button>
                  </>
                ) : isSetupguidePage ? (
                  <button className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'text-blue-700 bg-gray-900 border border-blue-700 hover:bg-gray-800'
                      : 'text-gray-700 bg-white border border-black hover:bg-gray-50'
                  }`}>
                    English
                    <span className="ml-1">▼</span>
                  </button>
                ) : isSettingsPage ? (
                  <button className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'text-black bg-blue-700 border border-blue-700 hover:bg-gray-800'
                      : 'text-white bg-black border border-black hover:bg-gray-50'
                  }`}>
                    <span className="hidden sm:inline">John Doe</span>
                    <User className="sm:hidden w-4 h-4" />
                  </button>
                ) : isStorePage ? (
                  <>
                    <button className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Heart className="w-3 h-3" />
                      KYC
                    </button>
                    <button className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Cart</span>
                      {0}
                    </button>
                    <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Account</span>
                    </button>
                  </>
                ) : isReferralsPage ? (
                  <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                    theme === 'dark'
                      ? 'text-black bg-blue-700 border border-gray-700'
                      : 'text-white bg-black border border-gray-300'
                  }`}>
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">My Account</span>
                  </button>
                ) : (
                  <>
                    <button className={`hidden sm:flex px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                      theme === 'dark'
                        ? 'text-blue-500 bg-gray-900 border border-blue-500 hover:bg-gray-800'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}>
                      ↑ Export
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition whitespace-nowrap ${
                        theme === 'dark'
                          ? 'text-black bg-blue-500 hover:bg-blue-600'
                          : 'text-white bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      <span className="hidden sm:inline">+ Add Hotspot</span>
                      <span className="sm:hidden">+ Add</span>
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </header>

        {/* Page Content */}
        <main className={`flex-1 overflow-auto ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
          <div className="p-3 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}