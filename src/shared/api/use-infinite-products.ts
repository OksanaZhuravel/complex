import { useInfiniteQuery } from '@tanstack/react-query';

import { getProducts } from '@/shared/api/products';
import {
  DEFAULT_PRODUCTS_PAGE,
  DEFAULT_PRODUCTS_PAGE_SIZE,
  QueryKeys,
} from '@/shared/constants';
import { ProductApiResponse } from '@/shared/model/product';

export const useInfiniteProductsQuery = () =>
  useInfiniteQuery<ProductApiResponse>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: async ({ pageParam = DEFAULT_PRODUCTS_PAGE }) =>
      await getProducts(pageParam as number, DEFAULT_PRODUCTS_PAGE_SIZE),
    initialPageParam: DEFAULT_PRODUCTS_PAGE,
    getNextPageParam: (lastPage) => {
      const { page, amount, total } = lastPage;
      return page * amount < total ? page + 1 : undefined;
    },
  });
