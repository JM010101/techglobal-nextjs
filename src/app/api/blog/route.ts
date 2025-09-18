import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let query: any = { isPublished: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }

    let queryBuilder = BlogPost.find(query).sort({ publishedAt: -1 });
    
    if (limit) {
      queryBuilder = queryBuilder.limit(parseInt(limit));
    }

    const blogPosts = await queryBuilder.exec();

    return NextResponse.json({
      success: true,
      count: blogPosts.length,
      data: blogPosts
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const blogPost = await BlogPost.create(body);

    return NextResponse.json({
      success: true,
      data: blogPost
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating blog post' },
      { status: 500 }
    );
  }
}
