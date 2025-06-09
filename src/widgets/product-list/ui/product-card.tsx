'use client';
import { Product } from '@/shared/model/product';
import { BuyButton } from '@/widgets/product-list/ui/buy-button';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('product', product.id.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full cursor-pointer flex-col items-start rounded-2xl bg-card px-2.5 py-2 text-card-foreground shadow transition hover:shadow-lg md:max-w-75.25">
      <img
        src={product.image_url}
        alt={product.title}
        width={281}
        height={366}
        loading="lazy"
        className="h-[366px] w-full max-w-[309px] cursor-pointer rounded-2xl object-cover"
        onClick={openModal}
      />
      <h3 className="mb-1 w-full text-center text-4xl">{product.title}</h3>
      <p className="flex-1 text-2xl">{product.description}</p>
      <p className="w-full pb-8.25 text-center text-4xl">
        цена: {product.price} ₽
      </p>
      <BuyButton productId={product.id} />
    </div>
  );
};
