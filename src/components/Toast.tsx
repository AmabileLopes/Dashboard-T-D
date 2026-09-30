import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      <span className="text-xs font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors ml-2"
      >
        <X size={15} />
      </button>
    </div>
  );
};
