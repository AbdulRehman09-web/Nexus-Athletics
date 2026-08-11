import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award } from 'lucide-react';
import { Section, Grid, Flex } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { trainers, specializationLabels, specializationIcons } from '@/data/trainers';

export const metadata: Metadata = {
  title: 'Our Trainers',
  description: 'Meet the elite coaching team at Nexus Athletics — certified specialists in strength, conditioning, weight loss, mobility, and more.',
};

export default function TrainersPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Our Coaching Team"
        title="Elite trainers, evidence-based coaching"
        description="Every coach at Nexus Athletics is certified, specialized, and obsessed with your results. Find the trainer whose expertise matches your goals."
      />

      <Section size="lg" className="bg-nexus-950">
        <Grid cols={3} gap="lg">
          {trainers.map((trainer) => (
            <Card key={trainer.slug} className={trainer.isFeatured ? 'border-accent-gold/30' : undefined}>
              <CardContent>
                <Flex justify="between" align="start" gap="4" className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-accent-copper text-nexus-950 font-display font-bold text-heading-sm">
                    {trainer.avatar}
                  </div>
                  {trainer.isFeatured && <Badge variant="gold" size="sm">Featured</Badge>}
                </Flex>
                <h3 className="font-display text-heading-md text-nexus-50">{trainer.name}</h3>
                <p className="text-body-sm text-accent-gold mb-3">{trainer.title}</p>
                <p className="text-body-sm text-nexus-400 mb-4 line-clamp-3">{trainer.biography}</p>
                <Flex gap="2" className="flex-wrap mb-4">
                  {trainer.specializations.map((spec) => {
                    const Icon = specializationIcons[spec];
                    return (
                      <Badge key={spec} variant="outline" size="sm">
                        <Icon className="w-3 h-3 mr-1" aria-hidden="true" />
                        {specializationLabels[spec]}
                      </Badge>
                    );
                  })}
                </Flex>
                <div className="flex items-center gap-2 text-body-sm text-nexus-500">
                  <Award className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                  {trainer.experienceYears} years experience
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <Link href={`/trainers/${trainer.slug}`}>
                    View Profile
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
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
