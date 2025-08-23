import React, { forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseInputClasses = `
    w-full px-4 py-3 text-sm bg-[var(--color-background)] border rounded-lg 
    transition-all duration-200 placeholder-[var(--color-text-muted)]
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-60
  `;

  const getInputClasses = () => {
    let classes = baseInputClasses;
    
    if (error) {
      classes += ' border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20';
    } else if (isFocused) {
      classes += ' border-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20';
    } else {
      classes += ' border-[var(--color-border)] hover:border-[var(--color-primary)]/50';
    }

    if (icon && iconPosition === 'left') {
      classes += ' pl-14';
    }
    
    if (icon && iconPosition === 'right' || isPassword) {
      classes += ' pr-14';
    }

    return `${classes} ${inputClassName}`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <FontAwesomeIcon 
              icon={icon} 
              className="text-[var(--color-text-muted)] text-sm w-4 h-4"
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(icon && iconPosition === 'right') || isPassword ? (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isPassword ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200 p-1"
                tabIndex={-1}
              >
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="text-sm w-4 h-4"
                />
              </button>
            ) : (
              <div className="pointer-events-none">
                <FontAwesomeIcon 
                  icon={icon} 
                  className="text-[var(--color-text-muted)] text-sm w-4 h-4"
                />
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-[var(--color-error)] flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-sm text-[var(--color-text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;