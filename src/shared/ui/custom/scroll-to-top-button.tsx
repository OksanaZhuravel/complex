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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-6 bottom-6 z-50 size-8 rounded-full bg-foreground p-2 text-background shadow-lg transition duration-500 hover:bg-foreground/40 hover:text-foreground"
    >
      <ChevronUp className="size-7" />
    </Button>
  );
};
