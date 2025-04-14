
import { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';

const QuizProgress: React.FC = () => {
  const { questions, currentQuestionIndex } = useQuiz();
  
  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return ((currentQuestionIndex) / questions.length) * 100;
  }, [questions, currentQuestionIndex]);
  
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default QuizProgress;
