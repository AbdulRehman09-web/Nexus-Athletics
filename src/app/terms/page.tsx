import type { Metadata } from 'next';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of Nexus Athletics facilities, memberships, and website.',
};

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader eyebrow="Legal" title="Terms of Service" />

      <Section size="lg" className="bg-nexus-950">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <Stack gap="lg">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/20">
                <Badge variant="gold" size="sm">Draft</Badge>
                <p className="text-body-sm text-nexus-300">
                  This is placeholder terms language, not a finished legal document. Have it reviewed by a qualified attorney before relying on it — particularly the liability waiver and cancellation sections, which carry real legal weight for a physical fitness facility.
                </p>
              </div>

              <div className="space-y-8 text-body-md text-nexus-300 leading-relaxed">
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Membership</h2>
                  <p>
                    Memberships are billed monthly or annually depending on the plan selected. There are no long-term contracts — you may cancel at any time with 30 days notice, effective at your next billing cycle.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Assumption of risk</h2>
                  <p>
                    Physical exercise carries inherent risk of injury. By using our facilities, equipment, and coaching services, you acknowledge this risk and agree to follow posted safety guidance and staff instructions.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Conduct</h2>
                  <p>
                    We expect all members and guests to treat staff and other members with respect, follow facility rules, and use equipment as intended. We reserve the right to suspend or terminate access for conduct that endangers others or violates these terms.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Changes to these terms</h2>
                  <p>
                    We may update these terms from time to time. Material changes will be communicated to active members by email.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Contact</h2>
                  <p>
                    Questions about these terms can be sent to{' '}
                    <a href="mailto:hello@nexusathletics.com" className="text-accent-gold hover:text-accent-gold-light transition-colors">hello@nexusathletics.com</a>.
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
