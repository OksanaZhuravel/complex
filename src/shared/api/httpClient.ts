import axios from 'axios';
// Создаем экземпляр axios с базовой конфигурацией
// необходимо создать NEXT_PUBLIC_API в файле .env NEXT_PUBLIC_API = http://o-complex.com:1337/

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: { 'Content-Type': 'application/json' },
});
