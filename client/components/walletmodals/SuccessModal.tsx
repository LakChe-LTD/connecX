// client/src/components/modals/SuccessModal.tsx
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  theme: 'light' | 'dark';
}

export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message,
  theme 
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className={`w-full max-w-md mx-4 ${
        theme === 'dark' 
          ? 'bg-[#333436] border-[#2b2b2c]' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-500">
              {title}
            </h2>
            <button
              onClick={onClose}
              className={`p-1 rounded hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {message}
          </p>

          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            OK
          </Button>
        </div>
      </Card>
    </div>
  );
};