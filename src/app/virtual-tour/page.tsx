import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import { Section, Stack, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Virtual Tour',
  description: 'A 3D virtual walkthrough of Nexus Athletics is on the way. Book an in-person tour in the meantime.',
};

export default function VirtualTourPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Coming Soon"
        title="Our 3D virtual tour is in the works"
        description="We're building an interactive walkthrough of the facility so you can explore it from anywhere. It isn't live yet — but the real thing is even better."
      />

      <Section size="lg" className="bg-nexus-950">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-accent-gold/10 to-accent-copper/10 border-accent-gold/20">
          <CardContent className="text-center py-14">
            <Camera className="w-12 h-12 text-accent-gold mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-heading-lg text-nexus-50 mb-3">Come walk the floor with us</h2>
            <p className="text-body-lg text-nexus-400 max-w-md mx-auto mb-8">
              Until the virtual tour is ready, the best way to see Nexus Athletics is in person — with a coach showing you around and answering questions as you go.
            </p>
            <Flex justify="center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?tour=true">
                  Book an In-Person Tour
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </Flex>
          </CardContent>
        </Card>
      </Section>
    </main>
  );
}
