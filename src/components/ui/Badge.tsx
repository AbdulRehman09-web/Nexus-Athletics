'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'gold',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      gold: 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30',
      outline: 'border border-border text-nexus-400',
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30',
      info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    };

    const sizeClasses = {
      xs: 'px-1.5 py-0.5 text-micro',
      sm: 'px-2 py-0.5 text-micro',
      md: 'px-3 py-1 text-caption',
      lg: 'px-4 py-1.5 text-body-sm',
    };

    const dotColors = {
      gold: 'bg-accent-gold',
      outline: 'bg-nexus-500',
      success: 'bg-emerald-400',
      warning: 'bg-amber-400',
      error: 'bg-red-400',
      info: 'bg-blue-400',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  variant?: 'default' | 'gold' | 'vertical';
  length?: 'full' | 'half' | 'quarter';
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, variant = 'default', length = 'full', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-gradient-to-r from-transparent via-border to-transparent',
      gold: 'bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent',
      vertical: 'w-px h-full bg-gradient-to-b from-transparent via-border to-transparent',
    };

    const lengthClasses = {
      full: variant === 'vertical' ? 'h-full' : 'w-full',
      half: variant === 'vertical' ? 'h-1/2' : 'w-1/2',
      quarter: variant === 'vertical' ? 'h-1/4' : 'w-1/4',
    };

    return (
      <hr
        ref={ref}
        className={cn(
          'border-0',
          variantClasses[variant],
          lengthClasses[length],
          className
        )}
        role="separator"
        aria-orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative w-full', className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </div>
    </div>
  )
);

AspectRatio.displayName = 'AspectRatio';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        'clip-[rect(0,0,0,0)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

VisuallyHidden.displayName = 'VisuallyHidden';

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-accent-gold focus:px-4 focus:py-2 focus:text-nexus-950 focus:font-semibold focus:shadow-nexus-lg"
    >
      {children}
    </a>
  );
}