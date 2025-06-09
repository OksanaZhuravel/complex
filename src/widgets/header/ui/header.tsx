'use client';
import { Paths } from '@/shared/constants';
import { ThemeToggle } from '@/shared/ui/custom/theme-toggle';
import { CartPreview } from '@/widgets/cart/ui/cart-preview';
import { Store } from 'lucide-react';

import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-border bg-accent px-5 py-2">
      <div
        className="cursor-pointer p-2 transition-colors duration-500 hover:text-ring"
        onClick={() => {
          router.replace(Paths.BASE);
        }}
      >
        <Store className="size-9" />
      </div>
      <CartPreview />
      <ThemeToggle />
    </header>
  );
};
