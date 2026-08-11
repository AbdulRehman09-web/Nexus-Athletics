import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Training insights, nutrition tips, and AI-powered fitness strategies from Nexus Athletics — coming soon.',
};

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Nexus Journal"
        title="Our blog is launching soon"
        description="We're building a library of training insights, nutrition guidance, and AI-programming deep dives from our coaching team. Nothing published yet — check back soon."
      />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="md" className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="py-12">
              <Mail className="w-10 h-10 text-accent-gold mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-display text-heading-lg text-nexus-50 mb-3">Want to be notified?</h2>
              <p className="text-body-md text-nexus-400 mb-2">
                Join the newsletter in the footer below and we&apos;ll let you know the moment we publish our first post.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </main>
  );
}
