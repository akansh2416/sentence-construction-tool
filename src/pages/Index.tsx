
import { QuizProvider } from "../context/QuizContext";
import QuizContainer from "../components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">Sentence Construction</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <QuizProvider>
          <QuizContainer />
        </QuizProvider>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <div className="max-w-3xl mx-auto px-4">
          Sentence Construction Challenge &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
