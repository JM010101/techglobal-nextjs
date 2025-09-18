import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST() {
  try {
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database seeded successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in seed API:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
