import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  image: string;
  imageType: string;
  featured: boolean;
  isPrivate: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, default: '' },
    category: { type: String, default: 'Web' },
    tags: { type: [String], default: [] },
    image: { type: String, default: '' },
    imageType: { type: String, default: 'image/jpeg' },
    featured: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);