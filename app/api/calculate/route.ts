import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { query } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

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
    const calcId = uuidv4();
    await query(
      'INSERT INTO Calculation (id, userId, expression, result, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [calcId, user.userId, expression, result.toString()]
    );

    const calculations = await query(
      'SELECT * FROM Calculation WHERE id = ?',
      [calcId]
    ) as Array<{id: string; userId: string; expression: string; result: string; createdAt: Date}>;

    return NextResponse.json(
      { message: 'Calculation saved', calculation: calculations[0] },
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
    const calculations = await query(
      'SELECT * FROM Calculation WHERE userId = ? ORDER BY createdAt DESC LIMIT 10',
      [user.userId]
    ) as Array<{id: string; userId: string; expression: string; result: string; createdAt: Date}>;

    return NextResponse.json({ calculations }, { status: 200 });
  } catch (error) {
    console.error('Fetch calculations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
