import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ),
    height: Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ),
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        ),
        height: Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        ),
      });
    };

    window.addEventListener('resize', handleResize);

    // clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
