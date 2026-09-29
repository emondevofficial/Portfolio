export interface Profile {
  id?: string;
  name: string;
  title: string;
  tagline: string;
  shortIntro: string;
  bio: string;
  aboutText: string;
  avatarUrl: string;
  coverUrl?: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  resumeUrl: string;
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
  technologiesCount: number;
  isAvailableForHire: boolean;
  statusText: string;
  updatedAt?: string;
}

export interface SocialLink {
  id?: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'youtube' | 'instagram' | 'email' | 'website' | 'other';
  label: string;
  url: string;
  icon: string;
  order: number;
  isEnabled: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Architecture & Tools';
  proficiency: number; // 0-100
  icon: string;
  order: number;
  isEnabled: boolean;
  description?: string;
}

export interface Technology {
  id?: string;
  name: string;
  category: string;
  icon: string;
  isFeatured: boolean;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Full-Stack' | 'Distributed Systems' | 'Cloud & DevOps' | 'AI & Data';
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  year: string;
  client?: string;
  role?: string;
  metrics?: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  order: number;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  logo?: string;
  order: number;
}

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialUrl?: string;
  credentialId?: string;
  badgeUrl?: string;
  order: number;
}

export interface Achievement {
  id?: string;
  title: string;
  description: string;
  metric: string;
  year: string;
  order: number;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  isEnabled: boolean;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number; // 1-5
  isEnabled: boolean;
  order: number;
}

export interface SiteSettings {
  id?: string;
  siteTitle: string;
  siteDescription: string;
  author: string;
  keywords: string;
  ogImage: string;
  favicon: string;
  sectionsEnabled: {
    hero: boolean;
    about: boolean;
    skills: boolean;
    technologies: boolean;
    services: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    certifications: boolean;
    achievements: boolean;
    testimonials: boolean;
    resume: boolean;
    contact: boolean;
    footer: boolean;
  };
  navigationLabels: {
    about: string;
    skills: string;
    services: string;
    projects: string;
    experience: string;
    contact: string;
  };
  themeDefault: 'system' | 'dark' | 'light';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
