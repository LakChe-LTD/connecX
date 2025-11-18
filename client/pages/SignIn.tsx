import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Eye, EyeOff, Mail, Lock, Moon, Sun, Loader2, CheckCircle } from "lucide-react";
import { login } from "@/api/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "operator" | "admin">("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await login({ email, password });

      // Handle 2FA
      if (response.requires2FA) {
        localStorage.setItem('tempToken', response.tempToken!);
        setLoading(false);
        navigate("/verify-2fa");
        return;
      }

      // Check if login was successful
      if (!response.success || !response.user) {
        setError("Login failed. No user data received.");
        setLoading(false);
        return;
      }

      const user = response.user;

      // Role validation - only restrict admin login for now
      if (selectedRole === "admin" && user.role !== "admin") {
        setError("You don't have admin access. Please contact support.");
        setLoading(false);
        return;
      }
      
      // Allow all users and operators to access the dashboard
      // (User and Admin dashboards are still being designed)

      // Success! Stop loading and show success alert
      setLoading(false);
      setSuccess(true);

      // Set user in context
      const userData = {
        id: user.id,
       name: user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.firstName || user.email.split('@')[0],
        email: user.email,
        role: user.role as "user" | "operator" | "admin",
        firstName: user.firstName,
         lastName: user.lastName,
  // Generate proper initials
      initials: user.firstName && user.lastName
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : user.firstName
    ? user.firstName.substring(0, 2).toUpperCase()
    : user.email.substring(0, 2).toUpperCase()
      };



      setUser(userData);

      // Redirect after showing success message
      setTimeout(() => {
        // For now, everyone goes to the operator dashboard
        // Admin and User dashboards are still being designed
        navigate("/dashboard", { replace: true });
      }, 1500);

    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
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
              <p className="font-semibold">Login Successful!</p>
              <p className="text-sm text-green-100">Redirecting to dashboard...</p>
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
        <div className="flex gap-4 justify-center mb-8">
          <button className="px-12 py-3 rounded-full text-lg font-medium transition-all bg-white text-gray-800 shadow-lg">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-12 py-3 rounded-full text-lg font-medium transition-all bg-white/20 text-white hover:bg-white/30"
          >
            Register
          </button>
        </div>

        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Sign In</h2>
            
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as "user" | "operator" | "admin")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer appearance-none pr-10"
                disabled={loading || success}
              >
                <option value="user">User Login</option>
                <option value="operator">Operator Login</option>
                {/* <option value="admin">Admin Login</option> */}
              </select>
              <svg 
                className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 dark:text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
              selectedRole === 'admin' 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                : selectedRole === 'operator'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {selectedRole === 'admin' && '🔐 Admin Access'}
              {selectedRole === 'operator' && '⚙️ Operator Access'}
              {selectedRole === 'user' && '👤 User Access'}
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  required
                  disabled={loading || success}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 accent-purple-600" 
                  disabled={loading || success} 
                />
                <span className="text-gray-500 dark:text-gray-400">Remember me</span>
              </label>
              <button
  type="button"
  onClick={() => navigate("/forgot-password")}
  className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition font-medium"
  disabled={loading || success}
>
  Forgot password?
</button>
            </div>

            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Logged In!
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-gray-400 dark:text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              disabled={loading || success}
              className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Google</span>
            </button>

            <button
              type="button"
              disabled={loading || success}
              className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Facebook</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-800 hover:text-blue-400 font-semibold transition"
              disabled={loading || success}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}