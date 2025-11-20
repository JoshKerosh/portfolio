import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Experience from '@/models/Experience';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find()
      .sort({ startDate: -1, order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
