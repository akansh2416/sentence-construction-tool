
import { useQuiz } from "../context/QuizContext";
import QuizResultItem from "./QuizResultItem";
import { Button } from "@/components/ui/button";
import { Award, RotateCw } from "lucide-react";

const ResultScreen: React.FC = () => {
  const { results, resetQuiz, score, questions } = useQuiz();
  
  // Calculate percentage score
  const percentage = Math.round((score / questions.length) * 100);
  
  // Determine message based on score
  const getMessage = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex flex-col items-center mb-8">
        <Award size={64} className="text-primary mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">{getMessage()}</h1>
        <div className="text-xl mb-4">
          Your score: <span className="font-bold text-primary">{score}</span> out of {questions.length}
        </div>
        <div className="h-4 w-full max-w-sm bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">{percentage}%</div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        {results.map((result, index) => (
          <QuizResultItem key={result.questionId} result={result} index={index} />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button onClick={resetQuiz} className="flex items-center gap-2">
          <RotateCw size={18} />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
