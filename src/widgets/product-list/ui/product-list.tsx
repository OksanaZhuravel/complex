'use client';

import { useInfiniteProductsQuery } from '@/shared/api/use-infinite-products';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductCard } from './product-card';

export const ProductList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProductsQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <p className="p-4 text-4xl text-muted-foreground">Загрузка товаров...</p>
    );
  }

  return (
    <section className="grid w-full max-w-[983px] grid-cols-1 items-stretch justify-items-center gap-4.5 md:grid-cols-2 md:gap-x-0 md:gap-y-10.5 md:p-0 lg:grid-cols-3">
      {data?.pages.map((page) =>
        page.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}

      {isFetchingNextPage && (
        <p className="col-span-full text-center text-muted-foreground">
          Загрузка товаров...
        </p>
      )}

      <div ref={ref} className="h-1 w-full" />
    </section>
  );
};
