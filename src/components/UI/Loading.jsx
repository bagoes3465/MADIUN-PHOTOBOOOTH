import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  overlay = false 
}) => {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 72
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 
        className="animate-spin text-madiun-primary" 
        size={sizes[size]} 
      />
      {text && (
        <p className={`${textSizes[size]} font-medium text-gray-600 dark:text-gray-400`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <LoadingContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <LoadingContent />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoadingContent />
    </div>
  );
};

// Spinner only (no text)
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40
  };

  return (
    <Loader2 
      className={`animate-spin text-madiun-primary ${className}`} 
      size={sizes[size]} 
    />
  );
};

// Skeleton loader for content placeholders
export const Skeleton = ({ width = '100%', height = '20px', className = '' }) => {
  return (
    <div 
      className={`skeleton rounded ${className}`}
      style={{ width, height }}
    />
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
      <Skeleton height="200px" />
      <Skeleton width="60%" height="24px" />
      <Skeleton width="80%" height="16px" />
      <Skeleton width="40%" height="16px" />
    </div>
  );
};

export default Loading;