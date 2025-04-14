
import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    setProgress((timeLeft / totalTime) * 100);
  }, [timeLeft, totalTime]);

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>Time Left</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="timer-bar">
        <div 
          className="timer-progress" 
          style={{ width: `${progress}%` }}
          data-critical={progress < 30}
        />
      </div>
    </div>
  );
};

export default Timer;
