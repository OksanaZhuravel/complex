import { QueryKeys } from '@/shared/constants';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from './httpClient';

export type Review = {
  id: number;
  text: string; // HTML inside string
};

export const useReviews = () =>
  useQuery<Review[]>({
    queryKey: [QueryKeys.REVIEWS],
    queryFn: async () => {
      const res = await httpClient.get('/reviews');
      return res.data;
    },
  });
