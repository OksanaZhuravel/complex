import { httpClient } from '@/app/api/httpClient';
import {
  DEFAULT_PRODUCTS_PAGE,
  DEFAULT_PRODUCTS_PAGE_SIZE,
} from '@/shared/constants';
import { ProductApiResponse } from '@/shared/model/product';
import axios from 'axios';

/**
 * Получение продуктов с сервера
 */
export async function getProducts(
  page: number = DEFAULT_PRODUCTS_PAGE,
  page_size: number = DEFAULT_PRODUCTS_PAGE_SIZE
): Promise<ProductApiResponse> {
  try {
    const response = await httpClient.get(
      `products?page=${page}&page_size=${page_size}`
    );

    if (response.status === 200) {
      return response.data as ProductApiResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка Axios:', error.message);
      if (error.response) {
        console.error('Ответ сервера:', error.response.data);
      }
    } else {
      console.error('Неизвестная ошибка:', error);
    }
    throw error;
  }

  return { page, amount: 0, total: 0, items: [] };
}
