import React, { useEffect } from 'react';
import { Check, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white border-2 border-[#1E293B] rounded-2xl p-4 shadow-[6px_6px_0px_#1E293B] flex items-start gap-3.5">
        <div className={`w-8 h-8 rounded-full border-2 border-[#1E293B] flex items-center justify-center shrink-0 ${
          toast.type === 'success' ? 'bg-[#34D399] text-[#1E293B]' : 'bg-[#FBBF24] text-[#1E293B]'
        }`}>
          {toast.type === 'success' ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <Info className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-heading text-sm font-bold text-[#1E293B]">
            {toast.title}
          </p>
          {toast.description && (
            <p className="font-sans text-xs text-[#64748B] mt-0.5 leading-relaxed font-medium">
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[#64748B] hover:text-[#1E293B] w-6 h-6 rounded-full hover:bg-[#F1F5F9] flex items-center justify-center transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
