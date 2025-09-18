import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/lib/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }

    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const service = await Service.create(body);

    return NextResponse.json({
      success: true,
      data: service
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating service' },
      { status: 500 }
    );
  }
}
