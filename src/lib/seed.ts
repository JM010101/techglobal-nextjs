import connectDB from './mongodb';
import Service from './models/Service';
import { sampleServices } from './data/services';

export async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing services
    await Service.deleteMany({});
    
    // Insert sample services
    await Service.insertMany(sampleServices);
    
    console.log('✅ Database seeded successfully!');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, message: 'Error seeding database' };
  }
}
