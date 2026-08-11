import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, requireRole } from '@/lib/auth';
import { z } from 'zod';

export async function GET() {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    console.error('Get membership plans error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch membership plans' } },
      { status: 500 }
    );
  }
}

const planCreateSchema = z.object({
  name: z.string().min(2).max(100),
  tier: z.enum(['BASIC', 'PRO', 'ELITE']),
  description: z.string().min(10),
  monthlyPrice: z.number().positive(),
  yearlyPrice: z.number().positive(),
  currency: z.string().default('USD'),
  features: z.array(z.string()).min(1),
  limitations: z.array(z.string()).default([]),
  ctaText: z.string().min(2).max(50),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireRole(['ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const data = planCreateSchema.parse(body);

    const existingPlan = await prisma.membershipPlan.findUnique({ where: { tier: data.tier } });
    if (existingPlan) {
      return NextResponse.json(
        { success: false, error: { code: 'TIER_EXISTS', message: 'Membership tier already exists' } },
        { status: 400 }
      );
    }

    const plan = await prisma.membershipPlan.create({ data });

    return NextResponse.json({ success: true, data: plan }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Create membership plan error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create membership plan' } },
      { status: 500 }
    );
  }
}