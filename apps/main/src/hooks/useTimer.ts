import { useState, useEffect, useCallback } from 'react';

const FIVE_MINUTES_IN_SECONDS = 5 * 60; // 5분 = 300초

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  hasTimerEnded: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  formatTime: (totalSeconds: number) => string;
}

function useTimer(
  initialSeconds: number = FIVE_MINUTES_IN_SECONDS,
): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasTimerEnded, setHasTimerEnded] = useState<boolean>(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setHasTimerEnded(false);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setHasTimerEnded(true);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
      setHasTimerEnded(false);
    }
  }, [isRunning, timeLeft]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    setHasTimerEnded(false);
  }, [initialSeconds]);

  const formatTime = useCallback((totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeLeft,
    isRunning,
    hasTimerEnded,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime,
  };
}

export default useTimer;
