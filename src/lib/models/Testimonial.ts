import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  author: string;
  company: string;
  position: string;
  quote: string;
  imageUrl: string;
  rating: number;
  project?: string;
  isFeatured: boolean;
  isVerified: boolean;
}

const TestimonialSchema: Schema = new Schema({
  author: {
    type: String,
    required: [true, 'Please add an author name'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
    trim: true,
    maxlength: [100, 'Position cannot be more than 100 characters']
  },
  quote: {
    type: String,
    required: [true, 'Please add a testimonial quote'],
    maxlength: [500, 'Quote cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  project: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
