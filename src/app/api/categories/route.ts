import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ExpenseCategory } from '@/types';

// Get all categories
export async function GET() {
  try {
    const db = await getDatabase();
    const categories = await db.collection<ExpenseCategory>('categories').find({}).toArray();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// Create new category
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, color } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Check if category already exists
    const existingCategory = await db.collection('categories').findOne({ name });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 400 }
      );
    }

    const category = {
      name,
      description,
      color,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('categories').insertOne(category);
    
    return NextResponse.json({ 
      ...category, 
      _id: result.insertedId.toString() 
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
