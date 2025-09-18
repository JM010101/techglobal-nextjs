// Environment configuration for development
// Copy this to .env.local for production use

const envConfig = {
  MONGODB_URI: 'mongodb://localhost:27017/techglobal',
  JWT_SECRET: 'your_super_secret_jwt_key_here_techglobal_2024',
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'your_nextauth_secret_here_techglobal_2024',
  EMAIL_HOST: 'smtp.gmail.com',
  EMAIL_PORT: '587',
  EMAIL_USER: 'your_email@gmail.com',
  EMAIL_PASS: 'your_app_password',
  ADMIN_EMAIL: 'admin@techglobalsolutions.com',
  ADMIN_PASSWORD: 'admin123',
  MAX_FILE_SIZE: '10485760',
  UPLOAD_PATH: './public/uploads',
  RATE_LIMIT_WINDOW: '900000',
  RATE_LIMIT_MAX: '100'
};

// Set environment variables if not already set
Object.keys(envConfig).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = envConfig[key];
  }
});

module.exports = envConfig;
