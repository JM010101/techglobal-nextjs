import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const query: Record<string, unknown> = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const project = await Project.create(body);

    return NextResponse.json({
      success: true,
      data: project
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating project' },
      { status: 500 }
    );
  }
}
