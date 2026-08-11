'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Dumbbell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container, Flex } from '@/components/layout/Container';

const navigation = [
  { name: 'Programs', href: '/#services' },
  { name: 'Trainers', href: '/#trainers' },
  { name: 'Memberships', href: '/#memberships' },
  { name: 'Facilities', href: '/#facilities' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'FAQ', href: '/#faq' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  }, [pathname]);

  // This is a single-page site — nav links are hash anchors into homepage
  // sections, so "active" state comes from scroll position, not the route.
  useEffect(() => {
    const sectionIds = navigation.map((item) => item.href.replace('/#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
      setIsDesktopMenuOpen(false);
    }
  };

  return (
    <header
      ref={navbarRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-expo-out',
        isScrolled
          ? 'bg-nexus-950/95 backdrop-blur-3xl border-b border-border shadow-nexus-lg'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <Container>
        <Flex
          className="h-16 md:h-20"
          align="center"
          justify="between"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-nexus-50 font-display text-heading-lg z-50"
            aria-label="Nexus Athletics Home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper">
              <Dumbbell className="h-6 w-6 text-nexus-950" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-nexus-950 text-[10px] font-bold text-accent-gold">
                AI
              </span>
            </span>
            <span className="hidden sm:block">NEXUS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const sectionId = item.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-body-sm font-medium transition-colors duration-300 rounded-lg',
                    isActive
                      ? 'text-accent-gold'
                      : 'text-nexus-400 hover:text-nexus-100 hover:bg-surface-100'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <Flex className="hidden md:flex items-center gap-3" align="center">
            <Link
              href="/#ai-assistant"
              className={cn(
                'relative inline-flex items-center gap-2 px-4 py-2 text-body-sm font-medium text-nexus-300 transition-all duration-300 rounded-xl hover:text-accent-gold hover:bg-surface-100'
              )}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>AI Coach</span>
            </Link>
            <Button variant="primary" size="sm" asChild>
              <Link href="/#memberships">Start Your Journey</Link>
            </Button>
          </Flex>

          <button
            className="md:hidden flex items-center justify-center p-2 text-nexus-300 hover:text-nexus-100 rounded-xl hover:bg-surface-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </Flex>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}

function MobileMenu({ isOpen, onClose, activeSection }: { isOpen: boolean; onClose: () => void; activeSection: string }) {
  const focusTrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      focusTrapRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 flex flex-col bg-nexus-950 animate-slide-down"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      tabIndex={-1}
      ref={focusTrapRef}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-nexus-50 font-display text-heading-lg"
          onClick={onClose}
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper">
            <Dumbbell className="h-6 w-6 text-nexus-950" aria-hidden="true" />
          </span>
          <span>NEXUS</span>
        </Link>
        <button
          onClick={onClose}
          className="flex items-center justify-center p-2 text-nexus-400 hover:text-nexus-100 rounded-xl hover:bg-surface-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-6" role="navigation" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1">
          {navigation.map((item) => {
            const sectionId = item.href.replace('/#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-4 py-3.5 text-body-md font-medium rounded-xl transition-all duration-300',
                    isActive
                      ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20'
                      : 'text-nexus-300 hover:text-nexus-100 hover:bg-surface-100'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 pt-8 border-t border-border">
          <Link
            href="/#ai-assistant"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3.5 text-body-md font-medium text-nexus-300 hover:text-accent-gold transition-colors"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            <span>AI Fitness Coach</span>
          </Link>
        </div>

        <div className="mt-6">
          <Button variant="primary" className="w-full" size="lg" asChild>
            <Link href="/#memberships" onClick={onClose}>Start Your Journey</Link>
          </Button>
        </div>
      </nav>

      <div className="p-6 border-t border-border">
        <p className="text-body-sm text-nexus-500 text-center">
          © 2024 Nexus Athletics. All rights reserved.
        </p>
      </div>
    </div>
  );
}