
import { Loader2 } from "lucide-react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h2 className="text-xl font-medium text-gray-700">Loading questions...</h2>
    </div>
  );
};

export default LoadingScreen;
