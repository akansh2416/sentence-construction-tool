
import { Question, UserAnswer } from './index';

export interface QuizResult {
  questionId: number;
  userAnswers: UserAnswer[];
  isCorrect: boolean;
  originalSentence: string;
  correctSentence: string;
  userSentence: string;
}

export interface QuizContextType {
  loading: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[][];
  results: QuizResult[];
  timeLeft: number;
  isQuizComplete: boolean;
  score: number;
  handleSelectWord: (wordId: number, blankIndex: number) => void;
  handleUnselectWord: (blankIndex: number) => void;
  handleNextQuestion: () => void;
  resetQuiz: () => void;
  calculateScore: () => number;
}
