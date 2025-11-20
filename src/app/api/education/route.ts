import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Education from '@/models/Education';

export async function GET() {
  try {
    await connectDB();
    const education = await Education.find()
      .sort({ endDate: -1, order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}
