'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[80rem]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-4 sm:px-6 lg:px-8 xl:px-12', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  innerClassName?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, size = 'lg', innerClassName, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20 lg:py-24',
      lg: 'py-18 md:py-24 lg:py-32',
      xl: 'py-24 md:py-32 lg:py-40',
    };

    return (
      <section
        ref={ref}
        className={cn('relative overflow-hidden', sizeClasses[size], className)}
        {...props}
      >
        <Container className={cn('relative z-10', innerClassName)}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        animation: 'noise 0.5s infinite',
      }}
      aria-hidden="true"
    />
  );
}

export type SpacingValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '1' | '1.5' | '2' | '3' | '4';

const spacingClasses: Record<SpacingValue, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '1': 'gap-1',
  '1.5': 'gap-1.5',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: SpacingValue;
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', responsive = true, children, ...props }, ref) => {
    const colsClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          responsive ? colsClasses[cols] : `grid-cols-${cols}`,
          spacingClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: SpacingValue;
  wrap?: boolean;
  flexWrap?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({
    className,
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap = 'md',
    wrap = false,
    flexWrap = false,
    children,
    ...props
  }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          spacingClasses[gap],
          (wrap || flexWrap) && 'flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  divider?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = 'vertical', gap = 'md', divider = false, children, ...props }, ref) => {
    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const childrenArray = Array.isArray(children) ? children : [children];

    const childrenWithDividers = divider
      ? childrenArray.flatMap((child, index) => [
          child,
          index < childrenArray.length - 1 ? (
            <div
              key={`${index}-divider`}
              className={cn(
                'w-full h-px bg-gradient-to-r from-transparent via-border to-transparent',
                direction === 'horizontal' && 'w-px h-full bg-gradient-to-b'
              )}
              aria-hidden="true"
            />
          ) : null,
        ])
      : childrenArray;

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          direction === 'vertical' ? 'flex-col' : 'flex-row',
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {childrenWithDividers}
      </div>
    );
  }
);

Stack.displayName = 'Stack';