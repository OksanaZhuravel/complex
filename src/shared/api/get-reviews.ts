import { Review } from '@/shared/model/review';

export async function getReviews(): Promise<Review[]> {
  const res = await fetch(`http://o-complex.com:1337/reviews`, {
    next: { revalidate: 60 }, // ISR: обновлять раз в 60 секунд
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить отзывы');
  }

  return res.json();
}
