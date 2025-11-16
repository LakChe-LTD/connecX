import { AlertTriangle, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  loading?: boolean;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  loading = false,
}: DeleteConfirmationDialogProps) {
  const { theme } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center pt-8">
          <div className="p-4 rounded-full bg-red-500 bg-opacity-10">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {message}
          </p>
          {itemName && (
            <p className={`text-base font-semibold mt-3 p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}>
              "{itemName}"
            </p>
          )}
          <p className={`text-xs mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 px-6 pb-6`}>
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
              theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}