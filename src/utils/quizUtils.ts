
import { Question, UserAnswer } from '../types';
import { QuizResult } from '../types/quiz';

// Constants
export const QUIZ_TIME_PER_QUESTION = 30;

// Evaluate a question and create the result
export const evaluateQuestion = (
  currentQuestion: Question | undefined, 
  currentAnswers: UserAnswer[]
): QuizResult | null => {
  if (!currentQuestion) {
    return null;
  }

  // Map each blank to its correct answer word ID
  const correctAnswers = currentQuestion.blanks.map((blankIndex, i) => ({
    blankIndex,
    wordId: currentQuestion.answers[i].id
  }));
  
  // Check if all user answers match correct answers
  const isCorrect = correctAnswers.every(correct => {
    const userAnswer = currentAnswers.find(a => a.blankIndex === correct.blankIndex);
    return userAnswer && userAnswer.wordId === correct.wordId;
  });
  
  const originalSentence = currentQuestion.sentence;
  
  // Create correct sentence by replacing blanks with correct words
  let correctSentence = originalSentence;
  currentQuestion.blanks.forEach((blankIndex, i) => {
    const correctWord = currentQuestion.answers[i].text;
    correctSentence = correctSentence.replace(`[blank${i+1}]`, correctWord);
  });
  
  // Create user sentence by replacing blanks with user-selected words
  let userSentence = originalSentence;
  currentQuestion.blanks.forEach((blankIndex, i) => {
    const userAnswer = currentAnswers.find(a => a.blankIndex === blankIndex);
    const wordId = userAnswer?.wordId;
    let word = '___';
    
    if (wordId) {
      const selectedOption = currentQuestion.options.find(o => o.id === wordId);
      if (selectedOption) {
        word = selectedOption.text;
      }
    }
    
    userSentence = userSentence.replace(`[blank${i+1}]`, word);
  });
  
  return {
    questionId: currentQuestion.id,
    userAnswers: currentAnswers,
    isCorrect,
    originalSentence,
    correctSentence,
    userSentence,
  };
};

// Create initial empty user answers for the questions
export const createInitialUserAnswers = (questions: Question[]): UserAnswer[][] => {
  return questions.map(question => 
    question.blanks.map(blank => ({ blankIndex: blank, wordId: null }))
  );
};
