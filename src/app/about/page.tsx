import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Users, Sparkles, Award } from 'lucide-react';
import { Section, Stack, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Nexus Athletics is an AI-powered fitness ecosystem built around your goals, powered by elite trainers and advanced training programs.',
};

const values = [
  {
    icon: Target,
    title: 'Results, measured',
    description: 'Every program is built on exercise science and tracked with real data — not guesswork or generic templates.',
  },
  {
    icon: Sparkles,
    title: 'AI as a coach, not a gimmick',
    description: 'Our AI programming adapts to your recovery, performance, and equipment — augmenting our human coaches, never replacing them.',
  },
  {
    icon: Users,
    title: 'A community that shows up',
    description: '247+ members training alongside each other, pushed and supported by coaches who know their names.',
  },
  {
    icon: Award,
    title: 'Certified, experienced coaching',
    description: 'Every trainer on our floor is certified, specialized, and has years of hands-on coaching experience.',
  },
];

const stats = [
  { value: '247+', label: 'Active Members' },
  { value: '12', label: 'Elite Trainers' },
  { value: '18', label: 'Training Programs' },
  { value: '94%', label: 'Satisfaction Rate' },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="About Nexus Athletics"
        title="An intelligent fitness ecosystem, built around you"
        description="We combine exercise science, elite coaching, and adaptive AI programming into one system — so every session moves you toward your actual goals, not a generic plan."
      />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="xl" className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Stack gap="md">
              <h2 className="font-display text-heading-lg text-nexus-50">Why we exist</h2>
              <p className="text-body-lg text-nexus-300 leading-relaxed">
                Most gyms sell access to equipment. We built Nexus Athletics because access isn&apos;t the hard part — knowing what to do with it is. We pair certified coaches with adaptive AI programming so every member trains with a plan that actually fits their body, schedule, and goals, and adjusts as they progress.
              </p>
              <p className="text-body-lg text-nexus-300 leading-relaxed">
                From personal training and strength programming to recovery and nutrition coaching, everything under one roof is designed to work together — not as isolated services bolted onto a gym membership.
              </p>
            </Stack>
            <Grid cols={2} gap="md">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent>
                    <div className="font-display text-display-sm font-bold text-nexus-50 tabular-nums text-gradient-gold">{stat.value}</div>
                    <div className="text-body-sm text-nexus-500 uppercase tracking-wider font-medium mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>

          <div>
            <h2 className="font-display text-heading-lg text-nexus-50 mb-8 text-center">What we stand for</h2>
            <Grid cols={2} gap="lg">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent>
                    <Flex gap="md" align="start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold flex-shrink-0">
                        <value.icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-heading-sm text-nexus-50 mb-2">{value.title}</h3>
                        <p className="text-body-md text-nexus-400 leading-relaxed">{value.description}</p>
                      </div>
                    </Flex>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>

          <Card className="bg-gradient-to-br from-accent-gold/10 to-accent-copper/10 border-accent-gold/20">
            <CardContent className="text-center py-12">
              <h2 className="font-display text-heading-lg text-nexus-50 mb-3">Come see it for yourself</h2>
              <p className="text-body-lg text-nexus-400 max-w-xl mx-auto mb-6">
                The best way to understand what makes Nexus Athletics different is to walk the floor and meet the team.
              </p>
              <Flex justify="center" gap="md" className="flex-wrap">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact?tour=true">
                    Book a Tour
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/trainers">Meet the Trainers</Link>
                </Button>
              </Flex>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </main>
  );
}
