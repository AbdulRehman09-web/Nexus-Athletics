'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glass' | 'glass-strong' | 'gradient-border';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-surface-100 border border-border backdrop-blur-xl',
      interactive: 'bg-surface-100 border border-border backdrop-blur-xl cursor-pointer hover:border-border-light hover:shadow-nexus-lg hover:shadow-nexus-glow hover:-translate-y-1',
      glass: 'bg-surface-100/50 backdrop-blur-2xl border border-border/50',
      'glass-strong': 'bg-surface-200/80 backdrop-blur-3xl border border-border-light',
      'gradient-border': 'bg-surface-100 border border-border backdrop-blur-xl relative overflow-hidden',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverClass = hover ? 'transition-all duration-500 ease-expo-out' : '';

    const gradientBorder = variant === 'gradient-border' ? (
      <div
        className="absolute inset-[-1px] bg-gradient-to-r from-accent-gold/50 via-transparent to-accent-copper/50 opacity-0 transition-opacity duration-500 -z-10 rounded-[inherit]"
        aria-hidden="true"
      />
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          variantClasses[variant],
          paddingClasses[padding],
          hoverClass,
          className
        )}
        {...props}
      >
        {gradientBorder}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-heading-sm',
      md: 'text-heading-md',
      lg: 'text-heading-lg',
      xl: 'text-heading-xl',
    };

    return (
      <Component
        ref={ref}
        className={cn('font-display text-nexus-50 tracking-tight', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mt-2 text-body-md text-nexus-400', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';