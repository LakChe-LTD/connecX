import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Mail, Moon, Sun, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { resendVerificationCode, verifyEmail } from "@/api/auth/auth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useApp();
  
  const email = location.state?.email || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-focus first input
  useEffect(() => {
    const firstInput = document.getElementById("code-0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      
      const lastInput = document.getElementById("code-5");
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const verificationCode = code.join("");
    
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      console.log("🔍 Verifying email:", email);
      const response = await verifyEmail({ email, code: verificationCode });
      console.log("✅ Verification response:", response);

      if (response.success) {
        setSuccess(true);
        setLoading(false);

        // ✅ Clear any tokens - user must login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('sessionId');

        // ✅ Redirect to sign-in
        setTimeout(() => {
          navigate("/signin", { 
            replace: true,
            state: { 
              email: email,
              message: "Email verified successfully! Please sign in.",
              verified: true
            }
          });
        }, 2000);
      } else {
        setError(response.message || "Verification failed. Please try again.");
        setLoading(false);
        
        if (response.remainingAttempts !== undefined) {
          setRemainingAttempts(response.remainingAttempts);
        }
      }
    } catch (err: any) {
      console.error("❌ Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
      setLoading(false);
      
      setCode(["", "", "", "", "", ""]);
      const firstInput = document.getElementById("code-0");
      if (firstInput) {
        firstInput.focus();
      }
    }
  };

  const handleResendCode = async () => {
    if (!canResend || resending) return;

    setResending(true);
    setError("");

    try {
      const response = await resendVerificationCode({ email });

      if (response.success) {
        setCanResend(false);
        setResendTimer(60);
        setRemainingAttempts(null);
        
        const successMsg = document.getElementById("resend-success");
        if (successMsg) {
          successMsg.classList.remove("hidden");
          setTimeout(() => {
            successMsg.classList.add("hidden");
          }, 3000);
        }
      } else {
        setError(response.message || "Failed to resend code. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {success && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Email Verified!</p>
              <p className="text-sm text-green-100">Redirecting to sign in...</p>
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
        onClick={() => navigate("/register")}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition"
      >
        ← Back to Register
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-black rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a 6-digit code to
            </p>
            <p className="text-gray-800 dark:text-white font-medium mt-1">
              {email}
            </p>
          </div>

          <div id="resend-success" className="hidden mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              ✓ New verification code sent! Please check your email.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                {remainingAttempts !== null && remainingAttempts > 0 && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {remainingAttempts} {remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition text-gray-800 dark:text-white"
                  disabled={loading || success}
                  required
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading || success || code.join("").length !== 6}
              className="w-full bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verified!
                </span>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || resending}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : resendTimer > 0 ? (
                `Resend Code (${resendTimer}s)`
              ) : (
                "Resend Code"
              )}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
              💡 The code will expire in 5 minutes. If it expires, request a new one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}