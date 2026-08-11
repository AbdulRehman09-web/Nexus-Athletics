'use client';

import { Dumbbell, Flame, Heart, Wind, Waves, Sparkles, Shield, Thermometer, Snowflake, Sun, Moon, Zap } from 'lucide-react';
import { Section, Container, Grid, Stack, Flex } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge, Separator } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const facilities = [
  {
    name: 'Main Strength Floor',
    icon: Dumbbell,
    description: '12,000 sq ft of elite strength equipment: 12 squat racks, 8 deadlift platforms, 6 monolifts, Eleiko/IVANKO calibrated plates, specialty bars, and 200+ dumbbells up to 200 lbs.',
    features: ['Eleiko Competition Equipment', 'Calibrated Plates', 'Specialty Bars', 'Chalk Stations', 'Platform Sound Dampening'],
    highlights: ['24/7 Access', 'No Wait Times', 'PR Bell'],
    color: 'from-accent-gold to-accent-copper',
  },
  {
    name: 'Olympic Lifting Zone',
    icon: Flame,
    description: 'Dedicated 3,000 sq ft platform area with 8 competition platforms, Werksan bars, bumper plates to 25kg, jerk blocks, and video analysis stations for technical refinement.',
    features: ['Competition Platforms', 'Werksan Bars', 'Jerk Blocks', 'Video Analysis', 'Chalk Included'],
    highlights: ['Coach Supervised', 'Daily Technique Classes', 'Meet Simulation'],
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Cardio & Conditioning Wing',
    icon: Heart,
    description: 'Assault bikes, Concept2 ergs, SkiErgs, TrueForm runners, Wattbikes, and VersaClimbers. Zone training displays with real-time HR and power data.',
    features: ['Assault AirBikes', 'Concept2 Row/Ski', 'TrueForm Treadmills', 'Wattbike Atoms', 'VersaClimbers'],
    highlights: ['Zone Displays', 'HR Integration', 'Class Programming'],
    color: 'from-red-500 to-pink-500',
  },
  {
    name: 'Functional & Turf Area',
    icon: Wind,
    description: "40-yard indoor turf with sleds, prowlers, yokes, farmer's handles, sandbags, atlas stones, and strongman implements. Plyometric flooring and rig attachments.",
    features: ['40yd Turf', 'Sleds/Prowlers', 'Strongman Implements', 'Yoke/Farmers', 'Atlas Stones'],
    highlights: ['Open Access', 'Strongman Classes', 'Turf Sprints'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Recovery & Regeneration Center',
    icon: Waves,
    description: 'Normatec compression boots, infrared sauna (2), cold plunge (39°F), contrast therapy tubs, PEMF therapy, red light panels, massage tables, and Hyperice stations.',
    features: ['Normatec Boots', 'Infrared Saunas', 'Cold Plunge', 'Contrast Tubs', 'PEMF/Red Light'],
    highlights: ['HRV-Guided', 'Unlimited Access', 'Recovery Classes'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Mind-Body Studio',
    icon: Sparkles,
    description: 'Heated studio for mobility flow, breathwork, yoga, and meditation. Cork flooring, infrared heating, premium sound, and guided session library on-demand.',
    features: ['Cork Flooring', 'Infrared Heat', 'Premium Audio', 'On-Demand Library', 'Props Provided'],
    highlights: ['Daily Classes', 'Breathwork Sessions', 'Meditation'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Athlete Testing Lab',
    icon: Zap,
    description: 'Force plates (Vald), velocity-based training (GymAware), motion capture (Qualisys), metabolic cart, DEXA partner access, and comprehensive reporting dashboard.',
    features: ['Force Plates', 'VBT Units', 'Motion Capture', 'Metabolic Testing', 'DEXA Scans'],
    highlights: ['Quarterly Included', 'Real-Time Feedback', 'Coach Dashboard'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Locker Rooms & Amenities',
    icon: Shield,
    description: 'Luxury lockers with digital keyless entry, rainfall showers, eucalyptus steam rooms, cold plunge adjacency, premium toiletries, towel service, and private changing suites.',
    features: ['Keyless Lockers', 'Rainfall Showers', 'Eucalyptus Steam', 'Towel Service', 'Premium Amenities'],
    highlights: ['24/7 Access', 'Daily Cleaning', 'Valet Option'],
    color: 'from-slate-500 to-gray-500',
  },
];

const amenities = [
  { icon: Thermometer, label: 'Infrared Saunas', detail: '2 units, 150°F' },
  { icon: Snowflake, label: 'Cold Plunge', detail: '39°F filtered' },
  { icon: Waves, label: 'Contrast Therapy', detail: 'Hot/cold tubs' },
  { icon: Zap, label: 'PEMF Therapy', detail: 'Pulsed EM field' },
  { icon: Sun, label: 'Red Light Panels', detail: 'Full body coverage' },
  { icon: Moon, label: 'Normatec Compression', detail: '6 attachments' },
  { icon: Shield, label: 'Hyperice Stations', detail: 'Percussion/heat' },
  { icon: Sparkles, label: 'Massage Tables', detail: 'Licensed LMTs' },
];

export function Facilities() {
  return (
    <Section id="facilities" size="xl" className="bg-nexus-950">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="gold" size="lg" dot>
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            World-Class Facility
          </Badge>
          <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
            25,000 sq ft Engineered for
            <br />
            <span className="text-gradient-gold">Peak Performance</span>
          </h2>
          <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
            Every square foot designed by coaches, for athletes. No compromises on equipment quality, space allocation, or recovery infrastructure.
          </p>
        </div>

        <Grid cols={2} gap="lg">
          {facilities.map((facility, i) => (
            <Card key={facility.name} className="card-interactive group p-6 relative overflow-hidden" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Flex justify="between" align="start" gap="4" className="mb-4">
                <div className={cn('relative flex h-12 w-12 items-center justify-center rounded-xl text-nexus-950', `bg-gradient-to-br ${facility.color}`)}>
                  <facility.icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </Flex>
              <CardTitle size="md" className="mb-2">{facility.name}</CardTitle>
              <CardDescription className="mb-4">{facility.description}</CardDescription>
              <ul className="space-y-2 mb-4" role="list" aria-label={`${facility.name} features`}>
                {facility.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-body-sm text-nexus-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/50 flex-shrink-0 mt-1.5" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Flex flexWrap gap="2">
                {facility.highlights.map((highlight, idx) => (
                  <Badge key={idx} variant="gold" size="sm">{highlight}</Badge>
                ))}
              </Flex>
            </Card>
          ))}
        </Grid>

        <Separator variant="gold" className="my-8" />

        <div>
          <h3 className="font-display text-heading-lg text-nexus-50 mb-6 text-center">Recovery & Regeneration Amenities</h3>
          <Grid cols={4} gap="md">
            {amenities.map((amenity, i) => (
              <Card key={amenity.label} className="card-interactive text-center p-6 group" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl mx-auto mb-4 bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold group-hover:bg-gradient-to-br group-hover:from-accent-gold group-hover:to-accent-copper group-hover:text-nexus-950 transition-all duration-500">
                  <amenity.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="font-display text-heading-sm text-nexus-50 mb-1">{amenity.label}</h4>
                <p className="text-body-sm text-nexus-500">{amenity.detail}</p>
              </Card>
            ))}
          </Grid>
        </div>

        <VirtualTourCTA />
      </Stack>
    </Section>
  );
}

function VirtualTourCTA() {
  return (
    <Card className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-nexus-900 to-nexus-800 border-accent-gold/30">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 via-transparent to-accent-copper/10" />
      <div className="relative max-w-3xl mx-auto text-center">
        <Badge variant="gold" size="lg" dot className="mb-4 mx-auto">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          Experience It Yourself
        </Badge>
        <h3 className="font-display text-display-md text-nexus-50 mb-4">Schedule a Private Tour</h3>
        <p className="text-body-lg text-nexus-300 mb-8 max-w-xl mx-auto">
          Walk the floor with a coach, test the equipment, and feel the atmosphere. No pressure — just see what's possible.
        </p>
        <Flex justify="center" gap="4">
          <Button variant="primary" size="lg" asChild>
            <a href="/contact?tour=true">Book Your Tour</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/virtual-tour">3D Virtual Tour</a>
          </Button>
        </Flex>
      </div>
    </Card>
  );
}