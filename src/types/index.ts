export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary_large_image' | 'summary';
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: 'website' | 'article';
  locale: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
}

export interface TwitterCardData {
  card: 'summary_large_image' | 'summary';
  title: string;
  description: string;
  images: string[];
  site: string;
  creator?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  icon?: React.ReactNode;
  badge?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'linkedin' | 'tiktok';
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface Trainer {
  id: string;
  userId: string;
  slug: string;
  name: string;
  title: string;
  specializations: TrainerSpecialization[];
  certifications: string[];
  experienceYears: number;
  biography: string;
  philosophy: string;
  expertise: string[];
  hourlyRate?: number;
  availability: AvailabilitySchedule;
  languages: string[];
  socialLinks?: SocialLink[];
  featuredImage?: string;
  galleryImages: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export type TrainerSpecialization =
  | 'STRENGTH_CONDITIONING'
  | 'HYPERTROPHY'
  | 'WEIGHT_LOSS'
  | 'FUNCTIONAL_MOVEMENT'
  | 'ATHLETIC_PERFORMANCE'
  | 'MOBILITY_FLEXIBILITY'
  | 'NUTRITION_COACHING'
  | 'REHABILITATION'
  | 'OLYMPIC_LIFTING'
  | 'POWERLIFTING'
  | 'ENDURANCE'
  | 'YOUTH_DEVELOPMENT';

export interface AvailabilitySchedule {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  type: 'personal' | 'class' | 'assessment';
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  benefits: string[];
  targetAudience: string;
  duration: string;
  price?: number;
  features: string[];
  imageUrl?: string;
  galleryImages: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export type ServiceCategory =
  | 'PERSONAL_TRAINING'
  | 'STRENGTH'
  | 'WEIGHT_LOSS'
  | 'MUSCLE_BUILDING'
  | 'FUNCTIONAL'
  | 'CARDIO'
  | 'HIIT'
  | 'GROUP_CLASSES'
  | 'MOBILITY'
  | 'NUTRITION'
  | 'ATHLETE_PERFORMANCE'
  | 'RECOVERY';

export interface MembershipPlan {
  id: string;
  name: string;
  tier: MembershipTier;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  limitations: string[];
  ctaText: string;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export type MembershipTier = 'BASIC' | 'PRO' | 'ELITE';

export interface Membership {
  id: string;
  userId: string;
  tier: MembershipTier;
  status: MembershipStatus;
  startDate: Date;
  endDate?: Date;
  billingPeriod: 'monthly' | 'yearly';
  price: number;
  currency: string;
  features: string[];
  autoRenew: boolean;
}

export type MembershipStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED' | 'PENDING';

export interface Class {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ClassType;
  difficulty: DifficultyLevel;
  trainerId: string;
  trainer?: Trainer;
  schedule: ClassSchedule;
  duration: number;
  capacity: number;
  price?: number;
  location: string;
  equipmentNeeded: string[];
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  requiresBooking: boolean;
}

export type ClassType =
  | 'STRENGTH'
  | 'HIIT'
  | 'CARDIO'
  | 'MOBILITY'
  | 'FUNCTIONAL'
  | 'YOGA'
  | 'PILATES'
  | 'SPIN'
  | 'BOXING'
  | 'RECOVERY';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';

export interface ClassSchedule {
  days: string[];
  time: string;
  timezone: string;
  startDate?: string;
  endDate?: string;
}

export interface Booking {
  id: string;
  userId: string;
  trainerId?: string;
  classId?: string;
  type: 'personal' | 'class';
  status: BookingStatus;
  scheduledAt: Date;
  duration: number;
  notes?: string;
  price?: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  trainerId: string;
  trainer?: Trainer;
  category: ServiceCategory;
  difficulty: DifficultyLevel;
  durationWeeks: number;
  sessionsPerWeek: number;
  price: number;
  currency: string;
  features: string[];
  includes: string[];
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  userId?: string;
  trainerId?: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  imageUrl?: string;
  videoUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

export type FAQCategory =
  | 'GENERAL'
  | 'MEMBERSHIP'
  | 'TRAINING'
  | 'NUTRITION'
  | 'FACILITIES'
  | 'BOOKING'
  | 'BILLING'
  | 'POLICIES';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorId: string;
  author?: User;
  category: string;
  tags: string[];
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  isPublished: boolean;
  publishedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  dateOfBirth?: Date;
  gender?: string;
  height?: number;
  weight?: number;
  fitnessGoals?: string;
  injuries?: string;
  preferences?: Record<string, unknown>;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'MEMBER' | 'TRAINER' | 'ADMIN' | 'SUPER_ADMIN';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    tokens?: number;
    model?: string;
    sources?: string[];
    confidence?: number;
  };
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  userId?: string;
  title?: string;
  isActive: boolean;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  sourceUrl?: string;
  isActive: boolean;
  priority: number;
}

export interface GymLocation {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  hours: BusinessHours;
  timezone: string;
  description?: string;
  amenities: string[];
  images: string[];
  isPrimary: boolean;
  isActive: boolean;
}

export interface BusinessHours {
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
}

export interface ProgressLog {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: BodyMeasurements;
  photos: string[];
  notes?: string;
}

export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftThigh?: number;
  rightThigh?: number;
  leftCalf?: number;
  rightCalf?: number;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  schedule: WeeklySchedule;
  isActive: boolean;
}

export interface WeeklySchedule {
  monday?: WorkoutSession[];
  tuesday?: WorkoutSession[];
  wednesday?: WorkoutSession[];
  thursday?: WorkoutSession[];
  friday?: WorkoutSession[];
  saturday?: WorkoutSession[];
  sunday?: WorkoutSession[];
}

export interface WorkoutSession {
  id: string;
  name: string;
  exercises: Exercise[];
  estimatedDuration: number;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  restSeconds: number;
  notes?: string;
  order: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType =
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'class_reminder'
  | 'payment_failed'
  | 'payment_succeeded'
  | 'membership_renewal'
  | 'trainer_message'
  | 'progress_update'
  | 'announcement'
  | 'ai_insight';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export const breakpoints: BreakpointConfig = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ThreeJSConfig {
  antialias: boolean;
  alpha: boolean;
  preserveDrawingBuffer: boolean;
  powerPreference: 'high-performance' | 'low-power' | 'default';
  logarithmicDepthBuffer: boolean;
}

export const threeJSConfig: ThreeJSConfig = {
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: false,
  powerPreference: 'high-performance',
  logarithmicDepthBuffer: true,
};