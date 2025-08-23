import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-all duration-200';

  const variantClasses = {
    default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
    primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20',
    accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20',
    success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20',
    warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20',
    error: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20',
    info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border border-[var(--color-info)]/20',
    solid: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border border-[var(--color-primary)]',
    outline: 'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)]',
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs rounded gap-1',
    sm: 'px-2 py-1 text-xs rounded-md gap-1',
    md: 'px-2.5 py-1.5 text-sm rounded-md gap-1.5',
    lg: 'px-3 py-2 text-sm rounded-lg gap-2',
  };

  const dotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const getDotColor = () => {
    switch (variant) {
      case 'primary': return 'bg-[var(--color-primary)]';
      case 'accent': return 'bg-[var(--color-accent)]';
      case 'success': return 'bg-[var(--color-success)]';
      case 'warning': return 'bg-[var(--color-warning)]';
      case 'error': return 'bg-[var(--color-error)]';
      case 'info': return 'bg-[var(--color-info)]';
      case 'solid': return 'bg-white';
      default: return 'bg-[var(--color-text-secondary)]';
    }
  };

  return (
    <span className={combinedClasses} {...props}>
      {dot && (
        <span 
          className={`rounded-full ${dotSizes[size]} ${getDotColor()}`}
        />
      )}
      {icon && (
        <FontAwesomeIcon 
          icon={icon} 
          className={iconSizes[size]}
        />
      )}
      {children}
    </span>
  );
};

// Notification badge for overlays
const NotificationBadge = ({ 
  count = 0, 
  max = 99, 
  showZero = false,
  className = '',
  ...props 
}) => {
  if (count === 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge
      variant="error"
      size="xs"
      className={`absolute -top-2 -right-2 min-w-[1.25rem] h-5 justify-center ${className}`}
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

// Status badge with predefined colors
const StatusBadge = ({ status, className = '', ...props }) => {
  const statusVariants = {
    active: { variant: 'success', text: 'Active' },
    inactive: { variant: 'error', text: 'Inactive' },
    pending: { variant: 'warning', text: 'Pending' },
    completed: { variant: 'success', text: 'Completed' },
    draft: { variant: 'default', text: 'Draft' },
    published: { variant: 'primary', text: 'Published' },
    archived: { variant: 'outline', text: 'Archived' },
  };

  const config = statusVariants[status] || { variant: 'default', text: status };

  return (
    <Badge
      variant={config.variant}
      className={className}
      {...props}
    >
      {config.text}
    </Badge>
  );
};

Badge.Notification = NotificationBadge;
Badge.Status = StatusBadge;

export default Badge;