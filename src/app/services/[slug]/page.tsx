import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Users } from 'lucide-react';
import { Section, Stack, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { services, getServiceBySlug } from '@/data/services';

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow={service.category.replace('_', ' ')}
        title={service.name}
        description={service.shortDescription}
        breadcrumbLabel={service.name}
      />

      <Section size="lg" className="bg-nexus-950">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <Stack gap="xl" className="lg:col-span-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold">
              <service.icon className="w-8 h-8" aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">About this program</h2>
              <p className="text-body-lg text-nexus-300 leading-relaxed">{service.description}</p>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">What you get</h2>
              <ul className="grid sm:grid-cols-2 gap-3" role="list">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-body-md text-nexus-300">
                    <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">Included features</h2>
              <Flex gap="sm" className="flex-wrap">
                {service.features.map((feature) => (
                  <Badge key={feature} variant="outline" size="md">{feature}</Badge>
                ))}
              </Flex>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-100 border border-border">
              <Users className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-body-sm font-medium text-nexus-200 mb-1">Best for</p>
                <p className="text-body-md text-nexus-400">{service.targetAudience}</p>
              </div>
            </div>
          </Stack>

          <div>
            <Card className="sticky top-24">
              <CardContent>
                <Stack gap="lg">
                  <div>
                    <span className="font-display text-display-sm font-bold text-nexus-50 tabular-nums">${service.price}</span>
                    <span className="text-body-md text-nexus-500 ml-1">/month</span>
                  </div>
                  <Flex justify="between" className="text-body-sm text-nexus-400 pb-4 border-b border-border">
                    <span>Session length</span>
                    <span className="text-nexus-200 font-medium">{service.duration}</span>
                  </Flex>
                  <Button variant="primary" size="lg" fullWidth asChild>
                    <Link href="/#memberships">
                      Get Started
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" fullWidth asChild>
                    <Link href="/contact">Ask a Question</Link>
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
        </div>

        {otherServices.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="font-display text-heading-lg text-nexus-50 mb-8">Explore other programs</h2>
            <Grid cols={3} gap="lg">
              {otherServices.map((s) => (
                <Card key={s.slug} className="card-interactive">
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold mb-4">
                      <s.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-heading-sm text-nexus-50 mb-2">{s.name}</h3>
                    <p className="text-body-sm text-nexus-400 mb-4">{s.shortDescription}</p>
                    <Link href={`/services/${s.slug}`} className="text-body-sm text-accent-gold hover:text-accent-gold-light transition-colors inline-flex items-center gap-1">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        )}
      </Section>
    </main>
  );
}
