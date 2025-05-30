// SidebarNotification.jsx
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const COLORS = {
  info: 'rgba(59, 130, 246, 0.85)', // blue-500
  success: 'rgba(16, 185, 129, 0.85)', // green-500
  warning: 'rgba(251, 191, 36, 0.85)', // yellow-400
  error: 'rgba(239, 68, 68, 0.85)', // red-500
};

export default function SidebarNotification({ message, visible, type = 'error', onClose }) {
  const Icon = ICONS[type] || Info;
  const bgColor = COLORS[type] || COLORS.error;

  return (
    <div
      className={`
        fixed top-0 left-4 z-50
        transform transition-all duration-300 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      style={{
        marginLeft: '5rem', // w-20 (80px)
        background: bgColor,
        backdropFilter: 'blur(6px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        borderBottomRightRadius: '1rem',
        padding: '1rem 1.25rem',
        color: 'white',
        minWidth: '280px',
        maxWidth: '360px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <Icon className="w-6 h-6" />

      <div className="flex-1 text-sm font-medium leading-snug">
        {message}
      </div>

      <button onClick={onClose} className="hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}