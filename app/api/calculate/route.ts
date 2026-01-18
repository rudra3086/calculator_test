import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { expression, result } = await request.json();

    if (!expression || result === undefined) {
      return NextResponse.json(
        { error: 'Expression and result are required' },
        { status: 400 }
      );
    }

    // Save calculation to database
    const calculation = await prisma.calculation.create({
      data: {
        userId: user.userId,
        expression,
        result: result.toString(),
      },
    });

    return NextResponse.json(
      { message: 'Calculation saved', calculation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's calculation history
    const calculations = await prisma.calculation.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 10, // Last 10 calculations
    });

    return NextResponse.json({ calculations }, { status: 200 });
  } catch (error) {
    console.error('Fetch calculations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
