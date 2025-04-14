
import React, { createContext, useContext, ReactNode } from 'react';
import { QuizContextType } from '../types/quiz';
import { useQuizState } from '../hooks/useQuizState';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const quizState = useQuizState();

  // Only passing the properties needed for the QuizContextType
  const {
    loading,
    questions,
    currentQuestionIndex,
    userAnswers,
    results,
    timeLeft,
    isQuizComplete,
    score,
    handleSelectWord,
    handleUnselectWord,
    handleNextQuestion,
    resetQuiz,
    calculateScore,
  } = quizState;

  return (
    <QuizContext.Provider
      value={{
        loading,
        questions,
        currentQuestionIndex,
        userAnswers,
        results,
        timeLeft,
        isQuizComplete,
        score,
        handleSelectWord,
        handleUnselectWord,
        handleNextQuestion,
        resetQuiz,
        calculateScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
