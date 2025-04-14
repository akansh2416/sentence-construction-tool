
import { Button } from "@/components/ui/button";
import { useQuiz } from "../context/QuizContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const QuizNavigation: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    userAnswers, 
    handleNextQuestion 
  } = useQuiz();
  
  const [canProceed, setCanProceed] = useState<boolean>(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentUserAnswers = userAnswers[currentQuestionIndex] || [];
  
  // Check if all blanks are filled
  useEffect(() => {
    if (!currentQuestion) return;
    
    const allBlanksFilled = currentQuestion.blanks.every(blankIndex => 
      currentUserAnswers.some(answer => 
        answer.blankIndex === blankIndex && answer.wordId !== null
      )
    );
    
    setCanProceed(allBlanksFilled);
  }, [currentQuestion, currentUserAnswers]);

  const totalQuestions = questions.length;
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
      <div className="text-sm text-gray-600 mb-4 md:mb-0">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <Button
        onClick={handleNextQuestion}
        disabled={!canProceed}
        className={cn(
          "min-w-[120px]",
          !canProceed && "opacity-50 cursor-not-allowed"
        )}
      >
        {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
};

export default QuizNavigation;
