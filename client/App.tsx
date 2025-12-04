import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";

// Authentication Imports
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvitationRegister from "./pages/InvitationRegister";



// EndUsers Dashboard Imports
import EndUserDashboardLayout from "./components/layouts/EndUsersDashboardlayout";
import KonnectXEndusersDashboard from "./pages/EndUsersDashboard/Dashboardoverview";
import KonnectXEndUsersHotspots from "./pages/EndUsersDashboard/Hotspots";
import SubscriptionsPage from "./pages/EndUsersDashboard/Subscription";
import WalletDashboard from "./pages/EndUsersDashboard/Wallet";
import ProfileSettings from "./pages/EndUsersDashboard/Profile";
import NotificationPanel from "./pages/EndUsersDashboard/Notification";





// Operators Dashboard Imports
import DashboardLayout from "./components/layouts/OperatorDashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import ManageKits from "./pages/OperatorsDashboard/operatorkit";
import DashboardReferral from "./pages/OperatorsDashboard/Referrals";
import DashboardReward from "./pages/OperatorsDashboard/Reward";
import HotspotRegistration from "./pages/OperatorsDashboard/registerKit";
import KonnectXSetupGuide from "./pages/OperatorsDashboard/setupguide";
import HotspotStorePage from "./pages/OperatorsDashboard/Store";
import KonnectXToken from "./pages/OperatorsDashboard/Token";
import AccountSettings from "./pages/OperatorsDashboard/Settings";
import DashboardProfile from "./pages/OperatorsDashboard/Profile";
import HotspotRegistrationStep2 from "./pages/OperatorsDashboard/registerKitStep2";
import HotspotRegistrationStep3 from "./pages/OperatorsDashboard/registerKitStep3";
import KonnectXKitss from "./pages/OperatorsDashboard/AllKits";
import IndependentOperators from "./pages/OperatorsDashboard/independentOperator";
import HotspotAcess from "./pages/OperatorsDashboard/HotspotAcess";
import MyHotSpots from "./pages/OperatorsDashboard/MyHotspots";
import VoucherManagement from "./pages/OperatorsDashboard/Vouchers";
import FinanceDashboard from "./pages/OperatorsDashboard/Finances";
import WithdrawFunds from "./pages/OperatorsDashboard/Withdrawfunds";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminRewards from "./pages/admin/Hotspots";
import NotFound from "./pages/NotFound";
import ChangePassword from "./components/ChangePassword";





const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// Operator Route Component
const OperatorRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (user?.role !== "operator" && user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              
              {/* ✅ Password Reset Routes - ADD THESE */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Invitation Route */}
              <Route path="/invitation/register" element={<InvitationRegister />} />


                 {/* Protected EndUsers Dashboard Routes */}
              <Route element={<EndUserDashboardLayout />}>
              <Route path="/Dashboardoverview" element={< KonnectXEndusersDashboard />} />
              <Route path="/Hotspots" element={< KonnectXEndUsersHotspots />} />
               <Route path="/Subscription" element={<SubscriptionsPage/>} />
               <Route path="/Wallet" element={<WalletDashboard/>} />
                <Route path="/Profile" element={<ProfileSettings/>} />
                <Route path="/Notification" element={<NotificationPanel/>} />
             
              
              </Route>
                





              {/* Protected OPerator Dashboard Routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/dashboard/reward" element={<DashboardReward />} />
                <Route path="/dashboard/Referrals" element={<DashboardReferral />} />
                <Route path="/dashboard/setupguide" element={<KonnectXSetupGuide />} />
                <Route path="/dashboard/profile" element={<DashboardProfile />} />
                <Route path="/dashboard/Store" element={<HotspotStorePage />} />
                <Route path="/dashboard/Settings" element={<AccountSettings />} />
                <Route path="/dashboard/Token" element={<KonnectXToken />} />
                <Route path="/dashboard/operatorkit" element={<ManageKits />} />
                <Route path="/dashboard/registerKit" element={<HotspotRegistration />} />
                <Route path="/dashboard/registerKitStep2" element={<HotspotRegistrationStep2 />} />
                <Route path="/dashboard/registerKitStep3" element={<HotspotRegistrationStep3 />} />
                <Route path="/dashboard/Allkits" element={<KonnectXKitss />} />
                <Route path="/dashboard/independentOperator" element={<IndependentOperators />} />
                <Route path="/dashboard/HotspotAcess" element={<HotspotAcess />} />
                <Route path="/dashboard/MyHotspots" element={<MyHotSpots />} />
                <Route path="/dashboard/Vouchers" element={<VoucherManagement />} />
                <Route path="/dashboard/Finances" element={<FinanceDashboard />} />
                <Route path="/dashboard/Withdrawfunds" element={<WithdrawFunds />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route path="/admin/dashboard" element={<AdminOverview />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/rewards" element={<AdminRewards />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
export default App;