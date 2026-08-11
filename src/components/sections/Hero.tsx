'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, Users, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero3D } from '@/components/three/Hero3D';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container, Flex, Stack, Section } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-title', 
      { opacity: 0, y: 60, filter: 'blur(20px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }
    ).fromTo('.hero-subtitle',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 }, '-=0.8'
    ).fromTo('.hero-badge',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6'
    ).fromTo('.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.4'
    ).fromTo('.hero-stat',
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 }, '-=0.3'
    ).fromTo('.hero-scroll',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }, '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const stats = [
    { value: '247+', label: 'Active Members' },
    { value: '12', label: 'Elite Trainers' },
    { value: '18', label: 'Training Programs' },
    { value: '94%', label: 'Satisfaction Rate' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-nexus-950 via-nexus-950/90 to-nexus-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/5 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Hero3D scrollProgress={scrollProgress} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-12">
        <Container>
          <Stack gap="lg" className="max-w-4xl mx-auto text-center">
            <Badge className="hero-badge" variant="gold" size="lg" dot>
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              AI-Powered Fitness Ecosystem
            </Badge>

            <h1 id="hero-title" className="hero-title font-display text-display-xl text-nexus-50 tracking-tight text-balance leading-[1.05]">
              <span className="block">TRAIN HARDER.</span>
              <span className="block text-gradient-gold">MOVE SMARTER.</span>
            </h1>

            <p className="hero-subtitle text-body-lg text-nexus-300 max-w-2xl mx-auto text-balance leading-relaxed">
              An intelligent fitness ecosystem built around your goals, powered by elite trainers, advanced training programs, and AI that adapts to you.
            </p>

            <Flex justify="center" gap="md" className="hero-cta flex-wrap">
              <Button variant="primary" size="lg" asChild>
                <Link href="/#memberships">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/#memberships">Explore Memberships</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#ai-assistant">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  Try AI Coach
                </Link>
              </Button>
            </Flex>

            <div ref={statsRef} className="hero-stats flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="hero-stat flex flex-col items-center gap-1">
                  <div className="font-display text-display-md font-bold text-nexus-50 tabular-nums text-gradient">{stat.value}</div>
                  <div className="text-body-sm text-nexus-500 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="hero-scroll flex items-center justify-center gap-3 text-nexus-500">
              <span className="text-micro uppercase tracking-widest">Scroll to explore</span>
              <div className="relative w-6 h-10 border border-border rounded-full flex items-start justify-center p-1.5">
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-[float_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </Stack>
        </Container>
      </div>

      <div className="relative z-10 px-4 pb-8 md:pb-16">
        <FeatureHighlights />
      </div>
    </section>
  );
}

function FeatureHighlights() {
  const features = [
    { icon: Zap, title: 'AI Workout Intelligence', desc: 'Adaptive programming that evolves with your progress' },
    { icon: Target, title: 'Precision Tracking', desc: 'Real-time biometrics and performance analytics' },
    { icon: Shield, title: 'Elite Coaching', desc: 'Certified trainers with Olympic-level experience' },
    { icon: Users, title: 'Community Driven', desc: 'Train alongside motivated high-performers' },
  ];

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group relative card p-6 backdrop-blur-xl"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold group-hover:bg-gradient-to-br group-hover:from-accent-gold group-hover:to-accent-copper group-hover:text-nexus-950 transition-all duration-500">
              <feature.icon className="w-6 h-6" aria-hidden="true" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-gold/50 to-accent-copper/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </div>
            <h3 className="mt-4 font-display text-heading-sm text-nexus-50">{feature.title}</h3>
            <p className="mt-2 text-body-sm text-nexus-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}