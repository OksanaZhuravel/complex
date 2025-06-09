import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Применяется ко всем маршрутам убираем noindex который добавляется по умолчанию в versel
      source: '/(.*)',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'index, follow',
        },
      ],
    },
  ],
};

export default nextConfig;
