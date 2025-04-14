
export interface Word {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  originalId?: string; // Add originalId to store the questionId from the new JSON
  sentence: string;
  options: Word[];
  blanks: number[];
  answers: Word[];
}

export interface UserAnswer {
  blankIndex: number;
  wordId: number | null;
}

// Re-export the quiz types for backward compatibility
export * from './quiz';
