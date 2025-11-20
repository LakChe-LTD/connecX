// client/src/pages/InvitationRegister.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Eye, EyeOff, Moon, Sun, User, Lock, Loader2, CheckCircle, Mail, AlertCircle } from "lucide-react";
import axios from "axios";

interface InvitationData {
  email: string;
  role: string;
  invitedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  organization?: {
    name: string;
  };
  expiresAt: string;
}

export default function InvitationRegister() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    organizationName: "", // For organization invitations
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Verify invitation token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Invalid invitation link. No token provided.");
        setVerifying(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${API_URL}/auth/invitation/${token}`);

        if (response.data.success) {
          setInvitation(response.data.invitation);
          setError("");
        } else {
          setError("Invalid or expired invitation");
        }
      } catch (err: any) {
        console.error("Invitation verification error:", err);
        setError(err.response?.data?.error || "Failed to verify invitation. The link may be invalid or expired.");
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Validate organization name if role is organization
    if (invitation?.role === "organization" && !formData.organizationName.trim()) {
      setError("Organization name is required");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const requestData = {
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        ...(invitation?.role === "organization" && { organizationName: formData.organizationName }),
      };

      const response = await axios.post(`${API_URL}/auth/invitation/register`, requestData);

      if (response.data.success && response.data.token) {
        // Store auth token
        localStorage.setItem("token", response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        setSuccess(true);
        setLoading(false);

        // Redirect after success
        setTimeout(() => {
          navigate(response.data.redirectPath || "/dashboard", { replace: true });
        }, 1500);
      } else {
        setError(response.data.message || "Registration failed");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  // Loading state while verifying token
  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-purple-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Verifying invitation...</p>
        </div>
      </div>
    );
  }

  // Error state - invalid token
  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Invalid Invitation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <Button
              onClick={() => navigate("/register")}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Go to Registration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main registration form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {success && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Registration Successful!</p>
              <p className="text-sm text-green-100">Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition"
      >
        ← Back Home
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Complete Registration</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">You've been invited to join ConnectX</p>
          </div>

          {/* Invitation Info Card */}
          {invitation && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Invitation Details
                </span>
              </div>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <p><strong>Email:</strong> {invitation.email}</p>
                <p><strong>Role:</strong> <span className="capitalize font-semibold">{invitation.role}</span></p>
                <p><strong>Invited by:</strong> {invitation.invitedBy.firstName} {invitation.invitedBy.lastName}</p>
                {invitation.organization && (
                  <p><strong>Organization:</strong> {invitation.organization.name}</p>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">First Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                  minLength={2}
                  maxLength={30}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Last Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                  minLength={2}
                  maxLength={30}
                />
              </div>
            </div>

            {/* Organization Name - Only show for organization role */}
            {invitation?.role === "organization" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Organization Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter your organization name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                    disabled={loading || success}
                    minLength={2}
                    maxLength={100}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create your password (min 8 chars)"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading || success}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading || success}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Account Created!
                </span>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-800 hover:text-blue-400 font-semibold transition"
              disabled={loading || success}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}