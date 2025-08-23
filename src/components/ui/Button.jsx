import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  as: Component = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[var(--color-background)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
    danger: 'bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:bg-red-600 focus:ring-[var(--color-error)] shadow-sm hover:shadow-md',
    ghost: 'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:ring-[var(--color-primary)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-dark)] focus:ring-[var(--color-accent)] shadow-sm hover:shadow-md hover:-translate-y-0.5',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-2',
    xl: 'px-8 py-4 text-lg rounded-xl gap-3',
  };

  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <FontAwesomeIcon 
        icon={icon} 
        className={`${iconSizes[size]} ${loading ? 'animate-spin' : ''}`}
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          Loading...
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && renderIcon()}
        {children}
        {icon && iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </Component>
  );
};

export default Button;