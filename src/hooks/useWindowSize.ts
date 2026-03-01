import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Hook para detectar el tamaño de la ventana
 * @returns {WindowSize} { width, height, isMobile, isTablet, isDesktop }
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
};

export default useWindowSize;
