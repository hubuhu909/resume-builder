export type ResumeStyle = 'modern' | 'classic' | 'creative' | 'minimal';

export type JobCategory =
  | 'retail-customer-service'
  | 'food-service'
  | 'babysitting-childcare'
  | 'tutoring-academic'
  | 'sports-coaching'
  | 'arts-entertainment'
  | 'technology-it'
  | 'healthcare-medical'
  | 'office-administrative'
  | 'construction-labor'
  | 'internship-general';

export interface Education {
  schoolName: string;
  graduationYear: string;
  gpa: string;
  relevantCourses: string;
  honors: string;
}

export interface Experience {
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Volunteer {
  organization: string;
  role: string;
  hours: string;
  description: string;
}

export interface ResumeData {
  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedIn: string;

  // About
  aboutYou: string;

  // Education
  education: Education[];

  // Experience
  experience: Experience[];

  // Volunteering
  volunteering: Volunteer[];

  // Skills
  skills: string[];

  // Awards
  awards: string;

  // Clubs & Activities
  clubs: string;
}

export interface ResumeConfig {
  style: ResumeStyle;
  jobCategory: JobCategory;
  includeCoverLetter: boolean;
  coverLetterContent: string;
}

export interface AppState {
  currentScreen: number;
  resumeData: ResumeData;
  config: ResumeConfig;
  generatedResume: string;
  generatedCoverLetter: string;
}

export const defaultResumeData: ResumeData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  linkedIn: '',
  aboutYou: '',
  education: [{ schoolName: '', graduationYear: '', gpa: '', relevantCourses: '', honors: '' }],
  experience: [],
  volunteering: [],
  skills: [],
  awards: '',
  clubs: '',
};

export const defaultConfig: ResumeConfig = {
  style: 'modern',
  jobCategory: 'retail-customer-service',
  includeCoverLetter: false,
  coverLetterContent: '',
};

export const jobCategoryLabels: Record<JobCategory, string> = {
  'retail-customer-service': '🛍️ Retail & Customer Service',
  'food-service': '🍕 Food Service & Restaurant',
  'babysitting-childcare': '👶 Babysitting & Childcare',
  'tutoring-academic': '📚 Tutoring & Academic Help',
  'sports-coaching': '⚽ Sports & Coaching',
  'arts-entertainment': '🎨 Arts & Entertainment',
  'technology-it': '💻 Technology & IT',
  'healthcare-medical': '🏥 Healthcare & Medical',
  'office-administrative': '📋 Office & Administrative',
  'construction-labor': '🔨 Construction & Labor',
  'internship-general': '🎓 General Internship',
};
