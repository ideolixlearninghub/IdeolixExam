
export interface Question {
  questionText: string;
  correctAnswer: string;
  options: string[];
  questionType: 'multiple-choice' | 'typed';
}

export interface Assessment {
  grade: string;
  subject: string;
  score: number;
  date: string;
}

export interface Progress {
  [grade: string]: {
    [subject: string]: {
      [topic: string]: number;
    };
  };
}

export interface Student {
  name: string;
  grade: string;
  progress: Progress;
  assessments: Assessment[];
}

export type View = 
  | 'login'
  | 'dashboard'
  | 'subject_selection'
  | 'topic_selection'
  | 'level_selection'
  | 'practice'
  | 'assessment'
  | 'certificate';

export interface CertificateData {
    name: string;
    grade: string;
    subject: string;
    score: number;
}
