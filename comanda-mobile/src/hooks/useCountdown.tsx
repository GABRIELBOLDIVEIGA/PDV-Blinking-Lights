import { useEffect, useState } from "react";

/**
 * CountDown
 * @param {Number} initialTime
 * @param {Function} callback
 * @param {Number} interval
 * @return {Number} sum
 */
export const useCountDown = (
  initialTime: number,
  callBack: () => void,
  interval = 1000,
) => {
  const [time, setTime] = useState(0);

  const addTime = (number: number) => {
    setTime((prev) => prev + number);
  };

  const endTimer = () => {
    setTime(initialTime);
  };

  useEffect(() => {
    const customInterval = setInterval(() => {
      if (time > 0) setTime((prev) => prev - interval);
    }, interval);

    if (time === 0) callBack();

    return () => clearInterval(customInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return { time, setTime, endTimer, addTime };
};
