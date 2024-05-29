import { useEffect, useState } from "react";

export const useCountUp = (finalV?: number) => {
  const [finalValue, setFinalValue] = useState(finalV ?? 0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(0);
  }, [finalValue]);

  useEffect(() => {
    const customInterval = setInterval(() => {
      if (currentValue < finalValue) {
        setCurrentValue(
          (prev) => prev + finalValue / (finalValue <= 100 ? 100 : 87.93)
        );
      } else {
        setCurrentValue(finalValue);
      }
    }, 1);

    return () => clearInterval(customInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalValue, currentValue]);

  return { setFinalValue, currentValue };
};
