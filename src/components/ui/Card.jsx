import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-[var(--color-background)] border border-[var(--color-border-light)] transition-all duration-200';
  
  const variantClasses = {
    default: 'rounded-lg shadow-sm',
    elevated: 'rounded-lg shadow-md',
    outlined: 'rounded-lg shadow-none border-2',
    glass: 'rounded-lg backdrop-blur-sm bg-white/10 border-white/20',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover 
    ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' 
    : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-[var(--color-border-light)] pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-[var(--color-text-primary)] ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-[var(--color-text-secondary)] mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-[var(--color-border-light)] pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;