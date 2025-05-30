// src/components/ui/Modal.jsx
export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-700 bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <div className="flex justify-between items-center border-b border-green-300 p-4">
          <h2 className="text-lg font-semibold text-green-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-green-900 hover:text-green-700 text-2xl font-bold leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}