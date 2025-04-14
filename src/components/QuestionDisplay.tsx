
import { useQuiz } from '../context/QuizContext';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const QuestionDisplay: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    userAnswers, 
    handleUnselectWord 
  } = useQuiz();
  
  const [displayedSentence, setDisplayedSentence] = useState<React.ReactNode[]>([]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const currentUserAnswers = useMemo(() => userAnswers[currentQuestionIndex] || [], [userAnswers, currentQuestionIndex]);

  useEffect(() => {
    if (!currentQuestion) return;
    
    const sentence = currentQuestion.sentence;
    const sentenceParts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Loop through each blank and split the sentence
    currentQuestion.blanks.forEach((_, blankIndex) => {
      const blankMarker = `[blank${blankIndex + 1}]`;
      const startIndex = sentence.indexOf(blankMarker, lastIndex);
      
      if (startIndex === -1) return;
      
      // Add text before the blank
      if (startIndex > lastIndex) {
        sentenceParts.push(
          <span key={`text-${lastIndex}`}>{sentence.substring(lastIndex, startIndex)}</span>
        );
      }
      
      // Find the word for this blank if user has selected one
      const userAnswer = currentUserAnswers.find(a => a.blankIndex === currentQuestion.blanks[blankIndex]);
      const selectedWordId = userAnswer?.wordId;
      let wordText = '';
      
      if (selectedWordId) {
        const selectedOption = currentQuestion.options.find(opt => opt.id === selectedWordId);
        if (selectedOption) {
          wordText = selectedOption.text;
        }
      }
      
      // Add the blank space (empty or filled)
      sentenceParts.push(
        <span 
          key={`blank-${blankIndex}`}
          className={cn(
            "blank-space p-1 mx-1 border-b-2 border-dashed",
            selectedWordId ? "border-green-500 bg-green-50" : "border-gray-400"
          )}
          onClick={() => selectedWordId && handleUnselectWord(currentQuestion.blanks[blankIndex])}
        >
          {wordText || '______'}
        </span>
      );
      
      // Update lastIndex to after the blank marker
      lastIndex = startIndex + blankMarker.length;
    });
    
    // Add any remaining text after the last blank
    if (lastIndex < sentence.length) {
      sentenceParts.push(
        <span key={`text-end`}>{sentence.substring(lastIndex)}</span>
      );
    }
    
    setDisplayedSentence(sentenceParts);
  }, [currentQuestion, currentUserAnswers, handleUnselectWord]);

  if (!currentQuestion) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 min-h-[120px]">
      <p className="text-xl leading-relaxed font-medium text-gray-800">
        {displayedSentence}
      </p>
    </div>
  );
};

export default QuestionDisplay;
