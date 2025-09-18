// Simple database seeding script
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techglobal';

const sampleServices = [
  {
    _id: '1',
    name: 'Full-Stack Web Development',
    description: 'Complete web applications with modern frameworks and cutting-edge technologies. From concept to deployment, we handle every aspect.',
    icon: 'Laptop',
    features: [
      'React, Vue.js, Angular Frontend',
      'Node.js, Python, PHP Backend',
      'MongoDB, PostgreSQL Databases',
      'Responsive Mobile-First Design'
    ],
    category: 'Development',
    pricing: 'Starting from $5,000',
    detailsUrl: '/services#full-stack-web-development',
    isPopular: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    timeline: '4-8 weeks',
    deliverables: ['Complete Web Application', 'Source Code', 'Documentation', 'Deployment']
  },
  {
    _id: '2',
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
    icon: 'Smartphone',
    features: [
      'React Native & Flutter',
      'Native iOS & Android',
      'App Store Optimization',
      'Push Notifications & Analytics'
    ],
    category: 'Development',
    pricing: 'Starting from $8,000',
    detailsUrl: '/services#mobile-app-development',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    timeline: '6-12 weeks',
    deliverables: ['Mobile Application', 'App Store Submission', 'Source Code', 'Maintenance Plan']
  },
  {
    _id: '3',
    name: 'AI & Machine Learning Solutions',
    description: 'Intelligent automation and machine learning systems that transform your business processes and decision-making capabilities.',
    icon: 'Brain',
    features: [
      'Custom AI Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics'
    ],
    category: 'AI & Machine Learning',
    pricing: 'Starting from $12,000',
    detailsUrl: '/services#ai-machine-learning',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    timeline: '8-16 weeks',
    deliverables: ['AI Model', 'API Integration', 'Training Data', 'Documentation']
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('techglobal');
    const servicesCollection = db.collection('services');
    
    // Clear existing services
    await servicesCollection.deleteMany({});
    console.log('🗑️ Cleared existing services');
    
    // Drop the collection to remove indexes
    await servicesCollection.drop();
    console.log('🗑️ Dropped services collection');
    
    // Recreate the collection
    await db.createCollection('services');
    console.log('📦 Recreated services collection');
    
    // Insert sample services
    await servicesCollection.insertMany(sampleServices);
    console.log('🌱 Seeded services data successfully');
    
    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
