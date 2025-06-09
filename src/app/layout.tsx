import Head from '@/app/head';
import '@/app/styles/globals.css';
import { Header } from '@/widgets/header/ui/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryClientContextProvider } from './providers/query-client-provider';
import { ThemeProvider } from './providers/theme-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shop — интернет-магазин товаров',
  description:
    'Лучшие товары для дома, электроника, одежда и многое другое. Быстрая доставка, выгодные цены и широкий ассортимент в нашем интернет-магазине.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head />
      <body className={`${inter.variable} antialiased`}>
        <QueryClientContextProvider>
          <ThemeProvider
            attribute={'class'}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="m-auto flex min-h-screen flex-col">
              <Header />
              <main className="flex flex-col items-center justify-center gap-11.25 px-3.5">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
