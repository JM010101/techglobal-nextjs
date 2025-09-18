# TechGlobal Solutions - Next.js Full-Stack Website

A modern, responsive, and professional Next.js website for TechGlobal Solutions - a global IT company delivering high-level web and software solutions worldwide.

## 🚀 Features

### **Frontend (Next.js 14)**
- **Modern React Components**: Built with TypeScript and modern React patterns
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **SEO Optimized**: Next.js built-in SEO features with meta tags and structured data
- **Performance**: Optimized images, lazy loading, and code splitting
- **Accessibility**: WCAG compliant with keyboard navigation support

### **Backend (Next.js API Routes)**
- **RESTful API**: Complete API endpoints for all website functionality
- **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM
- **Authentication**: JWT-based user authentication system
- **Email Integration**: Automated contact forms and notifications
- **File Upload**: Support for image and document uploads
- **Rate Limiting**: API protection and security measures

### **Comprehensive Services**
- **12+ Service Categories**: Development, AI/ML, Cloud/DevOps, Security, Data Analytics, Blockchain, IoT, Consulting, Support
- **50+ Technologies**: Modern tech stack including React, Node.js, Python, AWS, AI frameworks, and more
- **Interactive Filtering**: Dynamic service and portfolio filtering by category
- **Detailed Service Pages**: Individual service descriptions with pricing and timelines

### **Global Team Showcase**
- **6 International Experts**: Team members from China, USA, Italy, India, Germany, Japan
- **Professional Avatars**: Beautiful, diverse team member photos
- **Detailed Profiles**: Individual team member bios, skills, and expertise
- **Interactive Elements**: Hover effects and animations for team members

### **Dynamic Content Management**
- **Blog System**: Full blog with categories, tags, and author management
- **Portfolio Management**: Project showcase with filtering and detailed views
- **Testimonials**: Client feedback system with ratings and reviews
- **Contact System**: Advanced contact forms with email automation

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Beautiful icons
- **Headless UI**: Accessible UI components

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Nodemailer**: Email sending functionality
- **Bcrypt**: Password hashing

### **Development Tools**
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Hot Reload**: Development server with fast refresh

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### **Installation & Setup**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techglobal-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Run the setup script to create the environment file:
   ```bash
   npm run setup
   ```
   
   Or manually create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/techglobal
   JWT_SECRET=your_super_secret_jwt_key_here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=admin@techglobalsolutions.com
   ADMIN_PASSWORD=admin123
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - API: http://localhost:3000/api

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── services/      # Services API
│   │   │   ├── projects/      # Projects API
│   │   │   ├── team/          # Team API
│   │   │   ├── blog/          # Blog API
│   │   │   └── contact/       # Contact API
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx       # Hero section
│   │   │   ├── Services.tsx   # Services section
│   │   │   ├── About.tsx      # About section
│   │   │   ├── Team.tsx       # Team section
│   │   │   ├── Portfolio.tsx  # Portfolio section
│   │   │   ├── Testimonials.tsx # Testimonials section
│   │   │   ├── Blog.tsx       # Blog section
│   │   │   └── CTA.tsx        # Call-to-action section
│   │   ├── Navigation.tsx     # Navigation component
│   │   └── Footer.tsx         # Footer component
│   └── lib/                   # Utility functions
│       ├── models/            # MongoDB models
│       ├── data/              # Sample data
│       ├── mongodb.ts         # Database connection
│       └── seed.ts            # Database seeding
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── README.md                  # Project documentation
```

## 🎨 Design Features

### **Visual Elements**
- **Modern UI**: Clean, minimalistic design with professional aesthetics
- **Gradient Backgrounds**: Beautiful gradient overlays and backgrounds
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Professional Images**: High-quality stock photos and team avatars

### **Responsive Design**
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive design for tablet screens
- **Desktop Experience**: Enhanced experience for large screens
- **Cross-Browser**: Compatible with all modern browsers

### **Accessibility**
- **WCAG Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with screen readers
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
node seed-db.js      # Seed the database with sample data
```

## 🌐 API Endpoints

### **Services**
- `GET /api/services` - Get all services
- `GET /api/services?category=Development` - Filter services by category
- `POST /api/services` - Create new service (admin)
- `GET /api/services/[id]` - Get single service
- `PUT /api/services/[id]` - Update service (admin)
- `DELETE /api/services/[id]` - Delete service (admin)

### **Projects**
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects
- `POST /api/projects` - Create new project (admin)

### **Team**
- `GET /api/team` - Get all team members
- `POST /api/team` - Create new team member (admin)

### **Blog**
- `GET /api/blog` - Get all blog posts
- `GET /api/blog?limit=6` - Get limited blog posts
- `POST /api/blog` - Create new blog post (admin)

### **Contact**
- `POST /api/contact` - Submit contact form

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**
- **Netlify**: Static site deployment
- **AWS**: Full-stack deployment
- **DigitalOcean**: VPS deployment
- **Heroku**: Container deployment

## 🔒 Security Features

- **JWT Authentication**: Secure user authentication
- **Password Hashing**: Bcrypt password encryption
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request security
- **Environment Variables**: Secure configuration management

## 📊 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for better performance
- **Lazy Loading**: Components and images loaded on demand
- **Caching**: API response caching
- **Compression**: Gzip compression for assets
- **CDN Ready**: Optimized for CDN deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: hello@techglobalsolutions.com
- Website: https://techglobalsolutions.com

---

**Built with ❤️ by TechGlobal Solutions**