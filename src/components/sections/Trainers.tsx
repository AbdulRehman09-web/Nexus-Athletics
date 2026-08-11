"use client";

import {
  Star,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import {
  Section,
  Container,
  Grid,
  Stack,
  Flex,
} from "@/components/layout/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { trainers, specializationLabels, specializationIcons } from "@/data/trainers";

export function Trainers() {
  return (
    <Section
      id="trainers"
      size="xl"
      className="bg-gradient-to-b from-nexus-950 via-nexus-950 to-nexus-900"
    >
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            Expert Coaching Team
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Coaches Who Have Built
            <br />
            <span className="text-gradient-gold">Champions</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            150+ combined years of experience. Olympic athletes, pro sports
            teams, and thousands of transformations. Your goals deserve this
            level of expertise.
          </p>
        </div>

        <Grid cols={3} gap="lg">
          {trainers.map((trainer, i) => (
            <Card
              key={trainer.slug}
              className={cn(
                "card-interactive group relative overflow-hidden p-0",
                trainer.isFeatured &&
                  "border-accent-gold/30 shadow-nexus-glow/20",
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {trainer.isFeatured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-accent-copper" />
              )}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-nexus-900 to-nexus-800 flex items-center justify-center overflow-hidden">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-4xl font-display font-bold text-accent-gold">
                  {trainer.avatar}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <Badge variant="gold" size="sm">
                    {trainer.experienceYears}+ Years
                  </Badge>
                  <Badge variant="outline" size="sm">
                    ${trainer.hourlyRate}/hr
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <CardTitle size="md" className="mb-1">
                    {trainer.name}
                  </CardTitle>
                  <p className="text-body-sm text-accent-gold font-medium">
                    {trainer.title}
                  </p>
                </div>
                <p className="text-body-sm text-nexus-400 line-clamp-3">
                  {trainer.biography}
                </p>
                <Flex flexWrap gap="2" className="mt-2">
                  {trainer.specializations.slice(0, 3).map((spec) => {
                    const Icon = specializationIcons[spec];

                    return (
                      <Badge key={spec} variant="outline" size="sm">
                        <Icon className="w-3 h-3 mr-1" aria-hidden="true" />
                        {specializationLabels[spec]}
                      </Badge>
                    );
                  })}
                  {trainer.specializations.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{trainer.specializations.length - 3} more
                    </Badge>
                  )}
                </Flex>
                <div className="flex items-center gap-4 text-body-sm text-nexus-500 pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Star
                      className="w-3.5 h-3.5 text-accent-gold fill-current"
                      aria-hidden="true"
                    />
                    4.9
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    200+ Clients
                  </span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={`/trainers/${trainer.slug}`}>
                    View Profile
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>

        <div className="text-center mt-8">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/#trainers">Meet All 12 Coaches</Link>
          </Button>
        </div>
      </Stack>
    </Section>
  );
}
