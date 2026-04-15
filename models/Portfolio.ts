import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  profileImage: string; // base64 or url stored in DB
  profileImageType: string;
  resumeFile: string; // base64 stored in DB
  resumeFileName: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    name: { type: String, default: 'Your Name' },
    title: { type: String, default: 'Full-Stack Developer' },
    tagline: { type: String, default: 'Building the future, one line at a time.' },
    bio: { type: String, default: 'Passionate developer specializing in modern web, mobile, and desktop applications.' },
    email: { type: String, default: 'you@email.com' },
    phone: { type: String, default: '+1 234 567 890' },
    location: { type: String, default: 'Kuala Lumpur, Malaysia' },
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: '' },
    website: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    profileImageType: { type: String, default: 'image/jpeg' },
    resumeFile: { type: String, default: '' },
    resumeFileName: { type: String, default: 'resume.pdf' },
    skills: {
      type: [
        {
          category: String,
          items: [String],
        },
      ],
      default: [
        { category: 'Web Development', items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'TailwindCSS'] },
        { category: 'Mobile & Desktop', items: ['React Native', 'Tauri', 'Electron'] },
        { category: 'AI & Backend', items: ['Python', 'TensorFlow', 'FastAPI', 'OpenCV'] },
        { category: 'Languages', items: ['Java', 'C++', 'JavaScript', 'TypeScript'] },
        { category: 'Game & 3D', items: ['Unity', 'Blender', 'Computer Graphics'] },
        { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
      ],
    },
    experience: {
      type: [
        {
          company: String,
          role: String,
          duration: String,
          description: String,
        },
      ],
      default: [],
    },
    education: {
      type: [
        {
          institution: String,
          degree: String,
          year: String,
        },
      ],
      default: [],
    },
    services: {
      type: [
        {
          title: String,
          description: String,
          icon: String,
        },
      ],
      default: [
        { title: 'Web Development', description: 'Modern, fast websites with Next.js & React tailored to your needs.', icon: 'Globe' },
        { title: 'Mobile Apps', description: 'Cross-platform mobile apps with React Native for iOS and Android.', icon: 'Smartphone' },
        { title: 'Desktop Apps', description: 'Lightweight desktop apps with Tauri or Electron for Windows, Mac & Linux.', icon: 'Monitor' },
        { title: 'AI Solutions', description: 'AI-powered tools, automation, and data pipelines with Python.', icon: 'Brain' },
        { title: 'Game Development', description: '2D & 3D games built with Unity for web and desktop platforms.', icon: 'Gamepad2' },
        { title: '3D Design', description: 'Professional 3D modeling, animation, and rendering with Blender.', icon: 'Box' },
      ],
    },
    stats: {
      type: [{ label: String, value: String }],
      default: [
        { label: 'Projects Completed', value: '20+' },
        { label: 'Technologies', value: '15+' },
        { label: 'Years Experience', value: '3+' },
        { label: 'Happy Clients', value: '10+' },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
