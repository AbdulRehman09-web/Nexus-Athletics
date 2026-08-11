import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, requireRole } from '@/lib/auth';
import { z } from 'zod';

const SERVICE_CATEGORIES = [
  'PERSONAL_TRAINING',
  'STRENGTH',
  'WEIGHT_LOSS',
  'MUSCLE_BUILDING',
  'FUNCTIONAL',
  'CARDIO',
  'HIIT',
  'GROUP_CLASSES',
  'MOBILITY',
  'NUTRITION',
  'ATHLETE_PERFORMANCE',
  'RECOVERY',
] as const;

const serviceQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(50).default(20),
  search: z.string().optional(),
  category: z.enum(SERVICE_CATEGORIES).optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt', 'sortOrder']).default('sortOrder'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = serviceQuerySchema.parse(Object.fromEntries(searchParams));

    const where: Record<string, unknown> = {};

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { shortDescription: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    if (params.category) {
      where.category = params.category;
    }

    if (params.isActive !== undefined) {
      where.isActive = params.isActive;
    }

    if (params.isFeatured !== undefined) {
      where.isFeatured = params.isFeatured;
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: services,
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
    console.error('Get services error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch services' } },
      { status: 500 }
    );
  }
}

const serviceCreateSchema = z.object({
  slug: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(20),
  benefits: z.array(z.string()).min(1),
  targetAudience: z.string().min(5),
  category: z.enum(SERVICE_CATEGORIES),
  duration: z.string().min(1),
  price: z.number().positive().optional(),
  features: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional(),
  galleryImages: z.array(z.string().url()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireRole(['ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const data = serviceCreateSchema.parse(body);

    const existingService = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (existingService) {
      return NextResponse.json(
        { success: false, error: { code: 'SLUG_EXISTS', message: 'Service slug already exists' } },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({ data });

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Create service error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create service' } },
      { status: 500 }
    );
  }
}