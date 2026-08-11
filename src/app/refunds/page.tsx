import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Our refund and cancellation policy for memberships and training packages.',
};

export default function RefundsPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader eyebrow="Legal" title="Refund Policy" />

      <Section size="lg" className="bg-nexus-950">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <Stack gap="lg">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/20">
                <Badge variant="gold" size="sm">Draft</Badge>
                <p className="text-body-sm text-nexus-300">
                  Placeholder policy — confirm exact refund windows and eligibility rules against how billing is actually configured before publishing.
                </p>
              </div>

              <div className="space-y-8 text-body-md text-nexus-300 leading-relaxed">
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">30-day guarantee</h2>
                  <p>
                    New members can cancel within their first 30 days for a full refund of membership fees paid, no questions asked. Contact us to request this — see below.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Ongoing memberships</h2>
                  <p>
                    Outside the 30-day window, memberships are billed month-to-month (or annually, if selected) and are not eligible for prorated refunds. You can cancel at any time with 30 days notice — see our{' '}
                    <Link href="/terms" className="text-accent-gold hover:text-accent-gold-light transition-colors">Terms of Service</Link> for details.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Personal training packages</h2>
                  <p>
                    Unused sessions in a prepaid personal training package can be refunded on a prorated basis within 90 days of purchase. Sessions already completed are non-refundable.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">How to request a refund</h2>
                  <p>
                    Contact us through our{' '}
                    <Link href="/contact" className="text-accent-gold hover:text-accent-gold-light transition-colors">contact page</Link>{' '}
                    with your account email and the reason for your request. We aim to process eligible refunds within 5–7 business days.
                  </p>
                </section>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Section>
    </main>
  );
}
