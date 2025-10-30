import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { getDateRange } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'daily' | 'weekly' | 'monthly' || 'monthly';
    const date = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();

    const { startDate, endDate } = getDateRange(period, date);
    const db = await getDatabase();

    // Get expenses for the period
    const expenses = await db.collection('expenses')
      .find({
        userId: user.userId,
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .toArray();

    // Calculate totals
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Category breakdown
    const categoryMap = new Map();
    expenses.forEach(expense => {
      if (categoryMap.has(expense.category)) {
        const existing = categoryMap.get(expense.category);
        categoryMap.set(expense.category, {
          ...existing,
          amount: existing.amount + expense.amount,
          count: existing.count + 1
        });
      } else {
        categoryMap.set(expense.category, {
          category: expense.category,
          amount: expense.amount,
          count: 1
        });
      }
    });

    const categoryBreakdown = Array.from(categoryMap.values());

    // Daily breakdown for charts
    const dailyBreakdown = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      const dayExpenses = expenses.filter(expense => 
        expense.date >= dayStart && expense.date <= dayEnd
      );

      const dayTotal = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      dailyBreakdown.push({
        date: dayStart.toISOString().split('T')[0],
        amount: dayTotal,
        count: dayExpenses.length
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json({
      totalAmount,
      categoryBreakdown,
      dailyBreakdown,
      period,
      startDate,
      endDate,
      expenseCount: expenses.length
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
