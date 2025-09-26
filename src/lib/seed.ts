import connectDB from './mongodb';
import Service from './models/Service';
import TeamMember from './models/TeamMember';
import { sampleServices } from './data/services';

const sampleTeamMembers = [
  {
    name: 'Adam Wong',
    role: 'Full-Stack Developer',
    country: 'Singapore',
    flag: '🇸🇬',
    imageUrl: '/images/team/adam-wong.jpg',
    bio: 'Expert in React, Node.js, and cloud architecture with 8+ years of experience building scalable web applications.',
    skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    experience: '8+ years',
    education: 'Computer Science, National University of Singapore',
    socialLinks: {
      linkedin: '#',
      github: '#',
      portfolio: '#'
    },
    isActive: true
  },
  {
    name: 'Elena Petrov',
    role: 'AI Solutions Architect',
    country: 'Russia',
    flag: '🇷🇺',
    imageUrl: '/images/team/ai-expert.png',
    bio: 'Leading AI expert specializing in machine learning, natural language processing, and intelligent automation systems.',
    skills: ['Python', 'TensorFlow', 'OpenAI', 'MLOps'],
    experience: '10+ years',
    education: 'AI/ML, Moscow Institute of Physics and Technology',
    socialLinks: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    },
    isActive: true
  },
  {
    name: 'Marco Silva',
    role: 'Backend Development Lead',
    country: 'Brazil',
    flag: '🇧🇷',
    imageUrl: '/images/team/backend-expert.png',
    bio: 'Backend architecture specialist with expertise in microservices, API development, and system optimization.',
    skills: ['Node.js', 'Python', 'Docker', 'Kubernetes'],
    experience: '9+ years',
    education: 'Computer Engineering, University of São Paulo',
    socialLinks: {
      linkedin: '#',
      github: '#'
    },
    isActive: true
  },
  {
    name: 'Claude Dubois',
    role: 'AI Research Scientist',
    country: 'France',
    flag: '🇫🇷',
    imageUrl: '/images/team/claude expert.png',
    bio: 'AI research scientist focused on advanced machine learning algorithms and natural language processing innovations.',
    skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Research'],
    experience: '7+ years',
    education: 'AI Research, École Polytechnique',
    socialLinks: {
      linkedin: '#',
      github: '#',
      portfolio: '#'
    },
    isActive: true
  },
  {
    name: 'Yuki Tanaka',
    role: 'Data Analytics Expert',
    country: 'Japan',
    flag: '🇯🇵',
    imageUrl: '/images/team/data-expert.png',
    bio: 'Data science specialist with expertise in big data analytics, business intelligence, and predictive modeling.',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI'],
    experience: '7+ years',
    education: 'Data Science, University of Tokyo',
    socialLinks: {
      linkedin: '#',
      github: '#'
    },
    isActive: true
  },
  {
    name: 'Hans Mueller',
    role: 'Database Manager',
    country: 'Germany',
    flag: '🇩🇪',
    imageUrl: '/images/team/database manager.png',
    bio: 'Database architecture expert specializing in data modeling, performance optimization, and data security.',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling'],
    experience: '8+ years',
    education: 'Computer Science, TU Munich',
    socialLinks: {
      linkedin: '#',
      github: '#'
    },
    isActive: true
  },
  {
    name: 'Sofia Andersson',
    role: 'Game Designer',
    country: 'Sweden',
    flag: '🇸🇪',
    imageUrl: '/images/team/game-designer.png',
    bio: 'Creative game designer with expertise in game mechanics, user experience design, and interactive storytelling.',
    skills: ['Unity', 'Game Design', '3D Modeling', 'User Research'],
    experience: '6+ years',
    education: 'Game Design, KTH Royal Institute of Technology',
    socialLinks: {
      linkedin: '#',
      portfolio: '#',
      twitter: '#'
    },
    isActive: true
  },
  {
    name: 'Carlos Rodriguez',
    role: 'Mobile App Specialist',
    country: 'Spain',
    flag: '🇪🇸',
    imageUrl: '/images/team/mobile-app-expert.png',
    bio: 'Mobile development expert with deep knowledge of React Native, Flutter, and native iOS/Android development.',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    experience: '6+ years',
    education: 'Computer Engineering, Universidad Politécnica de Madrid',
    socialLinks: {
      linkedin: '#',
      github: '#',
      portfolio: '#'
    },
    isActive: true
  },
  {
    name: 'Aisha Al-Rashid',
    role: 'Web Designer',
    country: 'UAE',
    flag: '🇦🇪',
    imageUrl: '/images/team/Web designer.png',
    bio: 'Creative web designer with a focus on user experience, interface design, and creating beautiful, functional digital products.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    experience: '5+ years',
    education: 'Design, American University of Sharjah',
    socialLinks: {
      linkedin: '#',
      portfolio: '#',
      twitter: '#'
    },
    isActive: true
  }
];

export async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing services
    await Service.deleteMany({});
    
    // Insert sample services
    await Service.insertMany(sampleServices);
    
    // Clear existing team members
    await TeamMember.deleteMany({});
    
    // Insert sample team members
    await TeamMember.insertMany(sampleTeamMembers);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Seeded ${sampleServices.length} services and ${sampleTeamMembers.length} team members`);
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, message: 'Error seeding database' };
  }
}
