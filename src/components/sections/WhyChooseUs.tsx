'use client';

import { Check, Shield, Zap, Brain, Target, Users, Award, Clock, MapPin, Sparkles, Dumbbell } from 'lucide-react';
import { Section, Container, Grid, Stack, Flex } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Programming',
    description: 'Adaptive workout algorithms that learn from your performance, adjusting volume, intensity, and exercise selection in real-time for optimal progress.',
    highlight: 'Smart Periodization',
  },
  {
    icon: Target,
    title: 'Precision Biometrics',
    description: 'Real-time heart rate variability, power output, and movement quality tracking with AI form analysis and instant feedback.',
    highlight: 'Form AI',
  },
  {
    icon: Shield,
    title: 'Elite Coaching Staff',
    description: 'Olympic-level trainers with 150+ combined years of experience across strength, conditioning, rehabilitation, and performance.',
    highlight: 'Certified Experts',
  },
  {
    icon: Zap,
    title: 'Science-Based Methods',
    description: 'Every program built on peer-reviewed research in exercise physiology, biomechanics, and nutritional science.',
    highlight: 'Evidence-Based',
  },
  {
    icon: Users,
    title: 'High-Performance Community',
    description: 'Train alongside driven professionals, athletes, and performers who elevate your standards and accountability.',
    highlight: 'Peer Motivation',
  },
  {
    icon: Award,
    title: 'Results Guarantee',
    description: 'Measurable progress tracking with quarterly assessments. If you don\'t see results, we adjust your program at no cost.',
    highlight: 'Progress Promise',
  },
];

const stats = [
  { value: '97%', label: 'Member Retention' },
  { value: '4.9/5', label: 'Satisfaction Score' },
  { value: '247+', label: 'Transformations' },
  { value: '12', label: 'Elite Coaches' },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" size="xl" className="bg-gradient-to-b from-nexus-950 via-nexus-950 to-nexus-900">
      <Stack gap="xl" className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Why Nexus Athletics
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Built for Those Who
            <br />
            <span className="text-gradient-gold">Demand Excellence</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            We don't do generic. Every aspect of Nexus is engineered for serious results — from our AI-driven programming to our Olympic-caliber coaching staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={stat.label} className="text-center p-8 hover:shadow-nexus-glow transition-all duration-500">
              <CardContent className="p-0">
                <div className="font-display text-display-md font-bold text-nexus-50 tabular-nums text-gradient mb-2">{stat.value}</div>
                <div className="text-body-sm text-nexus-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Grid cols={3} gap="lg">
          {features.map((feature, i) => (
            <Card key={feature.title} className="card-interactive group p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold group-hover:bg-gradient-to-br group-hover:from-accent-gold group-hover:to-accent-copper group-hover:text-nexus-950 transition-all duration-500">
                <feature.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="mt-4">
                <Badge variant="gold" size="sm" className="mb-3">{feature.highlight}</Badge>
                <h3 className="font-display text-heading-md text-nexus-50 mb-2">{feature.title}</h3>
                <p className="text-body-md text-nexus-400 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
}