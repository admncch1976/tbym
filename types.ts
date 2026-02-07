
export enum UserGender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum Intention {
  ACTIVE = 'Yes, actively discerning',
  NOT_SURE = 'Not sure',
  EXPLORING = 'No, just exploring'
}

export enum FinancialStatus {
  STRONG = 'Strong',
  DEVELOPING = 'Developing',
  NEEDS_STABILITY = 'Needs Stability'
}

export interface ReadinessScore {
  label: string;
  score: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  gender: UserGender;
  age: number;
  intention: Intention;
  scores?: {
    total: number;
    breakdown: ReadinessScore[];
  };
  financialStatus?: FinancialStatus;
  city?: string;
  isPreparationMode: boolean;
  isAdmin: boolean;
  activeRoomId?: string;
  isGuest?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isStructured?: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon?: string;
  questions: string[];
  prompts: string[][]; // Array of prompt strings for each question
  userAAnswers: boolean[];
  userBAnswers: boolean[];
  isLocked: boolean;
}

export interface Room {
  id: string;
  code: string;
  userAId: string;
  userBId?: string;
  messages: Message[];
  sections: Section[];
  createdAt: number;
  isLocked: boolean;
}

export interface QuizQuestion {
  id: number;
  category: string;
  text: string;
  weight: number;
}
