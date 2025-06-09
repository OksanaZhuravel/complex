import { ScrollToTopButton } from '@/shared/ui/custom/scroll-to-top-button';
import { OrderSummary } from '@/widgets/order/ui/order-summary';
import { ProductList } from '@/widgets/product-list/ui/product-list';
import { ProductModal } from '@/widgets/product-list/ui/product-modal';
import { ReviewList } from '@/widgets/reviews/ui/review-list';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <ReviewList />
      {/* Оформление заказа */}
      <OrderSummary />
      {/* Список товаров */}
      <ProductList />
      <Suspense>
        <ProductModal />
      </Suspense>
      <ScrollToTopButton />
    </>
  );
}
