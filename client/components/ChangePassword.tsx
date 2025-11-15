import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        oldPassword: formData.currentPassword,  // Backend expects 'oldPassword'
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        setLoading(false);
        setSuccess(true);
        
        // Clear form after success
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(response.data.message || "Failed to change password.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to change password. Please check your current password."
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess(false);
  };

  return (
    <div className="bg-white rounded-xl dark:bg-[#333436] p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Change Password</h3>
        <p className="text-xs text-gray-500 dark:text-gray-300">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              Password changed successfully!
            </p>
            <p className="text-xs text-green-500 dark:text-green-500 mt-1">
              Your password has been updated.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={loading || success}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (min 6 chars)"
              className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
              required
              disabled={loading || success}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={loading || success}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-[#1a1b1e] rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-blue-600"
              required
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={loading || success}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 bg-gray-50 dark:bg-[#1a1b1e] p-3 rounded-lg">
          <p className="font-medium text-gray-700 dark:text-gray-300">Password requirements:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li className={formData.newPassword.length >= 6 ? "text-green-600 dark:text-green-400" : ""}>
              At least 6 characters long
            </li>
            <li className={formData.newPassword === formData.confirmPassword && formData.newPassword ? "text-green-600 dark:text-green-400" : ""}>
              Passwords match
            </li>
            <li className={formData.currentPassword && formData.newPassword !== formData.currentPassword ? "text-green-600 dark:text-green-400" : ""}>
              Different from current password
            </li>
          </ul>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading || success}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-[#1a1b1e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || success}
            className="flex-1 px-6 py-3 bg-gray-900 text-white dark:bg-blue-700 text-sm rounded-md hover:bg-gray-800 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Updated!
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}