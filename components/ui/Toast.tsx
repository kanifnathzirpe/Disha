'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        let bg = 'bg-slate-900 text-white';
        let icon = <Info size={18} className="text-blue-400 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-[#0f4028] text-white border border-emerald-600/40 shadow-lg';
          icon = <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-[#401212] text-white border border-red-600/40 shadow-lg';
          icon = <AlertCircle size={18} className="text-red-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-[#402d0f] text-white border border-amber-600/40 shadow-lg';
          icon = <AlertTriangle size={18} className="text-amber-400 shrink-0" />;
        } else {
          bg = 'bg-[#12284c] text-white border border-blue-600/40 shadow-lg';
          icon = <Info size={18} className="text-blue-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg text-xs font-medium backdrop-blur-md shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bg}`}
            role="status"
          >
            {icon}
            <div className="flex-1 leading-snug">{toast.message}</div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
