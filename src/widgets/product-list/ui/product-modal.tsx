'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useProductsByIds } from '@/app/api/use-products-by-ids';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { BuyButton } from '@/widgets/product-list/ui/buy-button';

export const ProductModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const id = searchParams.get('product');
    setProductId(id ? Number(id) : null);
  }, [searchParams]);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProductsByIds(productId ? [productId] : []);

  const product = products.find((p) => p.id === productId);

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('product');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={!!productId} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="rounded-2xl bg-foreground text-background"
        showCloseButton
      >
        {isLoading ? (
          <>
            <DialogTitle className="sr-only">Загрузка товара</DialogTitle>
            <p className="text-center text-lg">Загрузка...</p>
          </>
        ) : isError || !product ? (
          <>
            <DialogTitle className="sr-only">
              Ошибка загрузки товара
            </DialogTitle>
            <p className="text-center text-lg text-red-500">
              Не удалось загрузить товар.
            </p>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="pt-5 text-xl md:text-4xl">
                {product.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex flex-col gap-4">
              <img
                src={product.image_url}
                alt={product.title}
                width={281}
                height={366}
                className="w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <p className="w-full pb-4 text-center text-xl md:text-4xl">
                цена: {product.price} ₽
              </p>
            </div>
            <DialogFooter>
              <BuyButton productId={product.id} />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
