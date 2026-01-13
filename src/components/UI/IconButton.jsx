import React from 'react';

const IconButton = ({
  icon: Icon,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ariaLabel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-400',
    primary: 'bg-madiun-primary text-white hover:bg-blue-700 focus:ring-madiun-primary hover:shadow-lg',
    secondary: 'bg-madiun-secondary text-white hover:bg-purple-700 focus:ring-madiun-secondary hover:shadow-lg',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 hover:shadow-lg',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 hover:shadow-lg',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
  };

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
};

export default IconButton;