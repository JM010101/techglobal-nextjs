# Email Setup Guide

This guide will help you set up email functionality for both the contact form and careers page to send emails to `jackblack900105@gmail.com`.

## 📧 Email Configuration

### Option 1: Gmail SMTP (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:
   Create or update your `.env.local` file:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Option 2: Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Custom SMTP
```env
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
```

## 🚀 How It Works

### Contact Form (`/contact`)
- **Endpoint**: `/api/contact`
- **Sends to**: `jackblack900105@gmail.com`
- **Subject**: "New Contact Form Submission from [Name]"
- **Includes**: Name, email, company, service interest, budget, message

### Careers Page (`/careers`)
- **Endpoint**: `/api/careers`
- **Sends to**: `jackblack900105@gmail.com`
- **Subject**: "New Career Application from [Name] - [Position]"
- **Includes**: Name, email, phone, position, portfolio, cover letter, resume file info

## 📋 Email Content

Both forms send beautifully formatted HTML emails with:
- ✅ Professional styling
- ✅ All form data organized in sections
- ✅ Contact information for easy replies
- ✅ Fallback text version

## 🔧 Testing

1. **Without Email Setup**: Forms will still work and log data to console
2. **With Email Setup**: Forms will send actual emails to `jackblack900105@gmail.com`

## 🛠️ Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2FA is enabled on your Gmail account

2. **"Less secure app access" error**:
   - Use App Passwords instead of enabling less secure apps

3. **Emails not sending**:
   - Check your `.env.local` file has the correct variables
   - Restart your development server after adding environment variables
   - Check the console for error messages

### Environment Variables Check:
```bash
# Make sure these are set in .env.local
echo $EMAIL_USER
echo $EMAIL_PASS
```

## 📝 Example .env.local File

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# Other existing variables...
HUGGINGFACE_API_KEY=your-huggingface-key
```

## ✅ Verification

After setup, test both forms:
1. Go to `/contact` and submit a test message
2. Go to `/careers` and submit a test application
3. Check `jackblack900105@gmail.com` for the emails

Both forms will send professional, well-formatted emails with all the submitted information!
