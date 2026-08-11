'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Calendar, Clock, Sparkles, Award, Users, Dumbbell, Shield } from 'lucide-react';
import { Section, Container, Stack, Flex, Grid } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge, Separator } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { membershipPlans as plans, membershipFaqs as faqs } from '@/data/memberships';

export function Memberships() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <Section id="memberships" size="xl" className="bg-nexus-950">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            Membership Plans
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Simple, Transparent
            <br />
            <span className="text-gradient-gold">Pricing</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            No hidden fees. No contracts. Cancel anytime. Every tier includes 24/7 access to our 25,000 sq ft facility.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative flex items-center gap-4 p-1 bg-surface-100 border border-border rounded-xl">
            <Button
              variant={billingPeriod === 'monthly' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('monthly')}
              className="px-6"
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === 'yearly' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('yearly')}
              className="px-6 relative"
            >
              <Flex align="center" gap="1.5">
                Yearly
                <Badge variant="gold" size="xs">Save 17%</Badge>
              </Flex>
            </Button>
          </div>
        </div>

        <Grid cols={3} gap="lg" className="max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card
              key={plan.id}
              className={cn(
                'relative overflow-hidden flex flex-col h-full',
                plan.isPopular && 'border-accent-gold/50 shadow-nexus-glow/30 ring-1 ring-accent-gold/20'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-accent-copper" />
              )}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="gold" size="sm">{plan.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <Flex justify="between" align="start" className="mb-4">
                  <div>
                    <Badge variant={plan.isPopular ? 'gold' : 'outline'} size="sm">{plan.tier}</Badge>
                  </div>
                </Flex>
                <CardTitle size="lg" className="mb-2">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="font-display text-display-lg font-bold text-nexus-50 tabular-nums">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-body-md text-nexus-500 ml-1">
                    {billingPeriod === 'monthly' ? '/mo' : '/yr'}
                  </span>
                  {billingPeriod === 'yearly' && (
                    <span className="ml-3 text-body-sm text-emerald-400 font-medium">
                      Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/yr
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3" role="list" aria-label={`${plan.name} features`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-body-sm text-nexus-300">
                      <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limitations.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t border-border" role="list" aria-label={`${plan.name} limitations`}>
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body-sm text-nexus-500">
                        <X className="w-5 h-5 text-nexus-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <Link href={`/register?plan=${plan.id}`}>
                    {plan.ctaText}
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>

        <Separator variant="gold" className="my-8" />

        <div id="help">
          <h3 className="font-display text-heading-lg text-nexus-50 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>

        <GuaranteeSection />
      </Stack>
    </Section>
  );
}

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="group overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question.slice(0, 20)}`}
      >
        <h4 className="font-display text-heading-sm text-nexus-50 pr-4">{faq.question}</h4>
        <ChevronRight
          className={cn('w-5 h-5 text-nexus-500 flex-shrink-0 transition-transform duration-300', isOpen && 'rotate-90')}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${faq.question.slice(0, 20)}`}
        className={cn('overflow-hidden transition-all duration-300 ease-expo-out', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}
      >
        <div className="px-6 pb-6 text-body-md text-nexus-300 leading-relaxed">{faq.answer}</div>
      </div>
    </Card>
  );
}

function GuaranteeSection() {
  return (
    <Card className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-nexus-900 to-nexus-800 border-accent-gold/30">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 via-transparent to-accent-copper/10" />
      <div className="relative max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            { icon: Shield, title: '30-Day Guarantee', desc: 'Not satisfied? Full refund within 30 days. No questions asked.' },
            { icon: Users, title: 'Freeze Anytime', desc: 'Life happens. Freeze up to 3 months/year at no cost.' },
            { icon: Dumbbell, title: 'Results Promise', desc: 'Quarterly assessments. No progress? We reprogram free.' },
          ].map((item, i) => (
            <Flex key={i} direction="col" align="center" gap="3" className="text-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold">
                <item.icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h4 className="font-display text-heading-sm text-nexus-50">{item.title}</h4>
              <p className="text-body-sm text-nexus-400">{item.desc}</p>
            </Flex>
          ))}
        </div>
        <div className="text-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/register">Start Your 30-Day Trial</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}