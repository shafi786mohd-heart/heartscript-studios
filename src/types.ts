export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
}

export interface Solution {
  id: string;
  name: string;
  problem: string;
  engineeringChallenge: string;
  solution: string;
  benefits: string[];
  products: Product[];
  image: string;
  icon: string; // lucide icon name
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  challenges: string[];
  solutionSet: string[];
  caseStudyTitle: string;
  caseStudySummary: string;
  image: string;
}

export interface TechArticle {
  id: string;
  title: string;
  category: "Engineering" | "Safety" | "IoT" | "B2B Strategy";
  summary: string;
  content: string;
  author: string;
  readTime: string;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface RFQLead {
  id: string;
  timestamp: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  buildingType: string;
  elevatorCount: number;
  shaftConstraints: string[];
  selectedSolutions: string[];
  additionalNotes: string;
  aiAssessment?: string;
}
