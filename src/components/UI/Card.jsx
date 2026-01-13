import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  hover = false,
  padding = 'normal',
  className = '' 
}) => {
  const paddings = {
    none: 'p-0',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  const hoverClass = hover ? 'card-hover cursor-pointer' : '';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-soft ${hoverClass} ${className}`}>
      {title && (
        <div className={`border-b border-gray-200 dark:border-gray-700 ${paddings[padding]}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={paddings[padding]}>
        {children}
      </div>

      {footer && (
        <div className={`border-t border-gray-200 dark:border-gray-700 ${paddings[padding]} bg-gray-50 dark:bg-gray-900`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;