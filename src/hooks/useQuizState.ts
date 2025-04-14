
import { useState, useEffect } from 'react';
import { Question, UserAnswer } from '../types';
import { QuizResult } from '../types/quiz';
import { fetchQuestions } from '../services/api';
import { useToast } from '@/components/ui/use-toast';
import { QUIZ_TIME_PER_QUESTION, createInitialUserAnswers, evaluateQuestion } from '../utils/quizUtils';

export const useQuizState = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[][]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_TIME_PER_QUESTION);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  const { toast } = useToast();

  // Fetch questions on component mount
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        
        const initialUserAnswers = createInitialUserAnswers(data);
        setUserAnswers(initialUserAnswers);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        toast({
          title: "Error",
          description: "Failed to load questions. Please refresh or try again later.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    getQuestions();
  }, [toast]);

  // Timer logic
  useEffect(() => {
    if (loading || isQuizComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          processCurrentQuestionAndMoveNext();
          return QUIZ_TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, currentQuestionIndex, isQuizComplete]);
  
  // Reset timer when moving to a new question
  useEffect(() => {
    if (!loading) {
      setTimeLeft(QUIZ_TIME_PER_QUESTION);
    }
  }, [currentQuestionIndex, loading]);

  const handleSelectWord = (wordId: number, blankIndex: number) => {
    const newUserAnswers = [...userAnswers];
    const currentQuestionAnswers = [...newUserAnswers[currentQuestionIndex]];
    
    const answerIndex = currentQuestionAnswers.findIndex(a => a.blankIndex === blankIndex);
    
    if (answerIndex !== -1) {
      currentQuestionAnswers[answerIndex].wordId = wordId;
    } else {
      currentQuestionAnswers.push({ blankIndex, wordId });
    }
    
    newUserAnswers[currentQuestionIndex] = currentQuestionAnswers;
    setUserAnswers(newUserAnswers);
  };

  const handleUnselectWord = (blankIndex: number) => {
    const newUserAnswers = [...userAnswers];
    const currentQuestionAnswers = [...newUserAnswers[currentQuestionIndex]];
    
    const answerIndex = currentQuestionAnswers.findIndex(a => a.blankIndex === blankIndex);
    
    if (answerIndex !== -1) {
      currentQuestionAnswers[answerIndex].wordId = null;
      newUserAnswers[currentQuestionIndex] = currentQuestionAnswers;
      setUserAnswers(newUserAnswers);
    }
  };

  const evaluateCurrentQuestion = () => {
    if (!questions.length || currentQuestionIndex >= questions.length) {
      console.warn('No questions available or invalid question index');
      return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      console.warn('Current question is undefined');
      return;
    }
    
    const currentAnswers = userAnswers[currentQuestionIndex] || [];
    const result = evaluateQuestion(currentQuestion, currentAnswers);
    
    if (result) {
      setResults(prev => [...prev, result]);
      
      if (result.isCorrect) {
        setScore(prev => prev + 1);
      }
    }
  };

  const processCurrentQuestionAndMoveNext = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      finalizeQuiz();
      return;
    }

    evaluateCurrentQuestion();
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    processCurrentQuestionAndMoveNext();
  };

  const finalizeQuiz = () => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      evaluateCurrentQuestion();
    }
    setIsQuizComplete(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setResults([]);
    setIsQuizComplete(false);
    setScore(0);
    setTimeLeft(QUIZ_TIME_PER_QUESTION);
    
    const initialUserAnswers = createInitialUserAnswers(questions);
    setUserAnswers(initialUserAnswers);
  };

  const calculateScore = () => {
    return results.filter(result => result.isCorrect).length;
  };

  return {
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
    processCurrentQuestionAndMoveNext
  };
};
