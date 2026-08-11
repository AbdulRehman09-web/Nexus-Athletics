'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Shield, Award, Users, Dumbbell, MapPin, Clock, CreditCard, Heart, Brain, Zap } from 'lucide-react';
import { Section, Container, Stack, Flex, Grid } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'GENERAL',
    icon: Sparkles,
    questions: [
      {
        q: 'What makes Nexus Athletics different from other gyms?',
        a: 'Nexus combines three elements rarely found together: elite coaching (150+ combined years), AI-powered adaptive programming, and a 25,000 sq ft facility with recovery infrastructure. We don\'t just provide equipment — we provide a complete performance ecosystem with measurable results tracking.',
      },
      {
        q: 'Do I need to be an experienced athlete to join?',
        a: 'Not at all. Our members range from complete beginners to professional athletes. The AI programming and coaching staff adapt to your level. We specialize in meeting you where you are and building from there.',
      },
      {
        q: 'Can I try the gym before committing?',
        a: 'Yes. We offer a 30-day money-back guarantee on all memberships. You can also schedule a complimentary tour and consultation to experience the facility and meet a coach before joining.',
      },
      {
        q: 'What is the community like?',
        a: 'Our 247+ members include tech executives, healthcare professionals, competitive athletes, and busy parents. The common thread: high standards and mutual respect. No ego, no judgment — just people committed to their best.',
      },
    ],
  },
  {
    category: 'MEMBERSHIP',
    icon: CreditCard,
    questions: [
      {
        q: 'Can I upgrade or downgrade my membership tier?',
        a: 'Yes, anytime. Upgrades take effect immediately with prorated billing. Downgrades take effect at your next billing cycle. No fees for changes.',
      },
      {
        q: 'Is there a contract or cancellation fee?',
        a: 'No contracts. Cancel anytime with 30 days notice. No cancellation fees ever. We believe in earning your membership every month through results and experience.',
      },
      {
        q: 'Can I freeze my membership?',
        a: 'Yes, up to 3 months per year for travel, injury, or life events. Requires 7 days notice. No freeze fees. Your rate is locked in when you rejoin.',
      },
      {
        q: 'Do you offer discounts?',
        a: 'Yes — 15% off any tier for students, military, first responders, and healthcare workers with valid ID. Cannot be combined with other promotions. Corporate partnerships available for 10+ employees.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'All major credit cards, ACH/bank transfer, Apple Pay, Google Pay. Billing is monthly or annually (save 17%). Invoices available for corporate accounts.',
      },
    ],
  },
  {
    category: 'TRAINING',
    icon: Dumbbell,
    questions: [
      {
        q: 'How does the AI programming work?',
        a: 'Our AI analyzes your assessment data, training history, recovery metrics (HRV, sleep), and goals to generate adaptive daily workouts. It adjusts volume, intensity, and exercise selection in real-time based on your feedback and performance. Pro and Elite tiers only.',
      },
      {
        q: 'What if I have injuries or limitations?',
        a: 'Every member gets a movement assessment onboarding. Our Functional Movement Director (DPT) creates modification protocols. The AI incorporates these into all programming. We specialize in training around limitations, not through them.',
      },
      {
        q: 'Can I do my own programming instead of AI?',
        a: 'Absolutely. Basic tier is self-directed facility access. Pro/Elite members can use AI, follow coach-written programs, or blend both. Your coach collaborates on the approach.',
      },
      {
        q: 'How often are programs updated?',
        a: 'AI programs adapt daily based on readiness. Coach-written programs update every 4-6 weeks (mesocycles) with weekly micro-adjustments. Quarterly reassessments inform major shifts.',
      },
    ],
  },
  {
    category: 'TRAINERS',
    icon: Users,
    questions: [
      {
        q: 'How do I choose the right trainer?',
        a: 'Our AI assistant can match you based on goals, schedule, and specialization. Or browse trainer profiles — each lists specializations, certifications, philosophy, and client results. Free 30-min consultation included with Pro/Elite.',
      },
      {
        q: 'Are trainers certified?',
        a: 'All trainers hold CSCS (gold standard) plus additional certifications: USAW, CFSC, SFMA, DNS, PRI, Precision Nutrition, DPT, etc. Combined 150+ years experience across NFL, NBA, Olympic, and tactical programs.',
      },
      {
        q: 'Can I work with multiple trainers?',
        a: 'Yes. Many members see a strength coach for lifting, mobility specialist for recovery, and nutrition coach for diet. Elite includes coordinated multi-coach programming.',
      },
      {
        q: 'What is the trainer-to-member ratio?',
        a: 'We cap at 1:20 for coached members to ensure quality attention. Group classes max at 12 participants. Personal training is always 1:1.',
      },
    ],
  },
  {
    category: 'FACILITIES',
    icon: MapPin,
    questions: [
      {
        q: 'What are your hours?',
        a: 'Mon–Fri: 5:00 AM – 11:00 PM. Sat–Sun: 7:00 AM – 9:00 PM. Pro/Elite members get 24/7 keyless access. Holiday hours posted in app.',
      },
      {
        q: 'Is there parking?',
        a: 'Yes — dedicated 50-space lot plus street parking. 4 EV charging stations. Bike storage inside. 2 blocks from Montgomery BART.',
      },
      {
        q: 'Do you have locker rooms and showers?',
        a: 'Luxury locker rooms with digital keyless lockers, rainfall showers, eucalyptus steam rooms, premium toiletries (Aesop), towel service, and private changing suites. Daily deep cleaning.',
      },
      {
        q: 'What recovery amenities are included?',
        a: 'Pro/Elite: Unlimited Normatec compression, infrared saunas (2), cold plunge (39°F), contrast tubs, PEMF, red light panels, Hyperice stations. Basic: Sauna access only.',
      },
    ],
  },
  {
    category: 'BILLING',
    icon: CreditCard,
    questions: [
      {
        q: 'When am I billed?',
        a: 'Monthly members: same date each month. Annual members: anniversary date. Prorated for mid-cycle changes. Receipts emailed automatically.',
      },
      {
        q: 'What if a payment fails?',
        a: 'We retry 3x over 7 days with email notifications. After 3 failed attempts, membership pauses (access suspended) until resolved. No late fees.',
      },
      {
        q: 'Can I get a receipt for tax/insurance?',
        a: 'Yes. Monthly receipts auto-emailed. Annual summaries in January. FSA/HSA eligible with physician note — we provide documentation.',
      },
    ],
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <Section id="faq" size="xl" className="bg-nexus-950">
      <Stack gap="xl" className="max-w-4xl mx-auto">
        <div className="text-center">
          <Badge variant="gold" size="lg" dot>
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Common Questions
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Everything You Need
            <br />
            <span className="text-gradient-gold">To Know</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400">
            Can\'t find your answer? Our AI assistant knows everything below, or contact us directly.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((category, catIndex) => (
            <Card key={category.category} className="overflow-hidden">
              <div className="p-6 border-b border-border">
                <Flex justify="between" align="center">
                  <Flex align="center" gap="3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/20 text-accent-gold">
                      <category.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-heading-md text-nexus-50">{category.category}</h3>
                  </Flex>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                    aria-expanded={openCategory === category.category}
                  >
                    {openCategory === category.category ? (
                      <>
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        Expand
                      </>
                    )}
                  </Button>
                </Flex>
              </div>

              <div
                className={cn('overflow-hidden transition-all duration-500 ease-expo-out', openCategory === category.category ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}
              >
                <div className="px-6 pb-6 space-y-4">
                  {category.questions.map((faq, qIndex) => (
                    <FAQItem
                      key={`${category.category}-${qIndex}`}
                      question={faq.q}
                      answer={faq.a}
                      index={catIndex * 10 + qIndex}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <p className="text-body-md text-nexus-400 mb-6">Still have questions?</p>
          <Flex justify="center" gap="4">
            <Button variant="primary" size="lg" onClick={() => document.getElementById('ai-assistant')?.scrollIntoView()}>
              <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
              Ask AI Assistant
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </Flex>
        </div>
      </Stack>
    </Section>
  );
}

function FAQItem({
  question,
  answer,
  index,
  openIndex,
  setOpenIndex,
}: {
  question: string;
  answer: string;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full p-4 text-left flex items-start justify-between gap-4"
        aria-expanded={isOpen}
      >
        <p className="font-display text-heading-sm text-nexus-50 pr-4">{question}</p>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-nexus-500 flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-nexus-500 flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      <div
        className={cn('overflow-hidden transition-all duration-300 ease-expo-out px-4', isOpen ? 'pb-4 max-h-96 opacity-100' : 'max-h-0 opacity-0')}
      >
        <p className="text-body-md text-nexus-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}