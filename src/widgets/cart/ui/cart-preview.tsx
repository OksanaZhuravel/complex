'use client';
import { useCartStore } from '@/shared/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export const CartPreview = () => {
  const cart = useCartStore((state) => state.cart);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    setTotalQty(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  if (cart.length === 0) return null;

  return (
    <div className="flex flex-1 items-center justify-end gap-4 rounded bg-accent px-2 py-1 pr-10 text-sm font-medium">
      <ShoppingCart className="size-9" />
      <span className="text-2xl">{totalQty} шт.</span>
    </div>
  );
};
