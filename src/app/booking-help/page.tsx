import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, Stack } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Booking Support',
  description: 'Answers to common questions about booking classes, personal training sessions, and facility tours at Nexus Athletics.',
};

const topics = [
  {
    question: 'How do I book a group class?',
    answer: 'Pro and Elite members can book classes through the member app or at the front desk, up to 7 days in advance. Elite members get priority booking windows.',
  },
  {
    question: 'How do I schedule a personal training session?',
    answer: 'Reach out through our contact page or speak with the front desk to schedule directly with your assigned coach. Elite members get a standing weekly slot.',
  },
  {
    question: 'Can I book a facility tour before joining?',
    answer: 'Yes — use the "Book a Tour" option on our contact page, or select "Book a facility tour" from the topic dropdown. We\'ll follow up to find a time that works.',
  },
  {
    question: 'What is your cancellation policy for classes?',
    answer: 'Cancel up to 4 hours before a class with no penalty. Late cancellations or no-shows may affect your booking priority for busy classes.',
  },
  {
    question: "I'm having trouble booking online — who do I contact?",
    answer: 'Send us a message through the contact page with "General inquiry" selected, or call the front desk directly during business hours.',
  },
];

export default function BookingHelpPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Support"
        title="Booking help"
        description="Common questions about booking classes, training sessions, and tours."
      />

      <Section size="lg" className="bg-nexus-950">
        <Stack gap="md" className="max-w-3xl mx-auto">
          {topics.map((topic) => (
            <Card key={topic.question}>
              <CardContent>
                <h2 className="font-display text-heading-sm text-nexus-50 mb-2">{topic.question}</h2>
                <p className="text-body-md text-nexus-400 leading-relaxed">{topic.answer}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-br from-accent-gold/10 to-accent-copper/10 border-accent-gold/20">
            <CardContent className="text-center py-10">
              <h2 className="font-display text-heading-md text-nexus-50 mb-3">Still stuck?</h2>
              <p className="text-body-md text-nexus-400 mb-6">Send us a message and we&apos;ll help sort it out.</p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Contact Support
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
