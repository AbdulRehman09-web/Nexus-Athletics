'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CursorState {
  x: number;
  y: number;
  scale: number;
  label: string;
  isVisible: boolean;
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'link' | 'button' | 'text' | 'grab' | 'grabbing' | 'zoom' | 'custom';
}

export function CustomCursor() {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    scale: 1,
    label: '',
    isVisible: false,
    isHovering: false,
    isClicking: false,
    cursorType: 'default',
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefersReducedMotion = useRef(false);
  const [shouldRenderCursor, setShouldRenderCursor] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    setShouldRenderCursor(!mediaQuery.matches && window.innerWidth >= 1024);

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      setShouldRenderCursor(!e.matches && window.innerWidth >= 1024);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setState((prev) => ({ ...prev, isVisible: true }));
    };

    const handleMouseDown = () => setState((prev) => ({ ...prev, isClicking: true, scale: 0.8 }));
    const handleMouseUp = () => setState((prev) => ({ ...prev, isClicking: false, scale: 1 }));
    const handleMouseLeave = () => setState((prev) => ({ ...prev, isVisible: false }));

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const animate = () => {
      const currentX = state.x;
      const currentY = state.y;
      const targetX = targetRef.current.x;
      const targetY = targetRef.current.y;

      const easing = 0.15;
      const newX = currentX + (targetX - currentX) * easing;
      const newY = currentY + (targetY - currentY) * easing;

      setState((prev) => ({ ...prev, x: newX, y: newY }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state.x, state.y]);

  const handleElementEnter = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion.current) return;

    const target = e.currentTarget as HTMLElement;
    const cursorType = target.dataset.cursor || 'link';
    const label = target.dataset.cursorLabel || '';

    setState((prev) => ({
      ...prev,
      isHovering: true,
      cursorType: cursorType as CursorState['cursorType'],
      label,
      scale: cursorType === 'button' ? 1.5 : cursorType === 'custom' ? 2 : 1.2,
    }));

    target.style.cursor = 'none';
  }, []);

  const handleElementLeave = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.cursor = '';
    setState((prev) => ({
      ...prev,
      isHovering: false,
      cursorType: 'default',
      label: '',
      scale: 1,
    }));
  }, []);

  if (!shouldRenderCursor) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        button, a, input, textarea, select, [role="button"], [tabindex="0"] {
          cursor: none !important;
        }
        [data-cursor="text"], input, textarea {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className={cn(
          'fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out mix-blend-difference',
          'will-change transform'
        )}
        style={{
          transform: `translate(${state.x}px, ${state.y}px) translate(-50%, -50%) scale(${state.scale})`,
          opacity: state.isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <div
          ref={ringRef}
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ease-expo-out',
            state.isHovering
              ? 'w-10 h-10 border-accent-gold/50'
              : 'w-8 h-8 border-nexus-300/50',
            state.isClicking && 'scale-75',
            state.cursorType === 'custom' && 'w-16 h-16 border-accent-gold',
            state.cursorType === 'text' && 'w-4 h-4 border-nexus-500',
          )}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-gold transition-all duration-300 ease-expo-out"
          style={{
            opacity: state.isHovering ? 0 : 1,
            transform: `translate(-50%, -50%) scale(${state.isHovering ? 0 : 1})`,
          }}
          aria-hidden="true"
        />
        {state.label && (
          <div
            ref={labelRef}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-xl bg-nexus-900 border border-border text-caption font-medium text-accent-gold whitespace-nowrap opacity-0 translate-x-2 transition-all duration-300 ease-expo-out pointer-events-none"
            style={{
              opacity: state.isHovering && state.label ? 1 : 0,
              transform: `translateY(-50%) translateX(${state.isHovering && state.label ? 12 : 8}px)`,
            }}
            aria-hidden="true"
          >
            {state.label}
          </div>
        )}
      </div>
      <CursorProvider
        onEnter={handleElementEnter}
        onLeave={handleElementLeave}
        reducedMotion={prefersReducedMotion.current}
      />
    </>
  );
}

interface CursorProviderProps {
  children?: React.ReactNode;
  onEnter: (e: MouseEvent) => void;
  onLeave: (e: MouseEvent) => void;
  reducedMotion: boolean;
}

function CursorProvider({ children, onEnter, onLeave, reducedMotion }: CursorProviderProps) {
  const elementsRef = useRef<Map<HTMLElement, { enter: (e: MouseEvent) => void; leave: (e: MouseEvent) => void }>>(new Map());

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 1024) return;

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], [data-cursor], input, textarea, select, .magnetic, .card-interactive, [tabindex="0"]'
    );

    interactiveElements.forEach((el) => {
      const enterHandler = (e: MouseEvent) => onEnter(e);
      const leaveHandler = (e: MouseEvent) => onLeave(e);

      el.addEventListener('mouseenter', enterHandler);
      el.addEventListener('mouseleave', leaveHandler);

      elementsRef.current.set(el, { enter: enterHandler, leave: leaveHandler });
    });

    return () => {
      elementsRef.current.forEach(({ enter, leave }, el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      elementsRef.current.clear();
    };
  }, [onEnter, onLeave, reducedMotion]);

  return <>{children}</>;
}