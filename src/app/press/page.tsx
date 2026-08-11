import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { Section, Stack, Grid } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Media resources and press contact for Nexus Athletics.',
};

const factSheet = [
  { label: 'Founded', value: 'Nexus Athletics' },
  { label: 'Location', value: 'San Francisco, CA' },
  { label: 'Members', value: '247+' },
  { label: 'Trainers', value: '12 certified coaches' },
  { label: 'Programs', value: '18 training programs' },
  { label: 'Hours', value: 'Mon–Fri 5AM–11PM, Sat–Sun 7AM–9PM' },
];

export default function PressPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Press & Media"
        title="Press resources"
        description="Fact sheet and media contact for journalists and partners covering Nexus Athletics."
      />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="xl" className="max-w-4xl mx-auto">
          <div>
            <h2 className="font-display text-heading-lg text-nexus-50 mb-6">Fact sheet</h2>
            <Grid cols={2} gap="md">
              {factSheet.map((item) => (
                <Card key={item.label}>
                  <CardContent>
                    <p className="text-body-sm text-nexus-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-body-md text-nexus-100 font-medium">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>

          <Card className="bg-gradient-to-br from-accent-gold/10 to-accent-copper/10 border-accent-gold/20">
            <CardContent className="text-center py-12">
              <Mail className="w-10 h-10 text-accent-gold mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-display text-heading-lg text-nexus-50 mb-3">Media inquiries</h2>
              <p className="text-body-lg text-nexus-400 max-w-xl mx-auto mb-6">
                For interviews, brand assets, or partnership inquiries, reach out and we'll get back to you promptly.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Contact Us
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
