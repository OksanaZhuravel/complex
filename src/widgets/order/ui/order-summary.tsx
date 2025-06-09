'use client';

import { useProductsByIds } from '@/shared/api/use-products-by-ids';
import { useSubmitOrder } from '@/shared/api/use-submit-order';
import { useCartStore } from '@/shared/store/cart-store';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useState } from 'react';
import { OrderProductItem } from './order-product-item';
import { PhoneInput } from './phone-input';

export const OrderSummary = () => {
  const { cart, phone, setPhone, clearCart } = useCartStore();
  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // Подгружаем инфо о продуктах из корзины
  const productIds = cart.map((item) => item.id);
  const { data: products = [], isLoading } = useProductsByIds(productIds);

  // Хук отправки заказа
  const submitOrder = useSubmitOrder();

  const handleOrder = () => {
    const cleanedPhone = phone.replace(/\D/g, '');

    if (cleanedPhone.length !== 11) {
      setError(true);
      return;
    }

    setError(false);

    submitOrder.mutate(
      { phone: cleanedPhone, cart }, // посылаем всю корзину!
      {
        onSuccess: () => {
          setSuccessOpen(true);
          clearCart();
        },
        onError: (e) => {
          console.error('Ошибка отправки заказа:', e);
        },
      }
    );
  };
  const isPhoneValid = phone.length === 11;

  return (
    <section className="w-full max-w-[708px] rounded-2xl border bg-card px-3 py-2.5 text-card-foreground shadow">
      <h2 className="text-center text-4xl md:text-left">Добавленные товары</h2>
      <ul className="py-5">
        {cart.length === 0 ? (
          <li className="text-xl text-muted-foreground">Корзина пуста</li>
        ) : (
          cart.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) return null;
            return (
              <OrderProductItem key={item.id} item={item} product={product} />
            );
          })
        )}
      </ul>
      <div className="flex flex-col items-center justify-between gap-2.25 md:flex-row md:gap-4.25">
        <PhoneInput value={phone} onChange={setPhone} error={error} />

        <Button
          size={'lg'}
          className="max-w-100 pb-3 md:max-w-[268px]"
          onClick={handleOrder}
          disabled={isPhoneValid && cart.length === 0} //  Disable только если номер ок, но корзина пуста
        >
          Заказать
        </Button>
      </div>
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogTitle className="text-2xl md:text-4xl">Успешно!</DialogTitle>
          <DialogDescription className="text-xl text-muted-foreground md:text-2xl">
            Ваш заказ успешно оформлен.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
};
