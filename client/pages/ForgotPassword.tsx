import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Mail, Moon, Sun, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });

      if (response.data.success) {
        setLoading(false);
        setSuccess(true);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to send reset link.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to send reset link. Please try again."
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
              <p className="font-semibold">Email Sent!</p>
              <p className="text-sm text-green-100">Check your inbox for reset link</p>
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
        className="absolute top-6 left-6 text-white/80 hover:text-white transition flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Sign In
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                Reset link sent successfully!
              </p>
              <p className="text-xs text-green-500 dark:text-green-500">
                Please check your email inbox and spam folder.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Reset Link...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Email Sent!
                </span>
              ) : (
                "Send Reset Link"
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