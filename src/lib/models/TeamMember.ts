import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  country: string;
  flag: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
  isActive: boolean;
}

const TeamMemberSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    trim: true
  },
  flag: {
    type: String,
    required: [true, 'Please add a flag emoji']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio'],
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  skills: [{
    type: String,
    required: true
  }],
  experience: {
    type: String,
    required: [true, 'Please add experience information']
  },
  education: {
    type: String,
    required: [true, 'Please add education information']
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
