import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Memberships } from '@/components/sections/Memberships';

export const metadata: Metadata = {
  title: 'Membership Plans',
  description: 'Compare Nexus Athletics membership tiers — Basic, Pro, and Elite. No contracts, cancel anytime, 30-day guarantee.',
};

export default function MembershipsPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Membership Plans"
        title="Find your tier"
        description="Three straightforward plans, no contracts, no cancellation fees. Every tier includes 24/7 access — upgrade for classes, AI programming, and personal coaching."
      />
      <Memberships />
    </main>
  );
}
