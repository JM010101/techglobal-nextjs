import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: {
    url: string;
    alt: string;
  };
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedAt: Date;
  readingTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  isPublished: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

const BlogPostSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Technology Trends',
      'Web Development',
      'AI & Machine Learning',
      'Cloud Computing',
      'Data Analytics',
      'Blockchain',
      'IoT',
      'Cybersecurity',
      'Business',
      'Case Studies'
    ]
  },
  tags: [{
    type: String,
    required: true
  }],
  featuredImage: {
    url: {
      type: String,
      required: [true, 'Please add a featured image URL']
    },
    alt: {
      type: String,
      required: [true, 'Please add alt text for the image']
    }
  },
  author: {
    name: {
      type: String,
      required: [true, 'Please add author name']
    },
    avatar: {
      type: String,
      required: [true, 'Please add author avatar']
    },
    title: {
      type: String,
      required: [true, 'Please add author title']
    }
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  readingTime: {
    type: Number,
    required: [true, 'Please add reading time'],
    min: [1, 'Reading time must be at least 1 minute']
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
