'use client';

import { ArrowRight, Sparkles, Shield, Users, Award, Clock, MapPin, Dumbbell } from 'lucide-react';
import { Section, Container, Stack, Flex, Grid } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CTASection() {
  return (
    <Section id="cta" size="xl" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-copper/10" />

      <Container className="relative z-10">
        <Card className="relative overflow-hidden p-8 md:p-16 bg-gradient-to-br from-nexus-900 via-nexus-950 to-nexus-900 border-accent-gold/30 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-transparent to-accent-copper/5" />
          
          <Badge variant="gold" size="lg" dot className="mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Ready to Begin?
          </Badge>

          <h2 className="font-display text-display-lg md:text-display-xl text-nexus-50 tracking-tight mb-6 max-w-3xl mx-auto">
            Your Best Self Is
            <br />
            <span className="text-gradient-gold">Waiting</span>
          </h2>

          <p className="text-body-lg text-nexus-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            247 members have already transformed. Elite coaches are ready. The AI is calibrated. The facility is waiting. The only question: when do you start?
          </p>

          <Flex justify="center" gap="4" className="flex-wrap mb-12">
            <Button variant="primary" size="xl" asChild>
              <Link href="/register">
                Start Your 30-Day Trial
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/contact?tour=true">Book a Tour First</Link>
            </Button>
          </Flex>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: '30-Day Guarantee', desc: 'Full refund if not satisfied' },
              { icon: Users, label: 'No Contracts', desc: 'Cancel anytime, no fees' },
              { icon: Award, label: 'Expert Coaching', desc: '150+ years combined experience' },
              { icon: Clock, label: '24/7 Access', desc: 'Train on your schedule' },
            ].map((item, i) => (
              <Flex key={i} direction="col" align="center" gap="2">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-surface-200 border border-border text-accent-gold">
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="font-display text-heading-sm text-nexus-50">{item.label}</p>
                <p className="text-body-sm text-nexus-500">{item.desc}</p>
              </Flex>
            ))}
          </div>
        </Card>

        <AlternativeCTAs />
      </Container>
    </Section>
  );
}

function AlternativeCTAs() {
  const options = [
    {
      icon: Dumbbell,
      title: 'Explore Training Programs',
      desc: '12 science-backed services from strength to recovery',
      href: '/services',
      color: 'from-accent-gold to-accent-copper',
    },
    {
      icon: Users,
      title: 'Meet Our Coaches',
      desc: '6 featured experts across every specialization',
      href: '/trainers',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Award,
      title: 'Compare Memberships',
      desc: 'Three tiers from $29/mo — transparent pricing',
      href: '/memberships',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Sparkles,
      title: 'Try AI Assistant',
      desc: 'Instant answers on programs, trainers, scheduling',
      href: '/ai-assistant',
      color: 'from-purple-500 to-violet-500',
    },
  ];

  return (
    <div className="mt-16">
      <p className="text-body-md text-nexus-500 text-center mb-8">Not ready to commit? Explore what matters to you:</p>
      <Grid cols={4} gap="lg">
        {options.map((option, i) => (
          <Card
            key={option.href}
            className="card-interactive text-center p-6 relative overflow-hidden group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={cn('relative flex h-14 w-14 items-center justify-center rounded-xl mx-auto mb-4', `bg-gradient-to-br ${option.color}`)}>
              <option.icon className="w-7 h-7 text-nexus-950" aria-hidden="true" />
            </div>
            <h3 className="font-display text-heading-sm text-nexus-50 mb-2">{option.title}</h3>
            <p className="text-body-sm text-nexus-400 mb-4">{option.desc}</p>
            <Button variant="ghost" size="sm" asChild>
              <Link href={option.href}>
                Explore
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </Card>
        ))}
      </Grid>
    </div>
  );
}