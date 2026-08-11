import type { Metadata } from 'next';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Nexus Athletics collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader eyebrow="Legal" title="Privacy Policy" />

      <Section size="lg" className="bg-nexus-950">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <Stack gap="lg">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/20">
                <Badge variant="gold" size="sm">Draft</Badge>
                <p className="text-body-sm text-nexus-300">
                  This is placeholder policy language, not a finished legal document. Have it reviewed by a qualified attorney before relying on it — especially the data-handling and third-party sections, which should reflect exactly what this app actually does.
                </p>
              </div>

              <div className="space-y-8 text-body-md text-nexus-300 leading-relaxed">
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Information we collect</h2>
                  <p>
                    When you create an account, book a session, or contact us, we collect information like your name, email address, phone number, and any details you include in messages to us. We also collect basic usage data (like pages visited) to keep the site running well.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">How we use it</h2>
                  <p>
                    We use your information to manage your membership, respond to inquiries, process bookings, and — only if you opt in — send you training tips and updates. We don&apos;t sell your personal information to third parties.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Cookies</h2>
                  <p>
                    We use essential cookies to keep you logged in and remember your preferences. See our{' '}
                    <a href="/cookies" className="text-accent-gold hover:text-accent-gold-light transition-colors">Cookie Policy</a> for details.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Your choices</h2>
                  <p>
                    You can request a copy of the data we hold about you, ask us to correct it, or ask us to delete your account, by contacting us through our{' '}
                    <a href="/contact" className="text-accent-gold hover:text-accent-gold-light transition-colors">contact page</a>.
                  </p>
                </section>
                <section>
                  <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Contact</h2>
                  <p>
                    Questions about this policy can be sent to{' '}
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
