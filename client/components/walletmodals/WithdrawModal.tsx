// client/src/components/modals/WithdrawModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, address: string) => void;
  loading: boolean;
  availableBalance: number;
  theme: 'light' | 'dark';
}

export const WithdrawModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  loading,
  availableBalance,
  theme 
}: WithdrawModalProps) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError('');

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    if (!address || !address.startsWith('0x')) {
      setError('Please enter a valid wallet address (0x...)');
      return;
    }

    onConfirm(parseFloat(amount), address);
  };

  const handleClose = () => {
    setAmount('');
    setAddress('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className={`w-full max-w-md mx-4 ${
        theme === 'dark' 
          ? 'bg-[#333436] border-[#2b2b2c]' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Withdraw Funds
            </h2>
            <button
              onClick={handleClose}
              className={`p-1 rounded hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Available Balance */}
          <div className={`mb-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Available Balance
            </p>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {availableBalance.toFixed(2)} KXT
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => setAmount(availableBalance.toString())}
                className="mt-1 text-sm text-blue-500 hover:text-blue-600"
              >
                Max
              </button>
            </div>

            {/* Address Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                External Wallet Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleClose}
              variant="outline"
              className={`flex-1 ${
                theme === 'dark'
                  ? 'border-gray-800 hover:bg-gray-900 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};