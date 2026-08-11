import type { Metadata } from 'next';
import { Section, Stack, Grid } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Nexus Athletics uses cookies on this website.',
};

const cookieTypes = [
  { name: 'Essential', purpose: 'Keeps you logged in and remembers basic preferences. Required for the site to function.', canDisable: false },
  { name: 'Analytics', purpose: 'Helps us understand which pages are useful so we can improve the site.', canDisable: true },
  { name: 'Marketing', purpose: 'Used to measure the effectiveness of our own promotions. Not currently in use on this site.', canDisable: true },
];

export default function CookiesPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader eyebrow="Legal" title="Cookie Policy" />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="lg" className="max-w-3xl mx-auto">
          <Card>
            <CardContent>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/20 mb-6">
                <Badge variant="gold" size="sm">Draft</Badge>
                <p className="text-body-sm text-nexus-300">
                  Placeholder policy — review and adjust to match whatever analytics or marketing tools are actually deployed on this site before publishing.
                </p>
              </div>
              <p className="text-body-md text-nexus-300 leading-relaxed">
                Cookies are small files stored on your device that help websites function and remember information about your visit. Here&apos;s what we use them for:
              </p>
            </CardContent>
          </Card>

          <Grid cols={1} gap="md">
            {cookieTypes.map((cookie) => (
              <Card key={cookie.name}>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-heading-sm text-nexus-50">{cookie.name}</h2>
                    <Badge variant={cookie.canDisable ? 'outline' : 'gold'} size="sm">
                      {cookie.canDisable ? 'Optional' : 'Required'}
                    </Badge>
                  </div>
                  <p className="text-body-md text-nexus-400">{cookie.purpose}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Card>
            <CardContent>
              <h2 className="font-display text-heading-sm text-nexus-50 mb-2">Managing cookies</h2>
              <p className="text-body-md text-nexus-300 leading-relaxed">
                Most browsers let you block or delete cookies through their settings. Blocking essential cookies may prevent parts of the site — like staying logged in — from working correctly.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </main>
  );
}
