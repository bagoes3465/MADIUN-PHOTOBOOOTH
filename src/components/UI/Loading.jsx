import React from 'react';

export const Loading = ({ 
  text = 'Loading...', 
  size = 'md',
  variant = 'spinner'
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin ${sizes[size]}`} />
        {text && <p className="text-gray-600">{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        {text && <p className="ml-2 text-gray-600">{text}</p>}
      </div>
    );
  }

  return null;
};

export default Loading;