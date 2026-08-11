import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Award, Globe, Quote } from 'lucide-react';
import { Section, Stack, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { trainers, getTrainerBySlug, specializationLabels, specializationIcons } from '@/data/trainers';

interface TrainerPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return trainers.map((trainer) => ({ slug: trainer.slug }));
}

export function generateMetadata({ params }: TrainerPageProps): Metadata {
  const trainer = getTrainerBySlug(params.slug);
  if (!trainer) return { title: 'Trainer not found' };
  return {
    title: trainer.name,
    description: `${trainer.title} at Nexus Athletics — ${trainer.experienceYears} years of experience.`,
  };
}

export default function TrainerDetailPage({ params }: TrainerPageProps) {
  const trainer = getTrainerBySlug(params.slug);
  if (!trainer) notFound();

  const otherTrainers = trainers.filter((t) => t.slug !== trainer.slug).slice(0, 3);

  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow={trainer.title}
        title={trainer.name}
        breadcrumbLabel={trainer.name}
      />

      <Section size="lg" className="bg-nexus-950">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <Stack gap="xl" className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-accent-copper text-nexus-950 font-display font-bold text-heading-lg flex-shrink-0">
                {trainer.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2 text-body-sm text-nexus-400">
                  <Award className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                  {trainer.experienceYears} years experience
                </div>
                <div className="flex items-center gap-2 text-body-sm text-nexus-400 mt-1">
                  <Globe className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                  {trainer.languages.join(', ')}
                </div>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-accent-gold/40">
              <Quote className="w-6 h-6 text-accent-gold/40 absolute -left-3.5 top-0 bg-nexus-950" aria-hidden="true" />
              <p className="text-body-lg text-nexus-200 italic leading-relaxed">{trainer.philosophy}</p>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">Background</h2>
              <p className="text-body-lg text-nexus-300 leading-relaxed">{trainer.biography}</p>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">Specializations</h2>
              <Flex gap="sm" className="flex-wrap">
                {trainer.specializations.map((spec) => {
                  const Icon = specializationIcons[spec];
                  return (
                    <Badge key={spec} variant="outline" size="md">
                      <Icon className="w-4 h-4 mr-1" aria-hidden="true" />
                      {specializationLabels[spec]}
                    </Badge>
                  );
                })}
              </Flex>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">Areas of expertise</h2>
              <ul className="grid sm:grid-cols-2 gap-3" role="list">
                {trainer.expertise.map((item) => (
                  <li key={item} className="text-body-md text-nexus-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0 mt-2" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-heading-lg text-nexus-50 mb-4">Certifications</h2>
              <Flex gap="sm" className="flex-wrap">
                {trainer.certifications.map((cert) => (
                  <Badge key={cert} variant="gold" size="md">{cert}</Badge>
                ))}
              </Flex>
            </div>
          </Stack>

          <div>
            <Card className="sticky top-24">
              <CardContent>
                <Stack gap="lg">
                  <div>
                    <span className="font-display text-display-sm font-bold text-nexus-50 tabular-nums">${trainer.hourlyRate}</span>
                    <span className="text-body-md text-nexus-500 ml-1">/session</span>
                  </div>
                  <Button variant="primary" size="lg" fullWidth asChild>
                    <Link href="/contact">
                      Book a Session
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" fullWidth asChild>
                    <Link href="/#memberships">View Memberships</Link>
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
        </div>

        {otherTrainers.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="font-display text-heading-lg text-nexus-50 mb-8">Meet other coaches</h2>
            <Grid cols={3} gap="lg">
              {otherTrainers.map((t) => (
                <Card key={t.slug} className="card-interactive">
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-accent-copper text-nexus-950 font-display font-bold mb-4">
                      {t.avatar}
                    </div>
                    <h3 className="font-display text-heading-sm text-nexus-50 mb-1">{t.name}</h3>
                    <p className="text-body-sm text-accent-gold mb-4">{t.title}</p>
                    <Link href={`/trainers/${t.slug}`} className="text-body-sm text-accent-gold hover:text-accent-gold-light transition-colors inline-flex items-center gap-1">
                      View Profile
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
