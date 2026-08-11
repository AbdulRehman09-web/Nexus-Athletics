import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Section, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Training Services',
  description: 'Explore all 12 Nexus Athletics training programs — personal training, strength, weight loss, HIIT, recovery, and more.',
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Training Services"
        title="Programs engineered for measurable results"
        description="Every service is built on exercise science, personalized by AI, and coached by experts. Choose your path or combine multiple for comprehensive development."
      />

      <Section size="lg" className="bg-nexus-950">
        <Grid cols={3} gap="lg">
          {services.map((service) => (
            <Card
              key={service.slug}
              className={service.isFeatured ? 'border-accent-gold/30 shadow-nexus-glow/20' : undefined}
            >
              {service.isFeatured && (
                <div className="h-1 -mx-6 -mt-6 mb-6 bg-gradient-to-r from-accent-gold to-accent-copper rounded-t-2xl" />
              )}
              <CardHeader>
                <Flex justify="between" align="start" gap="4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold">
                    <service.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <Badge variant="gold" size="sm">{service.category.replace('_', ' ')}</Badge>
                </Flex>
                <CardTitle size="md" className="mt-4">{service.name}</CardTitle>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2" role="list" aria-label={`${service.name} benefits`}>
                  {service.benefits.slice(0, 4).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-body-sm text-nexus-300">
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
      </Section>
    </main>
  );
}
