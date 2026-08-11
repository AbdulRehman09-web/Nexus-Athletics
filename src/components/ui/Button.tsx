'use client';

import { cloneElement, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  magnetic?: boolean;
  shine?: boolean;
  /** Render the styling onto the single child element (e.g. a Next.js <Link>) instead of a <button>. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      children,
      leftIcon,
      rightIcon,
      fullWidth = false,
      magnetic = false,
      shine = false,
      asChild = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ease-expo-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-950 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

    const variantClasses = {
      primary: 'bg-accent-gold text-nexus-950 hover:bg-accent-gold-light hover:shadow-nexus-glow active:scale-[0.98] hover:-translate-y-0.5',
      secondary: 'bg-surface-200 text-nexus-100 border border-border hover:bg-surface-300 hover:border-border-light hover:-translate-y-0.5 active:scale-[0.98]',
      ghost: 'bg-transparent text-nexus-300 hover:text-nexus-100 hover:bg-surface-100 active:scale-[0.98]',
      outline: 'border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10 hover:-translate-y-0.5 active:scale-[0.98]',
    };

    const sizeClasses = {
      sm: 'px-4 py-2.5 text-body-sm rounded-lg',
      md: 'px-6 py-3.5 text-body-md',
      lg: 'px-8 py-4 text-body-lg rounded-2xl',
      xl: 'px-10 py-5 text-body-lg rounded-2xl',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const magneticClass = magnetic ? 'magnetic' : '';
    const shineClass = shine ? 'shine' : '';

    const combinedClassName = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      magneticClass,
      shineClass,
      className
    );

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
        <span className={cn('relative z-10', loading && 'opacity-0')}>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

export function ButtonGroup({ children, className, vertical = false }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
      role="group"
      aria-label="Button group"
    >
      {children}
    </div>
  );
}