import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // << Add this

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import ManageKits from "./pages/dashboard/operatorkit";
import DashboardReferral from "./pages/dashboard/Referrals";
import DashboardReward from "./pages/dashboard/Reward";
import HotspotRegistration from "./pages/dashboard/registerKit";
import KonnectXSetupGuide from "./pages/dashboard/setupguide";
import HotspotStorePage from "./pages/dashboard/Store";
import KonnectXToken from "./pages/dashboard/Token";
import AccountSettings from "./pages/dashboard/Settings";
import DashboardProfile from "./pages/dashboard/Profile";
import HotspotRegistrationStep2 from "./pages/dashboard/registerKitStep2";
import HotspotRegistrationStep3 from "./pages/dashboard/registerKitStep3";
import KonnectXKitss from "./pages/dashboard/AllKits";
import IndependentOperators from "./pages/dashboard/independentOperator";
import HotspotAcess from "./pages/dashboard/HotspotAcess";
import MyHotSpots from "./pages/dashboard/MyHotspots";
import VoucherManagement from "./pages/dashboard/Vouchers";
import FinanceDashboard from "./pages/dashboard/Finances";
import WithdrawFunds from "./pages/dashboard/Withdrawfunds";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminRewards from "./pages/admin/Hotspots";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
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
              </Route>

              <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route path="/admin/dashboard" element={<AdminOverview />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/rewards" element={<AdminRewards />} />
              </Route>

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


