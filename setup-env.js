const fs = require('fs');
const path = require('path');

// Environment configuration
const envContent = `MONGODB_URI=mongodb://localhost:27017/techglobal
JWT_SECRET=your_super_secret_jwt_key_here_techglobal_2024
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here_techglobal_2024
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@techglobalsolutions.com
ADMIN_PASSWORD=admin123
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./public/uploads
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100`;

const envPath = path.join(__dirname, '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local already exists');
  } else {
    // Create .env.local file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file with default configuration');
  }
  
  console.log('🚀 Environment setup complete!');
  console.log('📝 You can now customize the values in .env.local as needed');
  console.log('🌐 Start the development server with: npm run dev');
} catch (error) {
  console.error('❌ Error setting up environment:', error.message);
  console.log('📝 Please manually create .env.local file with the following content:');
  console.log(envContent);
}
