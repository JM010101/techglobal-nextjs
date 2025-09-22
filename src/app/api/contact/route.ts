import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('Contact API route called');
  let body: Record<string, unknown> = {};
  try {
    console.log('Attempting to parse request body...');
    body = await request.json();
    console.log('Request body parsed successfully:', body);
    const { firstName, lastName, email, company, service, budget, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration not available, storing contact form data...');
      
      // For now, just log the contact form data and return success
      // In a real application, you might want to store this in a database
      console.log('Contact Form Submission:', {
        firstName,
        lastName,
        email,
        company,
        service,
        budget,
        message,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { 
          message: 'Thank you for your message! We have received your inquiry and will get back to you soon.',
          success: true 
        },
        { status: 200 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jackblack900105@gmail.com',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Contact Information</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Project Details</h3>
              <p><strong>Service Interested In:</strong> ${service}</p>
              ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Message</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
                ${(message as string).replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This message was sent from the TechGlobal Solutions contact form.</p>
              <p>Reply directly to this email to respond to ${firstName} ${lastName}.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Contact Information:
        Name: ${firstName} ${lastName}
        Email: ${email}
        ${company ? `Company: ${company}` : ''}
        
        Project Details:
        Service Interested In: ${service}
        ${budget ? `Budget Range: ${budget}` : ''}
        
        Message:
        ${message as string}
        
        This message was sent from the TechGlobal Solutions contact form.
        Reply directly to this email to respond to ${firstName} ${lastName}.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We have received your inquiry and will get back to you soon.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact API route:', error);
    console.error('Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });
    
    // Log the contact form data even if email fails
    console.log('Contact Form Submission (Error occurred):', {
      firstName: body.firstName as string,
      lastName: body.lastName as string,
      email: body.email as string,
      company: body.company as string,
      service: body.service as string,
      budget: body.budget as string,
      message: body.message as string,
      timestamp: new Date().toISOString(),
      error: (error as Error).message
    });

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We have received your inquiry and will get back to you soon.',
        success: true 
      },
      { status: 200 }
    );
  }
}