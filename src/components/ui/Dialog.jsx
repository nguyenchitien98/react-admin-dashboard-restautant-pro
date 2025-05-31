import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-4 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}