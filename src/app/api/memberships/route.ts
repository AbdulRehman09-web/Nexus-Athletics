import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, requireRole } from '@/lib/auth';
import { z } from 'zod';

const membershipQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(50).default(20),
  status: z.string().optional(),
  tier: z.string().optional(),
  userId: z.string().cuid().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const params = membershipQuerySchema.parse(Object.fromEntries(searchParams));

    const where: Record<string, unknown> = {};

    if (authUser.role !== 'ADMIN' && authUser.role !== 'SUPER_ADMIN') {
      where.userId = authUser.userId;
    } else if (params.userId) {
      where.userId = params.userId;
    }

    if (params.status) {
      where.status = params.status;
    }

    if (params.tier) {
      where.tier = params.tier;
    }

    const [memberships, total] = await Promise.all([
      prisma.membership.findMany({
        where,
        include: {
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.membership.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: memberships,
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
    console.error('Get memberships error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch memberships' } },
      { status: 500 }
    );
  }
}

const membershipCreateSchema = z.object({
  userId: z.string().cuid(),
  tier: z.enum(['BASIC', 'PRO', 'ELITE']),
  billingPeriod: z.enum(['monthly', 'yearly']),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  features: z.array(z.string()).default([]),
  autoRenew: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = membershipCreateSchema.parse(body);

    if (authUser.role !== 'ADMIN' && authUser.role !== 'SUPER_ADMIN') {
      if (data.userId !== authUser.userId) {
        return NextResponse.json(
          { success: false, error: { code: 'FORBIDDEN', message: 'Cannot create membership for another user' } },
          { status: 403 }
        );
      }
    }

    const existingActive = await prisma.membership.findFirst({
      where: {
        userId: data.userId,
        status: { in: ['ACTIVE', 'PENDING'] },
      },
    });

    if (existingActive) {
      return NextResponse.json(
        { success: false, error: { code: 'ACTIVE_MEMBERSHIP_EXISTS', message: 'User already has an active membership' } },
        { status: 400 }
      );
    }

    const plan = await prisma.membershipPlan.findUnique({ where: { tier: data.tier } });
    if (!plan) {
      return NextResponse.json(
        { success: false, error: { code: 'PLAN_NOT_FOUND', message: 'Membership plan not found' } },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (data.billingPeriod === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const membership = await prisma.membership.create({
      data: {
        ...data,
        startDate,
        endDate,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, data: membership }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Create membership error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create membership' } },
      { status: 500 }
    );
  }
}