import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  projectUrl?: string;
  githubUrl?: string;
  client: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  gallery: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Web Development',
      'Mobile App',
      'AI/ML',
      'Cloud Solutions',
      'Blockchain',
      'IoT',
      'Data Analytics',
      'E-commerce',
      'SaaS Platform'
    ]
  },
  projectUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  client: {
    type: String,
    required: [true, 'Please add a client name']
  },
  duration: {
    type: String,
    required: [true, 'Please add project duration']
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  gallery: [{
    type: String
  }],
  challenges: [{
    type: String
  }],
  solutions: [{
    type: String
  }],
  results: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
