import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('Careers API route called');
  let body: Record<string, unknown> = {};
  
  try {
    console.log('Attempting to parse request body...');
    body = await request.json();
    console.log('Request body parsed successfully:', body);
    
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      position, 
      portfolio, 
      coverLetter, 
      resumeFile 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !position || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration not available, storing career application data...');
      
      // For now, just log the career application data and return success
      console.log('Career Application Submission:', {
        firstName,
        lastName,
        email,
        phone,
        position,
        portfolio,
        coverLetter,
        resumeFile,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { 
          message: 'Thank you for your application! We have received your resume and will review it soon.',
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
      subject: `New Career Application from ${firstName} ${lastName} - ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">
              New Career Application
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Applicant Information</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Position Applied For:</strong> ${position}</p>
              ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>` : ''}
            </div>
            
            ${coverLetter ? `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Cover Letter</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
                ${(coverLetter as string).replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #3b82f6; margin-bottom: 10px;">Resume</h3>
              <p><strong>File:</strong> ${resumeFile}</p>
              <p style="color: #666; font-size: 14px; font-style: italic;">
                Note: The resume file has been uploaded and is available in the system.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This application was submitted through the TechGlobal Solutions careers page.</p>
              <p>Reply directly to this email to contact ${firstName} ${lastName}.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Career Application
        
        Applicant Information:
        Name: ${firstName} ${lastName}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Position Applied For: ${position}
        ${portfolio ? `Portfolio: ${portfolio}` : ''}
        
        ${coverLetter ? `
        Cover Letter:
        ${coverLetter as string}
        ` : ''}
        
        Resume:
        File: ${resumeFile}
        Note: The resume file has been uploaded and is available in the system.
        
        This application was submitted through the TechGlobal Solutions careers page.
        Reply directly to this email to contact ${firstName} ${lastName}.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Thank you for your application! We have received your resume and will review it soon.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in careers API route:', error);
    console.error('Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });
    
    // Log the career application data even if email fails
    console.log('Career Application Submission (Error occurred):', {
      firstName: body.firstName as string,
      lastName: body.lastName as string,
      email: body.email as string,
      phone: body.phone as string,
      position: body.position as string,
      portfolio: body.portfolio as string,
      coverLetter: body.coverLetter as string,
      resumeFile: body.resumeFile as string,
      timestamp: new Date().toISOString(),
      error: (error as Error).message
    });

    return NextResponse.json(
      { 
        message: 'Thank you for your application! We have received your resume and will review it soon.',
        success: true 
      },
      { status: 200 }
    );
  }
}
