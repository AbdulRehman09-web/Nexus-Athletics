'use client';

import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Section, Container, Grid, Stack, Flex } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { services } from '@/data/services';

export function Services() {
  return (
    <Section id="services" size="xl" className="bg-nexus-950">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Training Services
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Programs Engineered for
            <br />
            <span className="text-gradient-gold">Measurable Results</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            Every service is built on exercise science, personalized by AI, and coached by experts. Choose your path or combine multiple for comprehensive development.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Filter services..."
            className="w-full max-w-md mx-auto mb-10 input bg-surface-100 border-border text-nexus-100 placeholder:text-nexus-500 focus:border-accent-gold"
            aria-label="Filter services"
          />
        </div>

        <Grid cols={3} gap="lg">
          {services.map((service, i) => (
            <Card
              key={service.slug}
              className={cn('card-interactive group relative overflow-hidden', service.isFeatured && 'border-accent-gold/30 shadow-nexus-glow/20')}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {service.isFeatured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-accent-copper" />
              )}
              <CardHeader>
                <Flex justify="between" align="start" gap="4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold group-hover:bg-gradient-to-br group-hover:from-accent-gold group-hover:to-accent-copper group-hover:text-nexus-950 transition-all duration-500">
                    <service.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <Badge variant="gold" size="sm">{service.category.replace('_', ' ')}</Badge>
                </Flex>
                <CardTitle size="md" className="mt-4">{service.name}</CardTitle>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2" role="list" aria-label={`${service.name} benefits`}>
                  {service.benefits.slice(0, 4).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-nexus-300">
                      <Check className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-border">
                  <Flex justify="between" align="center">
                    <div>
                      <span className="font-display text-heading-md font-bold text-nexus-50 tabular-nums">${service.price}</span>
                      <span className="text-body-sm text-nexus-500 ml-1">/month</span>
                    </div>
                    <Badge variant="outline" size="sm">{service.duration}</Badge>
                  </Flex>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/services/${service.slug}`}>
                    View Details
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>

        <div className="text-center mt-8">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/#services">View All 12 Services</Link>
          </Button>
        </div>
      </Stack>
    </Section>
  );
}