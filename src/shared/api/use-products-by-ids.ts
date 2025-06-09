import { httpClient } from '@/shared/api/httpClient';
import { Product } from '@/shared/model/product';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../constants';

export const useProductsByIds = (ids: number[]) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCT, ids],
    queryFn: async (): Promise<Product[]> => {
      if (ids.length === 0) return [];
      const response = await httpClient.get(`products?id=${ids.join(',')}`);
      return response.data.items;
    },
    enabled: ids.length > 0,
  });
