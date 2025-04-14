
import { useQuiz } from '../context/QuizContext';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const WordOptions: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    userAnswers, 
    handleSelectWord 
  } = useQuiz();
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentUserAnswers = userAnswers[currentQuestionIndex] || [];
  
  // Determine which words have already been selected
  const selectedWordIds = useMemo(() => 
    currentUserAnswers
      .filter(answer => answer.wordId !== null)
      .map(answer => answer.wordId),
  [currentUserAnswers]);

  if (!currentQuestion) return null;

  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-medium mb-3">Choose the correct words:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {currentQuestion.options.map((word) => {
          const isSelected = selectedWordIds.includes(word.id);
          
          return (
            <button
              key={word.id}
              className={cn(
                "word-option p-2 border rounded-md hover:bg-gray-100",
                isSelected ? "opacity-50 bg-gray-100" : "bg-white"
              )}
              onClick={() => {
                if (!isSelected) {
                  // Find the first empty blank
                  const emptyBlankIndex = currentQuestion.blanks.find(blankIndex => 
                    !currentUserAnswers.some(answer => 
                      answer.blankIndex === blankIndex && answer.wordId !== null
                    )
                  );
                  
                  if (emptyBlankIndex !== undefined) {
                    handleSelectWord(word.id, emptyBlankIndex);
                  }
                }
              }}
              disabled={isSelected}
            >
              {word.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WordOptions;
