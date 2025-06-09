/**
 * Константы для конфигурации приложения
 */
/**
 * Параметры  для продуктов
 */
export const DEFAULT_PRODUCTS_PAGE = 1;
export const DEFAULT_PRODUCTS_PAGE_SIZE = 6;

/**
 * Размер мобильных устройств
 */
export const MOBILE_WIDTH = 768;

/**
 * Размер мобильных устройств маленьких
 */
export const MOBILE_SMALL_WIDTH = 640;
/**
/**
 * Размер планшетных устройств 
 */
export const TABLET_WIDTH = 1023.5;

export const enum Paths {
  BASE = '/',
}

export const enum LocalStorage {
  CART_STORAGE_KEY = 'cart',
}

/**
 * Query-ключи для работы react-query
 */
export const enum QueryKeys {
  PRODUCTS = 'products',
  PRODUCT = 'product',
}
