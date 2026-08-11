import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, requireRole } from '@/lib/auth';
import { z } from 'zod';

const TRAINER_SPECIALIZATIONS = [
  'STRENGTH_CONDITIONING',
  'HYPERTROPHY',
  'WEIGHT_LOSS',
  'FUNCTIONAL_MOVEMENT',
  'ATHLETIC_PERFORMANCE',
  'MOBILITY_FLEXIBILITY',
  'NUTRITION_COACHING',
  'REHABILITATION',
  'OLYMPIC_LIFTING',
  'POWERLIFTING',
  'ENDURANCE',
  'YOUTH_DEVELOPMENT',
] as const;

const trainerQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(50).default(10),
  search: z.string().optional(),
  specialization: z.enum(TRAINER_SPECIALIZATIONS).optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z.enum(['name', 'experienceYears', 'createdAt', 'sortOrder']).default('sortOrder'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = trainerQuerySchema.parse(Object.fromEntries(searchParams));

    const where: Record<string, unknown> = {};

    if (params.search) {
      where.OR = [
        { user: { name: { contains: params.search, mode: 'insensitive' } } },
        { title: { contains: params.search, mode: 'insensitive' } },
        { biography: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    if (params.specialization) {
      where.specializations = { has: params.specialization };
    }

    if (params.isActive !== undefined) {
      where.isActive = params.isActive;
    }

    if (params.isFeatured !== undefined) {
      where.isFeatured = params.isFeatured;
    }

    const [trainers, total] = await Promise.all([
      prisma.trainer.findMany({
        where,
        include: {
          user: { select: { name: true, avatarUrl: true, email: true } },
          _count: { select: { testimonials: true, classes: true, programs: true } },
        },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.trainer.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: trainers,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid query', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Get trainers error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch trainers' } },
      { status: 500 }
    );
  }
}

const trainerCreateSchema = z.object({
  userId: z.string().cuid(),
  slug: z.string().min(2).max(100),
  title: z.string().min(2).max(100),
  specializations: z.array(z.enum(TRAINER_SPECIALIZATIONS)).min(1),
  certifications: z.array(z.string()).default([]),
  experienceYears: z.number().int().min(0).max(100),
  biography: z.string().min(10),
  philosophy: z.string().min(10),
  expertise: z.array(z.string()).default([]),
  hourlyRate: z.number().positive().optional(),
  availability: z.record(z.array(z.object({ start: z.string(), end: z.string(), type: z.string() }))).default({}),
  languages: z.array(z.string()).default(['English']),
  socialLinks: z.record(z.string()).optional(),
  featuredImage: z.string().url().optional(),
  galleryImages: z.array(z.string().url()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export async function POST(request: NextRequest) {
  try {
    await requireRole(['ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const data = trainerCreateSchema.parse(body);

    const existingTrainer = await prisma.trainer.findUnique({ where: { slug: data.slug } });
    if (existingTrainer) {
      return NextResponse.json(
        { success: false, error: { code: 'SLUG_EXISTS', message: 'Trainer slug already exists' } },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 400 }
      );
    }

    const existingTrainerForUser = await prisma.trainer.findUnique({ where: { userId: data.userId } });
    if (existingTrainerForUser) {
      return NextResponse.json(
        { success: false, error: { code: 'TRAINER_EXISTS', message: 'User already has a trainer profile' } },
        { status: 400 }
      );
    }

    const trainer = await prisma.trainer.create({ data });

    return NextResponse.json({ success: true, data: trainer }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Create trainer error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create trainer' } },
      { status: 500 }
    );
  }
}