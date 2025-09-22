# Contact Form Debugging Guide

## Issue
You're getting a 500 Internal Server Error when submitting the contact form:
```
POST https://techglobal-nextjs.vercel.app/api/contact 500 (Internal Server Error)
```

## Debugging Steps

### 1. Test the New Debug Routes
I've created several test routes to help identify the issue:

#### Test Routes Available:
- **`/api/test`** - Basic API route test
- **`/api/contact-simple`** - Simplified contact route (no email)
- **`/api/contact`** - Full contact route (with email)

#### Test Page:
Visit **`http://localhost:3000/contact-test`** to test all routes with a form.

### 2. Check Vercel Function Logs
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the "Functions" tab
4. Look for the `/api/contact` function
5. Check the logs for any error messages

### 3. Test Each Route Step by Step

#### Step 1: Test Basic API
```bash
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

#### Step 2: Test Simple Contact Route
```bash
curl -X POST http://localhost:3000/api/contact-simple \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "service": "web-development",
    "message": "Test message"
  }'
```

#### Step 3: Test Full Contact Route
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com", 
    "service": "web-development",
    "message": "Test message"
  }'
```

### 4. Common Issues and Solutions

#### Issue 1: Nodemailer Import Error
**Symptoms**: Error about nodemailer module not found
**Solution**: 
```bash
npm install nodemailer
npm install @types/nodemailer
```

#### Issue 2: Environment Variables Missing
**Symptoms**: Email configuration errors
**Solution**: Add to Vercel environment variables:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Issue 3: Request Body Parsing Error
**Symptoms**: Error parsing JSON
**Solution**: Check if Content-Type header is set correctly

#### Issue 4: CORS Issues
**Symptoms**: CORS errors in browser
**Solution**: Add CORS headers to API route

### 5. Enhanced Logging
I've added detailed logging to the contact route. Check the console/logs for:
- "Contact API route called"
- "Attempting to parse request body..."
- "Request body parsed successfully:"
- Any error details

### 6. Quick Fixes to Try

#### Fix 1: Add CORS Headers
Add this to the top of your contact route:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

#### Fix 2: Add OPTIONS Handler
```typescript
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
```

#### Fix 3: Simplify the Route
Use the `/api/contact-simple` route as a starting point and gradually add features.

### 7. Testing Checklist
- [ ] Test basic API route works
- [ ] Test simple contact route works  
- [ ] Test full contact route works
- [ ] Check Vercel function logs
- [ ] Verify environment variables are set
- [ ] Test with different browsers
- [ ] Check network tab in browser dev tools

### 8. Next Steps
1. Run the dev server: `npm run dev`
2. Visit `http://localhost:3000/contact-test`
3. Fill out the form and test each button
4. Check the console for any errors
5. Check the network tab for response details

### 9. If Still Having Issues
1. Check Vercel deployment logs
2. Verify the API route is deployed correctly
3. Test with a minimal contact route
4. Check if it's a Vercel-specific issue

## Files Created for Debugging
- `src/app/api/test/route.ts` - Basic API test
- `src/app/api/contact-simple/route.ts` - Simplified contact route
- `src/app/contact-test/page.tsx` - Test page with form
- Enhanced logging in `src/app/api/contact/route.ts`

Use these tools to systematically identify where the 500 error is occurring!
