
import { useQuiz } from "../context/QuizContext";
import QuestionDisplay from "./QuestionDisplay";
import WordOptions from "./WordOptions";
import QuizNavigation from "./QuizNavigation";
import Timer from "./Timer";
import QuizProgress from "./QuizProgress";
import ResultScreen from "./ResultScreen";
import LoadingScreen from "./LoadingScreen";

const QuizContainer: React.FC = () => {
  const { loading, isQuizComplete, timeLeft } = useQuiz();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (isQuizComplete) {
    return <ResultScreen />;
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <QuizProgress />
      <Timer timeLeft={timeLeft} totalTime={30} />
      <QuestionDisplay />
      <WordOptions />
      <QuizNavigation />
    </div>
  );
};

export default QuizContainer;
