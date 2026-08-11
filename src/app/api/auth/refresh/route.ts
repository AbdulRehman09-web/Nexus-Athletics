import { NextRequest, NextResponse } from 'next/server';
import { getRefreshToken, verifyToken, generateTokenPair, setAuthCookies } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No refresh token' } },
        { status: 401 }
      );
    }

    const payload = verifyToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid refresh token' } },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 401 }
      );
    }

    const newPayload = { userId: user.id, email: user.email, role: user.role };
    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(newPayload);

    await setAuthCookies(accessToken, newRefreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Token refresh failed' } },
      { status: 500 }
    );
  }
}