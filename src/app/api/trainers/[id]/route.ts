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

const trainerUpdateSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  specializations: z.array(z.enum(TRAINER_SPECIALIZATIONS)).optional(),
  certifications: z.array(z.string()).optional(),
  experienceYears: z.number().int().min(0).max(100).optional(),
  biography: z.string().min(10).optional(),
  philosophy: z.string().min(10).optional(),
  expertise: z.array(z.string()).optional(),
  hourlyRate: z.number().positive().optional(),
  availability: z.record(z.array(z.object({ start: z.string(), end: z.string(), type: z.string() }))).optional(),
  languages: z.array(z.string()).optional(),
  socialLinks: z.record(z.string()).optional(),
  featuredImage: z.string().url().optional(),
  galleryImages: z.array(z.string().url()).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const trainer = await prisma.trainer.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, avatarUrl: true, email: true, phone: true } },
        classes: { where: { isActive: true }, orderBy: { name: 'asc' } },
        programs: { where: { isActive: true }, orderBy: { name: 'asc' } },
        testimonials: { where: { isApproved: true }, orderBy: { createdAt: 'desc' }, take: 10 },
        _count: { select: { testimonials: true, classes: true, programs: true, bookings: true } },
      },
    });

    if (!trainer) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Trainer not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: trainer });
  } catch (error) {
    console.error('Get trainer error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch trainer' } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(['ADMIN', 'SUPER_ADMIN']);

    const { id } = await params;
    const body = await request.json();
    const data = trainerUpdateSchema.parse(body);

    const trainer = await prisma.trainer.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: trainer });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Update trainer error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update trainer' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(['SUPER_ADMIN']);

    const { id } = await params;

    await prisma.trainer.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete trainer error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete trainer' } },
      { status: 500 }
    );
  }
}