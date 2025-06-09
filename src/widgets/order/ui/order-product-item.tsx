import { MOBILE_WIDTH } from '@/shared/constants';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import type { CartItem } from '@/shared/model/cart';
import type { Product } from '@/shared/model/product';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { useState } from 'react';

type OrderProductItemProps = {
  item: CartItem;
  product: Product;
};
export const OrderProductItem = ({ item, product }: OrderProductItemProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(MOBILE_WIDTH);
  const handleMobileTooltip = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };
  return (
    <li className="flex items-center justify-between text-2xl" key={item.id}>
      {isMobile ? (
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <span
              className="max-w-[133px] cursor-pointer truncate"
              onClick={handleMobileTooltip}
            >
              {product.title}
            </span>
          </TooltipTrigger>
          <TooltipContent>{product.title}</TooltipContent>
        </Tooltip>
      ) : (
        <span>{product.title}</span>
      )}
      <span className="whitespace-nowrap">
        {item.quantity} × {product.price} ₽
      </span>
    </li>
  );
};
