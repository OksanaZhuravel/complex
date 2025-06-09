import { httpClient } from '@/app/api/httpClient';
import { OrderPayload } from '@/shared/model/cart';
import { useMutation } from '@tanstack/react-query';

export const useSubmitOrder = () =>
  useMutation({
    mutationFn: async (data: OrderPayload) => {
      const response = await httpClient.post('/order', data);
      if (!response.data.success) {
        throw new Error('Ошибка оформления заказа');
      }
      return response.data;
    },
  });
