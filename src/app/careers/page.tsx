import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Section, Stack, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Nexus Athletics team — coaching, operations, and technology roles at an AI-powered fitness ecosystem.',
};

const perks = [
  { icon: Heart, title: 'Free membership', description: 'Full Elite-tier access for every team member, day one.' },
  { icon: TrendingUp, title: 'Continuing education', description: 'Certification and CEU reimbursement for coaching staff.' },
  { icon: Users, title: 'A real team', description: 'Small, tight-knit staff who actually know each other and the members.' },
  { icon: Sparkles, title: 'Build the future of fitness', description: "Work at the intersection of coaching and AI, not just a gym franchise." },
];

export default function CareersPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Careers"
        title="Join the team"
        description="We're a small, coach-led team building an AI-powered training ecosystem. We hire slowly and care a lot about fit."
      />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="xl" className="max-w-4xl mx-auto">
          <Grid cols={2} gap="lg">
            {perks.map((perk) => (
              <Card key={perk.title}>
                <CardContent>
                  <Flex gap="md" align="start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold flex-shrink-0">
                      <perk.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-heading-sm text-nexus-50 mb-2">{perk.title}</h3>
                      <p className="text-body-md text-nexus-400">{perk.description}</p>
                    </div>
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Card className="text-center py-4">
            <CardContent>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-3">No open positions right now</h2>
              <p className="text-body-lg text-nexus-400 max-w-xl mx-auto mb-6">
                We don&apos;t have any roles open at the moment, but we're always happy to hear from strong coaches and operators. Send us a note and we'll reach out when something fits.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </main>
  );
}
