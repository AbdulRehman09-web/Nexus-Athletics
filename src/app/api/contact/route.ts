import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  topic: z.enum(['membership', 'personal-training', 'tour', 'general', 'other']).default('general'),
  message: z.string().min(10).max(2000),
});

/**
 * NOTE: this endpoint validates and accepts the message, but does not yet
 * send an email or persist to a database — there's no email provider or
 * Prisma schema wired up in this project yet. Swap the console.log below
 * for a real integration (Resend, Postmark, SES, a `ContactMessage` Prisma
 * model, etc.) before relying on this in production.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    console.log('[contact] New inquiry received:', {
      ...data,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Thanks — we received your message and will get back to you within one business day.' },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Please check the form and try again.', details: error.flatten() } },
        { status: 400 }
      );
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong. Please try again.' } },
      { status: 500 }
    );
  }
}
