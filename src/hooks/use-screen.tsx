import {useEffect, useState} from "react";

export const useScreen = (delay = 300) => {

  const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
      }, delay);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);


  return {windowSize};
};
