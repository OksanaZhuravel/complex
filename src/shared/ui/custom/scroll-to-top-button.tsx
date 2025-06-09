'use client';

import { Button } from '@/shared/ui/button';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      size={'icon'}
      variant={'modal'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-6 bottom-6 z-50 rounded-full p-2 shadow-lg transition"
    >
      <ChevronUp className="size-7" />
    </Button>
  );
};
