
import { QuizResult } from "../types";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface QuizResultItemProps {
  result: QuizResult;
  index: number;
}

const QuizResultItem: React.FC<QuizResultItemProps> = ({ result, index }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Question {index + 1}</h3>
          {result.isCorrect ? (
            <div className="flex items-center text-green-600">
              <Check size={18} className="mr-1" />
              <span>Correct</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <X size={18} className="mr-1" />
              <span>Incorrect</span>
            </div>
          )}
        </div>
        
        {!result.isCorrect && (
          <>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Your answer:</p>
              <p className="text-gray-900">{result.userSentence}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Correct answer:</p>
              <p className="text-green-700 font-medium">{result.correctSentence}</p>
            </div>
          </>
        )}
        
        {result.isCorrect && (
          <div>
            <p className="text-gray-900">{result.userSentence}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizResultItem;
