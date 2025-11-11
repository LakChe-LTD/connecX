import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardReferral from "./pages/dashboard/Referrals";
import DashboardReward from "./pages/dashboard/Reward";
import KonnectXSetupGuide from "./pages/dashboard/setupguide";
import HotspotStorePage from "./pages/dashboard/Store";
import KonnectXToken from "./pages/dashboard/Token";
import AccountSettings from "./pages/dashboard/Settings";
import DashboardProfile from "./pages/dashboard/Profile";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminRewards from "./pages/admin/Rewards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Operator Route Component
const OperatorRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== "operator" && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />

            {/* User Dashboard Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/dashboard/reward" element={<DashboardReward />} />
              <Route path="/dashboard/referrals" element={<DashboardReferral />} />
              <Route path="/dashboard/setupguide" element={<KonnectXSetupGuide />} />
              <Route path="/dashboard/profile" element={<DashboardProfile />} />
              <Route path="/dashboard/store" element={<HotspotStorePage />} />
              <Route path="/dashboard/settings" element={<AccountSettings />} />
              <Route path="/dashboard/token" element={<KonnectXToken />} />
            </Route>

            {/* Operator Dashboard Routes */}
            <Route
              element={
                <OperatorRoute>
                  <DashboardLayout />
                </OperatorRoute>
              }
            >
              <Route path="/operator/dashboard" element={<DashboardOverview />} />
              <Route path="/operator/reward" element={<DashboardReward />} />
              <Route path="/operator/referrals" element={<DashboardReferral />} />
              <Route path="/operator/setupguide" element={<KonnectXSetupGuide />} />
              <Route path="/operator/profile" element={<DashboardProfile />} />
              <Route path="/operator/store" element={<HotspotStorePage />} />
              <Route path="/operator/settings" element={<AccountSettings />} />
              <Route path="/operator/token" element={<KonnectXToken />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

export default App;