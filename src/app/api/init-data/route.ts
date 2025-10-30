import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST() {
  try {
    const db = await getDatabase();

    // Sample categories
    const categories = [
      { name: 'Others', description: 'Miscellaneous expenses', color: '#AED6F1', createdAt: new Date(), updatedAt: new Date() }
    ];

    // Check if categories already exist
    const existingCategories = await db.collection('categories').countDocuments();
    
    if (existingCategories === 0) {
      await db.collection('categories').insertMany(categories);
    }

    // Sample expenses for the last 30 days
    const expenses = [];
    const now = new Date();
    const userId = 'hardcoded-user-id';

    return NextResponse.json({
      message: 'Sample data initialized successfully',
      categoriesCount: categories.length,
      expensesCount: expenses.length
    });
  } catch (error) {
    console.error('Error initializing sample data:', error);
    return NextResponse.json(
      { error: 'Failed to initialize sample data' },
      { status: 500 }
    );
  }
}
