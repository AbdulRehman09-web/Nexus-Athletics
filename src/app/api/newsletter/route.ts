import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email(),
});

/**
 * NOTE: stub endpoint — validates and accepts the email but doesn't yet
 * persist it or connect to an email provider (Mailchimp, Resend audiences,
 * a Prisma `Subscriber` model, etc.). Wire that up before relying on this.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    console.log('[newsletter] New subscriber:', email, new Date().toISOString());

    return NextResponse.json({
      success: true,
      data: { message: "You're subscribed. Look out for our next update." },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Please enter a valid email address.' } },
        { status: 400 }
      );
    }
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong. Please try again.' } },
      { status: 500 }
    );
  }
}
