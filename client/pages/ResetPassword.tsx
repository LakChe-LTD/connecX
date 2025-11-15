import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Lock, Eye, EyeOff, Moon, Sun, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme } = useApp();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // Get token from URL
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      setTokenError(true);
      setError("Invalid or missing reset token. Please request a new reset link.");
    } else {
      setToken(resetToken);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password,
      });

      if (response.data.success) {
        setLoading(false);
        setSuccess(true);
        
        // Redirect to sign in after 2 seconds
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to reset password.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to reset password. Your link may have expired."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {/* Success Alert */}
      {success && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Password Reset Successful!</p>
              <p className="text-sm text-green-100">Redirecting to sign in...</p>
            </div>
          </div>
        </div>
      )}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Back to Sign In */}
      <button
        onClick={() => navigate("/signin")}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition"
      >
        ← Back to Sign In
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your new password below
            </p>
          </div>

          {/* Token Error */}
          {tokenError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                    Invalid Reset Link
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-500">
                    This link is invalid or has expired. Please request a new password reset.
                  </p>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="mt-2 text-xs text-red-700 dark:text-red-400 underline hover:no-underline"
                  >
                    Request new reset link
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !tokenError && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                Your password has been reset successfully!
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success || tokenError}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading || success || tokenError}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success || tokenError}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading || success || tokenError}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>Password must:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li className={password.length >= 6 ? "text-green-600 dark:text-green-400" : ""}>
                  Be at least 6 characters long
                </li>
                <li className={password === confirmPassword && password ? "text-green-600 dark:text-green-400" : ""}>
                  Match in both fields
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || success || tokenError}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resetting Password...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Password Reset!
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {/* Back to Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
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