export interface PersonalInfo {
  fullName: string;
  photo?: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export type TemplateType = 'minimalist' | 'executive' | 'modern';
export type FontFamily = 'Inter' | 'Roboto' | 'Merriweather' | 'Playfair Display';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'crimson' | 'dark';

export interface ColorSchemeColors {
  primary: string;
  light: string;
  sidebar: string;
  accent: string;
}

export const colorSchemeMap: Record<ColorScheme, ColorSchemeColors> = {
  blue:    { primary: '#1D4ED8', light: '#DBEAFE', sidebar: '#1E3A8A', accent: '#3B82F6' },
  green:   { primary: '#059669', light: '#D1FAE5', sidebar: '#065F46', accent: '#10B981' },
  purple:  { primary: '#7C3AED', light: '#EDE9FE', sidebar: '#5B21B6', accent: '#8B5CF6' },
  crimson: { primary: '#DC2626', light: '#FEE2E2', sidebar: '#991B1B', accent: '#EF4444' },
  dark:    { primary: '#1F2937', light: '#F3F4F6', sidebar: '#111827', accent: '#6B7280' },
};

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    fullName: 'Muhammad Umar',
    photo: '',
    title: 'Senior Software Engineer',
    email: 'umar@example.com',
    phone: '+92 300 1234567',
    location: 'Lahore, Pakistan',
    linkedin: 'linkedin.com/in/muhammadumar',
    website: 'muhammadumar.dev',
  },
  summary:
    'Results-driven Software Engineer with 4+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about writing clean, maintainable code and delivering exceptional user experiences that drive business growth.',
  experience: [
    {
      id: '1',
      company: 'TechSolutions Pvt Ltd',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      description:
        'Led development of a customer portal serving 50,000+ users. Reduced page load time by 40% through performance optimizations. Mentored 3 junior developers and conducted regular code reviews.',
    },
    {
      id: '2',
      company: 'Digital Innovations',
      position: 'Software Engineer',
      startDate: 'Mar 2020',
      endDate: 'Dec 2021',
      current: false,
      description:
        'Built RESTful APIs using Node.js and Express. Developed responsive UI components with React and Tailwind CSS. Integrated payment gateways including Stripe and PayPal.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Engineering & Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: 'Sep 2016',
      endDate: 'Jun 2020',
      grade: '3.8 GPA',
    },
  ],
  skills: [
    { id: '1', name: 'React.js', level: 'Expert' },
    { id: '2', name: 'Node.js', level: 'Advanced' },
    { id: '3', name: 'TypeScript', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Intermediate' },
    { id: '5', name: 'PostgreSQL', level: 'Advanced' },
    { id: '6', name: 'AWS', level: 'Intermediate' },
  ],
  languages: [
    { id: '1', name: 'Urdu', proficiency: 'Native' },
    { id: '2', name: 'English', proficiency: 'Professional' },
    { id: '3', name: 'Punjabi', proficiency: 'Native' },
  ],
};
