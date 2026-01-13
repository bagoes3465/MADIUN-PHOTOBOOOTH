import React, { useEffect, useState } from 'react';

export const Countdown = ({ 
  seconds = 3, 
  onComplete,
  autoStart = false,
  size = 'lg'
}) => {
  const [count, setCount] = useState(seconds);
  const [isActive, setIsActive] = useState(autoStart);

  useEffect(() => {
    let timer = null;

    if (isActive && count > 0) {
      timer = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, count, onComplete]);

  const start = () => {
    setCount(seconds);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    setCount(seconds);
    setIsActive(false);
  };

  const sizes = {
    sm: 'text-6xl',
    md: 'text-8xl',
    lg: 'text-9xl'
  };

  return {
    count,
    isActive,
    start,
    stop,
    reset,
    component: count > 0 && isActive ? (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className={`text-white ${sizes[size]} font-bold animate-pulse`}>
          {count}
        </div>
      </div>
    ) : null
  };
};

export default Countdown;