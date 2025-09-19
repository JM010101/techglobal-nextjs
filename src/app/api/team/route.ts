import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TeamMember from '@/lib/models/TeamMember';

export async function GET() {
  try {
    await connectDB();

    const teamMembers = await TeamMember.find({ isActive: true }).sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const teamMember = await TeamMember.create(body);

    return NextResponse.json({
      success: true,
      data: teamMember
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating team member' },
      { status: 500 }
    );
  }
}
