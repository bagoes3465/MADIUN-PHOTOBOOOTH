import React from 'react';

export const Card = ({ 
  children, 
  title = null,
  subtitle = null,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200',
    dark: 'bg-gray-800 text-white border border-gray-700',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    danger: 'bg-red-50 border border-red-200'
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 ${variants[variant]} ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;