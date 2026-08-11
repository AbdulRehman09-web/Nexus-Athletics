import { Star, Award, Dumbbell, Flame, Target, Brain, Users, type LucideIcon } from 'lucide-react';
import type { TrainerSpecialization } from '@/types';

export interface TrainerData {
  slug: string;
  name: string;
  title: string;
  specializations: TrainerSpecialization[];
  certifications: string[];
  experienceYears: number;
  biography: string;
  philosophy: string;
  expertise: string[];
  hourlyRate: number;
  languages: string[];
  isFeatured: boolean;
  avatar: string;
}

export const trainers: TrainerData[] = [
  {
    slug: 'alex-carter',
    name: 'Alex Carter',
    title: 'Head Strength Coach',
    specializations: ['STRENGTH_CONDITIONING', 'HYPERTROPHY', 'ATHLETIC_PERFORMANCE'],
    certifications: ['CSCS', 'USAW Level 2', 'CFSC', 'Precision Nutrition L1'],
    experienceYears: 14,
    biography: 'Former Division I strength coach with 14 years developing elite athletes across NFL, NBA, and Olympic programs. Specializes in conjugate periodization, velocity-based training, and long-term athletic development.',
    philosophy: 'Strength is a skill. Master the basics, load progressively, and the results follow.',
    expertise: ['Conjugate Method', 'VBT Implementation', 'Olympic Lifting', 'Athlete Testing'],
    hourlyRate: 200,
    languages: ['English', 'Spanish'],
    isFeatured: true,
    avatar: 'AC',
  },
  {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Body Composition Specialist',
    specializations: ['WEIGHT_LOSS', 'HYPERTROPHY', 'NUTRITION_COACHING'],
    certifications: ['CPT-NASM', 'CNC', 'CFS', 'FMS Level 2'],
    experienceYears: 10,
    biography: 'Helped 500+ clients achieve sustainable body recomposition. Combines metabolic testing, DEXA-guided nutrition, and hypertrophy-specific resistance training. Published researcher in exercise metabolism.',
    philosophy: 'Sustainable change comes from systems, not willpower. Build the environment, the results follow.',
    expertise: ['Metabolic Testing', 'Nutrition Periodization', 'Hypertrophy Programming', 'Behavior Change'],
    hourlyRate: 175,
    languages: ['English', 'Mandarin'],
    isFeatured: true,
    avatar: 'SC',
  },
  {
    slug: 'marcus-johnson',
    name: 'Marcus Johnson',
    title: 'Functional Movement Director',
    specializations: ['FUNCTIONAL_MOVEMENT', 'MOBILITY_FLEXIBILITY', 'REHABILITATION'],
    certifications: ['DPT', 'CSCS', 'SFMA', 'DNS', 'PRI'],
    experienceYears: 12,
    biography: 'Doctor of Physical Therapy turned performance coach. Bridges the gap between rehabilitation and high performance. Expert in movement assessment, corrective strategy, and return-to-sport protocols.',
    philosophy: 'Move well first, then move often. Durability precedes performance.',
    expertise: ['Movement Diagnosis', 'Corrective Exercise', 'Return to Sport', 'Breathing Mechanics'],
    hourlyRate: 185,
    languages: ['English'],
    isFeatured: true,
    avatar: 'MJ',
  },
  {
    slug: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    title: 'Olympic Lifting Coach',
    specializations: ['OLYMPIC_LIFTING', 'STRENGTH_CONDITIONING', 'ATHLETIC_PERFORMANCE'],
    certifications: ['USAW Level 2', 'CSCS', 'CFSC', 'Eleiko Certified'],
    experienceYears: 11,
    biography: 'National-level weightlifter and international coach. Develops explosive power through technical mastery of the snatch and clean & jerk. Works with CrossFit Games athletes and tactical professionals.',
    philosophy: 'Technique is the foundation of power. Perfect the pattern, then add intensity.',
    expertise: ['Snatch/Cl&J Technique', 'Weightlifting Programming', 'Power Development', 'Competition Prep'],
    hourlyRate: 190,
    languages: ['English', 'Spanish'],
    isFeatured: false,
    avatar: 'ER',
  },
  {
    slug: 'david-park',
    name: 'David Park',
    title: 'Endurance & Conditioning Coach',
    specializations: ['ENDURANCE', 'FUNCTIONAL_MOVEMENT', 'ATHLETIC_PERFORMANCE'],
    certifications: ['CSCS', 'USAT Level 2', 'TrainingPeaks Certified', 'CFS'],
    experienceYears: 9,
    biography: 'Former pro triathlete turned coach. Expert in polarized training, lactate threshold development, and multisport periodization. Coaches Ironman qualifiers, marathoners, and hybrid athletes.',
    philosophy: 'Endurance is built slow, raced fast. Patience in training creates speed in competition.',
    expertise: ['Polarized Training', 'Lactate Testing', 'Triathlon Periodization', 'Heat Adaptation'],
    hourlyRate: 165,
    languages: ['English', 'Korean'],
    isFeatured: false,
    avatar: 'DP',
  },
  {
    slug: 'jessica-williams',
    name: 'Jessica Williams',
    title: 'Youth Development Coach',
    specializations: ['YOUTH_DEVELOPMENT', 'STRENGTH_CONDITIONING', 'FUNCTIONAL_MOVEMENT'],
    certifications: ['CSCS', 'YFS', 'LTAD Certified', 'CPR/AED'],
    experienceYears: 8,
    biography: 'Specializes in long-term athletic development for ages 10-18. Creates age-appropriate programming that builds physical literacy, injury resilience, and love for training. Former collegiate soccer player.',
    philosophy: 'Develop the athlete before the sport. Fundamentals create champions.',
    expertise: ['LTAD Model', 'Physical Literacy', 'Growth/Maturation', 'Injury Prevention'],
    hourlyRate: 140,
    languages: ['English'],
    isFeatured: false,
    avatar: 'JW',
  },
];

export const specializationLabels: Record<TrainerSpecialization, string> = {
  STRENGTH_CONDITIONING: 'Strength & Conditioning',
  HYPERTROPHY: 'Hypertrophy',
  WEIGHT_LOSS: 'Weight Loss',
  FUNCTIONAL_MOVEMENT: 'Functional Movement',
  ATHLETIC_PERFORMANCE: 'Athletic Performance',
  MOBILITY_FLEXIBILITY: 'Mobility & Flexibility',
  NUTRITION_COACHING: 'Nutrition Coaching',
  REHABILITATION: 'Rehabilitation',
  OLYMPIC_LIFTING: 'Olympic Lifting',
  POWERLIFTING: 'Powerlifting',
  ENDURANCE: 'Endurance',
  YOUTH_DEVELOPMENT: 'Youth Development',
};

export const specializationIcons: Record<TrainerSpecialization, LucideIcon> = {
  STRENGTH_CONDITIONING: Dumbbell,
  HYPERTROPHY: Target,
  WEIGHT_LOSS: Flame,
  FUNCTIONAL_MOVEMENT: Users,
  ATHLETIC_PERFORMANCE: Award,
  MOBILITY_FLEXIBILITY: Brain,
  NUTRITION_COACHING: Target,
  REHABILITATION: Users,
  OLYMPIC_LIFTING: Dumbbell,
  POWERLIFTING: Award,
  ENDURANCE: Flame,
  YOUTH_DEVELOPMENT: Star,
};

export function getTrainerBySlug(slug: string): TrainerData | undefined {
  return trainers.find((t) => t.slug === slug);
}
