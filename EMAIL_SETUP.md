# Email Setup Guide

This guide will help you set up email functionality for the contact form to send emails to `jackblack900105@gmail.com`.

## Prerequisites

1. A Gmail account
2. 2-Factor Authentication enabled on your Gmail account

## Setup Steps

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Navigate to Security
- Enable 2-Step Verification if not already enabled

### 2. Generate App Password
- In your Google Account settings, go to Security
- Under "2-Step Verification", click on "App passwords"
- Select "Mail" as the app
- Select "Other" as the device and enter "TechGlobal Contact Form"
- Copy the generated 16-character password

### 3. Create Environment File
Create a `.env.local` file in the root directory with the following content:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Important:** Replace `your-gmail@gmail.com` with your actual Gmail address and `your-16-character-app-password` with the app password you generated.

### 4. Example Configuration
```env
EMAIL_USER=mycompany@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## How It Works

1. When a user fills out the contact form and clicks "Send Message"
2. The form data is sent to `/api/contact` endpoint
3. The API uses Nodemailer to send an email to `jackblack900105@gmail.com`
4. The email contains all the form data in a nicely formatted HTML email
5. The user receives a success/error message

## Email Content

The email will include:
- Contact information (name, email, company)
- Project details (service, budget)
- The message content
- Professional HTML formatting

## Troubleshooting

### Common Issues:

1. **"Authentication failed" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2-Factor Authentication is enabled

2. **"Connection timeout" error**
   - Check your internet connection
   - Verify the Gmail SMTP settings are correct

3. **"Invalid credentials" error**
   - Double-check your email and app password in `.env.local`
   - Make sure there are no extra spaces in the credentials

### Testing

To test the email functionality:
1. Fill out the contact form on your website
2. Click "Send Message"
3. Check if you receive the email at `jackblack900105@gmail.com`
4. Check the browser console for any error messages

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your app password secure
- Consider using environment variables in production
- The app password is specific to this application and can be revoked if needed

## Production Deployment

For production deployment:
1. Set the environment variables in your hosting platform
2. Use a dedicated email service like SendGrid or AWS SES for better reliability
3. Consider implementing rate limiting to prevent spam
4. Add CAPTCHA for additional security
