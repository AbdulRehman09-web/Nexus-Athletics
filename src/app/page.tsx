'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { Section, Container, Grid, Flex, Stack } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Badge';
import { ArrowRight, Check, Dumbbell, Flame, Target, Heart, Brain, Zap, Users, Award, Clock, MapPin, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs').then(m => m.WhyChooseUs), { ssr: false });
const Services = dynamic(() => import('@/components/sections/Services').then(m => m.Services), { ssr: false });
const Trainers = dynamic(() => import('@/components/sections/Trainers').then(m => m.Trainers), { ssr: false });
const Facilities = dynamic(() => import('@/components/sections/Facilities').then(m => m.Facilities), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials), { ssr: false });
const Memberships = dynamic(() => import('@/components/sections/Memberships').then(m => m.Memberships), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/sections/AIAssistant').then(m => m.AIAssistant), { ssr: false });
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/CTASection').then(m => m.CTASection), { ssr: false });

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <Services />
      <Trainers />
      <Facilities />
      <Testimonials />
      <Memberships />
      <AIAssistant />
      <FAQ />
      <CTASection />
    </main>
  );
}