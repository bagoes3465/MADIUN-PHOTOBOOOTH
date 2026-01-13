import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ 
  id, 
  type = 'info', 
  message, 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertCircle className="text-yellow-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />
  };

  const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500'
  };

  return (
    <div className={`toast ${type} ${borderColors[type]}`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {message}
        </p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        aria-label="Close notification"
      >
        <X size={16} className="text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, duration) => showToast(message, 'success', duration);
  const error = (message, duration) => showToast(message, 'error', duration);
  const warning = (message, duration) => showToast(message, 'warning', duration);
  const info = (message, duration) => showToast(message, 'info', duration);

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info
  };
};

export default Toast;