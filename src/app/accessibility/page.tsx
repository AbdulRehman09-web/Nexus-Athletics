import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Our commitment to accessibility at Nexus Athletics, both in our facilities and on our website.',
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader eyebrow="Our Commitment" title="Accessibility" />

      <Section size="lg" className="bg-nexus-950">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <Stack gap="lg" className="text-body-md text-nexus-300 leading-relaxed">
              <p>
                Nexus Athletics is committed to making both our physical facilities and our website usable by everyone, including people with disabilities.
              </p>

              <div>
                <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Our facilities</h2>
                <p>
                  Our locations include step-free access, accessible locker rooms and restrooms, and adjustable equipment where possible. If you have a specific accessibility need we should know about before your visit, please let us know — we&apos;re happy to help plan around it.
                </p>
              </div>

              <div>
                <h2 className="font-display text-heading-sm text-nexus-50 mb-2">This website</h2>
                <p>
                  We aim to follow WCAG 2.1 AA guidelines across this site — including keyboard navigation, screen reader labeling, and sufficient color contrast. This is an ongoing effort rather than a finished state, and we welcome reports of anything that doesn&apos;t work well with assistive technology.
                </p>
              </div>

              <div>
                <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Reporting an issue</h2>
                <p>
                  If you encounter a barrier — on our site or in person — please{' '}
                  <Link href="/contact" className="text-accent-gold hover:text-accent-gold-light transition-colors">
                    reach out through our contact page
                  </Link>{' '}
                  and describe what you ran into. We take these reports seriously and will follow up.
                </p>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Section>
    </main>
  );
}
