import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock sign in
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: email,
      role: "user" as const
    };
    
    setUser(mockUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center p-4">
      {/* Header */}
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

      {/* Sign In Card */}
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden">
          {/* Logo */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold text-lg">KX</span>
            </div>
            <h1 className="text-2xl font-bold text-white">KonnectX</h1>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Sign In</h2>

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-input" />
                  <span className="text-foreground/70">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 transition">Forgot password?</a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition h-10"
              >
                Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-foreground/70">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary hover:text-primary/80 font-medium transition"
              >
                Create one
              </button>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/10 backdrop-blur rounded-lg p-4 text-white/80 text-sm">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: demo@konnectx.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}
