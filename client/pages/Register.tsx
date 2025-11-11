import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Eye, EyeOff, Moon, Sun, User, Mail, Lock, Loader2 } from "lucide-react";
import { register } from "@/api/auth";

export default function Register() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setUser } = useApp();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode || undefined,
      };
      
      console.log("Sending registration data:", requestData);
      
      const response = await register(requestData);

      console.log("Registration response:", response);

      if (response.success && response.data) {
        const { user } = response.data;

        // Set user in context
        setUser({
          id: user._id,
          name: user.username || `${user.profile?.firstName} ${user.profile?.lastName}`,
          email: user.email,
          role: user.role as "user" | "operator" | "admin"
        });

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      // Handle error from API - check multiple possible error structures
      const errorMessage = 
        err?.message || 
        err?.error || 
        err?.data?.message || 
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition"
      >
        ← Back Home
      </button>

      <div className="w-full max-w-md">
        {/* Tab Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            className="px-12 py-3 rounded-full text-lg font-medium transition-all bg-white text-gray-800 shadow-lg"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-12 py-3 rounded-full text-lg font-medium transition-all bg-white/20 text-white hover:bg-white/30"
          >
            Login
          </button>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Register</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name */}
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
                  disabled={loading}
                  minLength={2}
                  maxLength={30}
                />
              </div>
            </div>

            {/* Last Name */}
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
                  disabled={loading}
                  minLength={2}
                  maxLength={30}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
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
                  placeholder="Create your password (min 6 chars)"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  disabled={loading}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Referral Code (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Referral Code (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="Enter referral code if you have one"
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-purple-600 mt-0.5"
                disabled={loading}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Create Account Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-gray-400 dark:text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Google</span>
            </button>

            <button
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Facebook</span>
            </button>
          </div>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-800 hover:text-blue-400 font-semibold transition"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}