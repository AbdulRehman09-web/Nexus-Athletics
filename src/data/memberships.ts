export interface MembershipPlan {
  id: string;
  name: string;
  tier: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  limitations: string[];
  ctaText: string;
  isPopular: boolean;
  badge: string | null;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    tier: 'BASIC',
    description: 'Essential gym access for self-directed trainees.',
    monthlyPrice: 29,
    yearlyPrice: 290,
    currency: 'USD',
    features: [
      '24/7 Gym Access',
      'Strength Floor Access',
      'Cardio Equipment',
      'Locker Room Access',
      'Towel Service',
      'WiFi & Charging Stations',
    ],
    limitations: [
      'No Group Classes',
      'No Personal Training',
      'No Recovery Center',
      'No AI Programming',
    ],
    ctaText: 'Start Basic',
    isPopular: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'PRO',
    tier: 'PRO',
    description: 'Complete training ecosystem with classes and programming.',
    monthlyPrice: 59,
    yearlyPrice: 590,
    currency: 'USD',
    features: [
      'Everything in Basic',
      'Unlimited Group Classes',
      'Monthly Fitness Assessment',
      'AI Workout Programming',
      'Recovery Center Access',
      'Mind-Body Studio Classes',
      'Nutrition Framework Access',
      'Progress Tracking App',
      'Member Events',
      'Guest Passes (2/mo)',
    ],
    limitations: [],
    ctaText: 'Get Pro',
    isPopular: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'elite',
    name: 'ELITE',
    tier: 'ELITE',
    description: 'Ultimate performance package with personal coaching.',
    monthlyPrice: 99,
    yearlyPrice: 990,
    currency: 'USD',
    features: [
      'Everything in Pro',
      'Weekly 1:1 Personal Training',
      'Custom Nutrition Coaching',
      'Quarterly DEXA Scans',
      'Force Plate Testing',
      'Velocity-Based Training',
      'Priority Class Booking',
      'Guest Passes (Unlimited)',
      'Recovery Modalities Unlimited',
      'Direct Coach Communication',
      'Custom Periodization',
      'Competition Preparation',
    ],
    limitations: [],
    ctaText: 'Go Elite',
    isPopular: false,
    badge: 'BEST VALUE',
  },
];

export interface MembershipFAQ {
  question: string;
  answer: string;
}

export const membershipFaqs: MembershipFAQ[] = [
  {
    question: 'Can I upgrade or downgrade my membership?',
    answer: 'Yes, you can change tiers at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at your next billing cycle.',
  },
  {
    question: 'Is there a contract or cancellation fee?',
    answer: 'No contracts. Cancel anytime with 30 days notice. No cancellation fees. We believe in earning your membership every month.',
  },
  {
    question: 'Are personal training sessions included?',
    answer: 'Elite includes weekly 1:1 sessions. Pro and Basic members can add sessions à la carte or purchase packages at member rates.',
  },
  {
    question: "What's included in the AI programming?",
    answer: 'Adaptive workout generation, exercise selection based on equipment availability, autoregulation via RPE/velocity, deload scheduling, and progress analytics. Pro and Elite only.',
  },
  {
    question: 'Can I freeze my membership?',
    answer: 'Yes, up to 3 months per year for travel, injury, or life events. Requires 7 days notice. No freeze fees.',
  },
  {
    question: 'Do you offer student/military/first responder discounts?',
    answer: 'Yes — 15% off any tier with valid ID. Cannot be combined with other promotions.',
  },
];

export function getMembershipPlanById(id: string): MembershipPlan | undefined {
  return membershipPlans.find((p) => p.id === id);
}
