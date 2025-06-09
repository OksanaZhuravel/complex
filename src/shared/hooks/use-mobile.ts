import { useEffect, useState } from 'react';

export const useIsMobile = (widthMobile: number) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= widthMobile : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= widthMobile);
    };

    window.addEventListener('resize', handleResize);
    // Проверяем при монтировании
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [widthMobile]);

  return isMobile;
};
