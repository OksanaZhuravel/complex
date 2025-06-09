import { OrderSummary } from '@/widgets/order/ui/order-summary';
import { ProductList } from '@/widgets/product-list/ui/product-list';
import { ProductModal } from '@/widgets/product-list/ui/product-modal';

export default function Home() {
  return (
    <>
      {/* Оформление заказа */}
      <OrderSummary />
      {/* Список товаров */}
      <ProductList />
      <ProductModal />
    </>
  );
}
