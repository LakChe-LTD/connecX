import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import ManageKits from "./pages/dashboard/operatorkit";
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
import AdminRewards from "./pages/admin/Hotspots";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/dashboard/reward" element={<DashboardReward />} />
               <Route path="/dashboard/Referrals" element={<DashboardReferral />} />
                <Route path="/dashboard/setupguide" element={<KonnectXSetupGuide />} />
              <Route path="/dashboard/profile" element={<DashboardProfile />} />
              <Route path="/dashboard/Store" element={<HotspotStorePage />} />
              <Route path="/dashboard/Settings" element={<AccountSettings />} />
              <Route path="/dashboard/Token" element={<KonnectXToken />} />
               <Route path="/dashboard/operatorkit" element={< ManageKits />} />
                <Route path="/dashboard/registerKit" element={< HotspotRegistration/>} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

// 👇 Add this line
export default App;
