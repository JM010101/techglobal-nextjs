import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
  pricing: string;
  detailsUrl: string;
  isPopular?: boolean;
  technologies: string[];
  timeline: string;
  deliverables: string[];
}

const ServiceSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true,
    maxlength: [100, 'Service name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  icon: {
    type: String,
    required: [true, 'Please add an icon']
  },
  features: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Development',
      'AI & Machine Learning',
      'Cloud & DevOps',
      'Security',
      'Data & Analytics',
      'Blockchain',
      'IoT & Hardware',
      'Consulting',
      'Support & Maintenance'
    ]
  },
  pricing: {
    type: String,
    required: [true, 'Please add pricing information']
  },
  detailsUrl: {
    type: String,
    required: [true, 'Please add a details URL']
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  technologies: [{
    type: String,
    required: true
  }],
  timeline: {
    type: String,
    required: [true, 'Please add a timeline']
  },
  deliverables: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
