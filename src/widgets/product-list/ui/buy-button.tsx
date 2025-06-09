'use client';
import { useCartStore } from '@/shared/store/cart-store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  productId: number;
};

export const BuyButton = ({ productId }: Props) => {
  const quantity = useCartStore((state) => state.getQuantity(productId));
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [inputValue, setInputValue] = useState(quantity || 1);

  useEffect(() => {
    setInputValue(quantity || 1);
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setInputValue(value);
    updateQuantity(productId, value);
  };

  if (quantity === 0) {
    return (
      <Button
        size={'lg'}
        className="w-full pb-3"
        onClick={() => addItem(productId)}
      >
        Купить
      </Button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between gap-1.75">
      <Button
        size={'icon'}
        className="size-17 rounded-2xl"
        onClick={() => updateQuantity(productId, quantity - 1)}
        aria-label="Уменьшить количество товара"
      >
        <Minus className="size-7" />
      </Button>
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        inputMode="numeric"
        pattern="[0-9]*"
        className="size-17 flex-1 cursor-pointer rounded-2xl border-none bg-background text-center text-foreground placeholder:text-4xl md:text-4xl"
        aria-label="Количество товара"
      />
      <Button
        size={'icon'}
        className="size-17 rounded-2xl"
        onClick={() => updateQuantity(productId, quantity + 1)}
        aria-label="Увеличить количество товара"
      >
        <Plus className="size-7" />
      </Button>
    </div>
  );
};
