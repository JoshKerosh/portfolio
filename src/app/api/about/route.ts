import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import About from '@/models/About';

export async function GET() {
  try {
    await connectDB();
    const sections = await About.find({ visible: true })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about sections' },
      { status: 500 }
    );
  }
}
