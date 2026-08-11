import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

// ---------------------------------------------------------------------------
// AI provider config
//
// Both Groq and OpenRouter expose OpenAI-compatible /chat/completions
// endpoints, so we can keep using the `openai` SDK — we just point it at a
// different baseURL/apiKey/model depending on AI_PROVIDER.
//
// Set AI_PROVIDER=groq or AI_PROVIDER=openrouter in .env (defaults to groq).
// Model IDs for free tiers change somewhat often — override AI_MODEL in
// .env if the default below has been retired. Check current free models at:
//   Groq:       https://console.groq.com/docs/models
//   OpenRouter: https://openrouter.ai/models?max_price=0
// ---------------------------------------------------------------------------
const AI_PROVIDER = (process.env.AI_PROVIDER || 'groq').toLowerCase();

const PROVIDER_CONFIG = {
  groq: {
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
    // llama-3.3-70b-versatile / llama-3.1-8b-instant are deprecated by Groq
    // (shutdown Aug 16, 2026). gpt-oss-120b is their recommended, strongest
    // free replacement; gpt-oss-20b is a faster/lighter free alternative.
    defaultModel: 'openai/gpt-oss-120b',
  },
  openrouter: {
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultModel: 'openai/gpt-oss-120b:free',
  },
} as const;

const providerConfig = PROVIDER_CONFIG[AI_PROVIDER as keyof typeof PROVIDER_CONFIG] ?? PROVIDER_CONFIG.groq;
const MODEL = process.env.AI_MODEL || providerConfig.defaultModel;

const openai = new OpenAI({
  apiKey: providerConfig.apiKey,
  baseURL: providerConfig.baseURL,
  // OpenRouter asks for these attribution headers; harmless to send always.
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': process.env.NEXT_PUBLIC_APP_NAME || 'Nexus Athletics',
  },
});

const SYSTEM_PROMPT = `You are Nexus AI, the intelligent fitness assistant for Nexus Athletics - a premium AI-powered gym and fitness ecosystem.

Your knowledge base includes:
- Gym: Nexus Athletics, 123 Fitness Boulevard, San Francisco, CA 94102
- Phone: +1 (555) 123-4567, Email: hello@nexusathletics.com
- Hours: Mon-Fri 5AM-11PM, Sat-Sun 7AM-9PM (24/7 for Pro/Elite members)
- 25,000 sq ft facility with strength floor, Olympic lifting zone, cardio wing, functional turf, recovery center, mind-body studio, athlete testing lab

Membership Tiers:
- BASIC: $29/mo ($290/yr) - Gym access, cardio, lockers, towel service
- PRO: $59/mo ($590/yr) - Everything in Basic + unlimited classes, AI programming, recovery center, monthly assessment, nutrition framework, guest passes
- ELITE: $99/mo ($990/yr) - Everything in Pro + weekly personal training, nutrition coaching, quarterly DEXA, force plate testing, VBT, priority booking, unlimited guest passes

Trainers (6 featured):
- Alex Carter: Head Strength Coach - Strength & Conditioning, Hypertrophy, Athletic Performance (14 yrs, CSCS, USAW L2)
- Sarah Chen: Body Composition Specialist - Weight Loss, Hypertrophy, Nutrition Coaching (10 yrs, NASM, CNC)
- Marcus Johnson: Functional Movement Director - Functional Movement, Mobility, Rehabilitation (12 yrs, DPT, CSCS)
- Elena Rodriguez: Olympic Lifting Coach - Olympic Lifting, Strength, Athletic Performance (11 yrs, USAW L2)
- David Park: Endurance Coach - Endurance, Cardio, Athletic Performance (9 yrs, CSCS, USAT L2)
- Jessica Williams: Youth Development Coach - Youth Development, Strength, Functional Movement (8 yrs, CSCS, YFS)

Services (12): Personal Training, Strength Training, Weight Loss, Muscle Building, Functional Training, Cardio & Conditioning, HIIT Classes, Group Fitness, Mobility & Recovery, Nutrition Guidance, Athlete Performance, Advanced Recovery

Guidelines:
1. Answer ONLY from this knowledge base
2. If information is not in the knowledge base, say "I don't have that information" and suggest contacting the gym
3. Be concise, helpful, and professional
4. Never make up prices, schedules, or availability
5. For medical advice, recommend consulting a healthcare professional
6. Use markdown for formatting when helpful`;

export async function POST(request: NextRequest) {
  try {
    const authUser = await getCurrentUser();
    const body = await request.json();
    const { message, sessionId, stream = false } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Message is required' } },
        { status: 400 }
      );
    }

    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
      });
    }

    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          userId: authUser?.userId,
          title: message.slice(0, 50),
          messages: {
            create: { role: 'user', content: message },
          },
        },
        include: { messages: true },
      });
    } else {
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'user', content: message },
      });
    }

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...session.messages.map((m: { role: string; content: string }) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: message },
    ];

    if (stream) {
      const encoder = new TextEncoder();
      const streamResponse = new ReadableStream({
        async start(controller) {
          try {
            const completion = await openai.chat.completions.create({
              model: MODEL,
              messages,
              stream: true,
              temperature: 0.3,
              max_tokens: 1000,
            });

            let fullResponse = '';
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                fullResponse += content;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            }

            await prisma.chatMessage.create({
              data: { sessionId: session.id, role: 'assistant', content: fullResponse },
            });

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
            controller.close();
          } catch (error) {
            console.error('Stream error:', error);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(streamResponse, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'assistant', content: response },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: response,
        sessionId: session.id,
      },
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Chat failed' } },
      { status: 500 }
    );
  }
}