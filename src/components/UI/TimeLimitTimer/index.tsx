'use client';

import { useEffect } from "react";

interface IProps {
  timeLimitMin: number;
  setIsExpired: (value: boolean) => void;
  isExpired: boolean;
  setTimeLeft: (value: number) => void;
  timeLeft: number;
}

const TimeLimitTimer: React.FC<IProps> = (props) => {
  const { setTimeLeft, timeLeft, timeLimitMin, setIsExpired, isExpired } = props;

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const intervalId = setInterval(() => {
      const newTime = timeLeft - 1;
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, setIsExpired, setTimeLeft]);

  // Format the time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      <p className={`
        text-lg font-medium
        ${timeLeft < 60 ? "text-red-500" : "text-gray-400"}
      `}>
        {`ارسال دوباره در ${formatTime(timeLeft)} ثانیه`}
      </p>
    </div>
  );
};

export default TimeLimitTimer;