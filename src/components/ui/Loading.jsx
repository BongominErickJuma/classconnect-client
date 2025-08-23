import React from 'react';

const Loading = ({ 
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-[var(--color-primary)]',
    accent: 'text-[var(--color-accent)]',
    white: 'text-white',
    muted: 'text-[var(--color-text-muted)]',
  };

  const SpinnerLoader = () => (
    <div 
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  );

  const DotsLoader = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full ${colorClasses[color]} ${size === 'xs' ? 'w-1.5 h-1.5' : size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} animate-bounce`}
          style={{
            animationDelay: `${i * 0.1}s`,
            backgroundColor: 'currentColor'
          }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div 
      className={`rounded-full bg-current animate-pulse ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  );

  const SkeletonLoader = ({ width = 'full', height = 'md' }) => {
    const widthClasses = {
      sm: 'w-24',
      md: 'w-48',
      lg: 'w-64',
      xl: 'w-96',
      full: 'w-full',
    };

    const heightClasses = {
      xs: 'h-3',
      sm: 'h-4',
      md: 'h-5',
      lg: 'h-6',
      xl: 'h-8',
    };

    return (
      <div 
        className={`animate-shimmer rounded ${widthClasses[width]} ${heightClasses[height]} ${className}`}
        style={{
          background: 'linear-gradient(90deg, var(--color-surface) 25%, var(--color-surface-hover) 50%, var(--color-surface) 75%)',
          backgroundSize: '200% 100%',
        }}
      />
    );
  };

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'skeleton':
        return <SkeletonLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  if (text) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        {renderLoader()}
        <p className={`text-sm ${colorClasses[color]}`}>{text}</p>
      </div>
    );
  }

  return renderLoader();
};

// Skeleton component for more complex loading states
const Skeleton = ({ 
  lines = 3, 
  height = 'md',
  className = '',
  animate = true 
}) => {
  const heightClasses = {
    xs: 'h-3',
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6',
  };

  const animationClass = animate ? 'animate-shimmer' : '';

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${animationClass} rounded ${heightClasses[height]}`}
          style={{
            width: index === lines - 1 ? '70%' : '100%',
            background: animate 
              ? 'linear-gradient(90deg, var(--color-surface) 25%, var(--color-surface-hover) 50%, var(--color-surface) 75%)'
              : 'var(--color-surface)',
            backgroundSize: animate ? '200% 100%' : 'auto',
          }}
        />
      ))}
    </div>
  );
};

// Page loading component
const PageLoading = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <Loading size="lg" variant="spinner" />
    <p className="text-[var(--color-text-secondary)]">{text}</p>
  </div>
);

// Full screen loading overlay
const LoadingOverlay = ({ 
  visible = false, 
  text = 'Loading...', 
  blur = true 
}) => {
  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 ${blur ? 'backdrop-blur-sm' : ''}`}>
      <div className="bg-[var(--color-background)] rounded-xl p-8 shadow-xl border border-[var(--color-border)]">
        <Loading size="lg" text={text} />
      </div>
    </div>
  );
};

Loading.Skeleton = Skeleton;
Loading.Page = PageLoading;
Loading.Overlay = LoadingOverlay;

export default Loading;