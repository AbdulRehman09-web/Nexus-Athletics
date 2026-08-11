'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Shield, Award, TrendingUp, Heart } from 'lucide-react';
import { Section, Container, Stack, Flex, Grid } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, Separator } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: '1',
    name: 'Marcus Thornton',
    role: 'Tech Executive / Ironman Finisher',
    content: 'Nexus changed how I approach fitness entirely. The AI programming adapts to my travel schedule, my coach Sarah adjusts nutrition in real-time, and I\'ve dropped 18% body fat while adding 12 lbs of muscle in 8 months. The community pushes you without the ego.',
    rating: 5,
    image: 'MT',
    results: ['-18% Body Fat', '+12 lbs Muscle', 'Sub-11hr Ironman'],
    tags: ['Body Recomposition', 'Endurance', 'Nutrition'],
    featured: true,
  },
  {
    id: '2',
    name: 'Dr. Elena Vasquez',
    role: 'Orthopedic Surgeon / Powerlifter',
    content: 'As a surgeon, I understand biomechanics. Marcus\'s movement assessment caught imbalances I missed in myself. His corrective programming eliminated my chronic shoulder pain and added 85 lbs to my total in 6 months. Clinical precision meets coaching art.',
    rating: 5,
    image: 'EV',
    results: ['+85 lbs Total', 'Pain-Free', 'Meet PRs'],
    tags: ['Rehab', 'Powerlifting', 'Movement Quality'],
    featured: true,
  },
  {
    id: '3',
    name: 'Jordan Kim',
    role: 'Former D1 Athlete / Founder',
    content: 'I\'ve trained at Olympic facilities. Nexus matches that caliber with better technology. The force plate testing, VBT integration, and Alex\'s conjugate programming took my vertical from 34" to 41" in one off-season. This is the future of training.',
    rating: 5,
    image: 'JK',
    results: ['+7" Vertical', 'Force Plate Data', 'VBT Tracking'],
    tags: ['Athletic Performance', 'Explosive Power', 'Tech Integration'],
    featured: true,
  },
  {
    id: '4',
    name: 'Sarah Mitchell',
    role: 'Busy Mom / Corporate VP',
    content: 'I needed efficiency. The AI app gives me 45-min sessions that actually work. My coach Jess checks in weekly, adjusts for sleep stress, and I\'ve never felt stronger postpartum. The recovery center is my sanity — sauna and cold plunge after 60-hour weeks.',
    rating: 5,
    image: 'SM',
    results: ['Postpartum Strength', 'Time Efficient', 'Stress Management'],
    tags: ['Personal Training', 'Recovery', 'Lifestyle Integration'],
    featured: false,
  },
  {
    id: '5',
    name: 'David Okonkwo',
    role: 'Professional MMA Fighter',
    content: 'Fight camp demands everything. Marcus programs my strength around fight schedule, Elena dials nutrition for weight cuts, and the recovery center keeps me fresh for double sessions. Made weight easily, felt strongest I\'ve ever been walking into the cage.',
    rating: 5,
    image: 'DO',
    results: ['Easy Weight Cut', 'Peak Performance', 'Injury-Free Camp'],
    tags: ['Combat Sports', 'Weight Management', 'Recovery'],
    featured: false,
  },
  {
    id: '6',
    name: 'Priya Sharma',
    role: 'Software Engineer / First Marathoner',
    content: 'Started as a complete beginner. David\'s polarized running program, the mobility classes for desk posture, and the community accountability got me to a 3:42 marathon in 10 months. The AI adjustments when work got crazy saved my training.',
    rating: 5,
    image: 'PS',
    results: ['3:42 Marathon', 'Posture Fixed', 'Consistent Training'],
    tags: ['Running', 'Beginner', 'Mobility'],
    featured: false,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const allTestimonials = testimonials;

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % featuredTestimonials.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrevious();
    }
    setTouchStart(null);
  };

  const currentTestimonial = featuredTestimonials[currentIndex];

  return (
    <Section id="testimonials" size="xl" className="bg-gradient-to-b from-nexus-950 via-nexus-950 to-nexus-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            Member Transformations
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            Real People.
            <br />
            <span className="text-gradient-gold">Extraordinary Results.</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            247+ transformations and counting. These are unedited stories from members who committed to the process and trusted our system.
          </p>
        </div>

        <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-expo-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-[0_0_100%] px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {featuredTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  i === currentIndex
                    ? 'bg-accent-gold w-8 shadow-nexus-glow'
                    : 'bg-nexus-600 hover:bg-nexus-500'
                )}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          <Flex justify="center" gap="4" className="mt-6">
            <Button variant="ghost" size="sm" onClick={goToPrevious} aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToNext} aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Flex>
        </div>

        <Separator variant="gold" className="my-8" />

        <div>
          <Flex justify="between" align="center" className="mb-8">
            <h3 className="font-display text-heading-lg text-nexus-50">More Member Stories</h3>
            <Button variant="ghost" size="sm" asChild>
              <a href="/#testimonials">View All 247+</a>
            </Button>
          </Flex>
          <Grid cols={3} gap="lg">
            {allTestimonials.filter(t => !t.featured).map((testimonial, i) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} compact />
            ))}
          </Grid>
        </div>

        <StatsStrip />
      </Stack>
    </Section>
  );
}

function TestimonialCard({ testimonial, compact = false }: { testimonial: typeof testimonials[0]; compact?: boolean }) {
  return (
    <Card className="card-interactive h-full p-6 md:p-8 relative overflow-hidden" style={{ animationDelay: `${Math.random() * 200}ms` }}>
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-16 h-16 text-accent-gold" aria-hidden="true" />
      </div>
      <div className="relative z-10">
        <Flex justify="between" align="start" className="mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn('w-4 h-4 fill-current', i < testimonial.rating ? 'text-accent-gold' : 'text-nexus-700')} aria-hidden="true" />
            ))}
          </div>
          {testimonial.featured && !compact && (
            <Badge variant="gold" size="sm">Featured</Badge>
          )}
        </Flex>
        <p className={cn('text-nexus-300 leading-relaxed mb-6', compact ? 'text-body-sm line-clamp-4' : 'text-body-md')}>
          "{testimonial.content}"
        </p>
        {!compact && testimonial.results.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Measurable results">
            {testimonial.results.map((result, i) => (
              <Badge key={i} variant="outline" size="sm">
                <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                {result}
              </Badge>
            ))}
          </div>
        )}
        <Flex align="center" gap="4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold font-display font-bold text-lg">
            {testimonial.image}
          </div>
          <div>
            <p className="font-display text-heading-sm text-nexus-50">{testimonial.name}</p>
            <p className="text-body-sm text-nexus-500">{testimonial.role}</p>
          </div>
        </Flex>
      </div>
    </Card>
  );
}

function StatsStrip() {
  const stats = [
    { value: '247+', label: 'Total Transformations' },
    { value: '94%', label: 'Goal Achievement Rate' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '18mo', label: 'Avg Membership Length' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
      {stats.map((stat, i) => (
        <Card key={stat.label} className="text-center p-6 relative overflow-hidden group" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative font-display text-display-sm font-bold text-nexus-50 tabular-nums text-gradient mb-1">{stat.value}</div>
          <div className="relative text-body-sm text-nexus-500 uppercase tracking-wider font-medium">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}