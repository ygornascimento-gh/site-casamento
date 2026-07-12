import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: Date): CountdownValues {
  const calculate = (): CountdownValues => {
    const totalSeconds = Math.max(0, differenceInSeconds(targetDate, new Date()));
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [countdown, setCountdown] = useState<CountdownValues>(calculate);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calculate()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
