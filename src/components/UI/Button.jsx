import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-madiun-primary to-madiun-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-madiun-primary',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-400',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg focus:ring-yellow-400',
    outline: 'border-2 border-madiun-primary text-madiun-primary hover:bg-madiun-primary hover:text-white focus:ring-madiun-primary',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    link: 'text-madiun-primary hover:underline'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
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
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin mr-2" size={iconSizes[size]} />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="mr-2" size={iconSizes[size]} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="ml-2" size={iconSizes[size]} />
      )}
    </button>
  );
};

export default Button;