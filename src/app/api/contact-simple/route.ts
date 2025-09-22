import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Simple contact API route called');
  
  try {
    console.log('Attempting to parse request body...');
    const body = await request.json();
    console.log('Request body parsed successfully:', body);
    
    const { firstName, lastName, email, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('All validations passed, returning success response');
    
    // Just return success without trying to send email
    return NextResponse.json(
      { 
        message: 'Thank you for your message! We have received your inquiry and will get back to you soon.',
        success: true,
        receivedData: {
          firstName,
          lastName,
          email,
          service,
          message
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in simple contact API route:', error);
    console.error('Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
}
