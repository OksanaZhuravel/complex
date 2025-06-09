import { getReviews } from '@/shared/api/get-reviews';
import DOMPurify from 'isomorphic-dompurify';

export const ReviewList = async () => {
  let reviews = [];

  try {
    reviews = await getReviews();
  } catch {
    return <p className="text-center text-xl">Не удалось загрузить отзывы.</p>;
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <h2 className="sr-only">Отзывы</h2>
      <ul className="grid w-full max-w-[970px] grid-cols-1 items-stretch justify-items-center gap-4.5 md:grid-cols-2 md:gap-2 md:gap-y-10.5 md:p-0">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="flex w-full max-w-[468px] flex-col items-start rounded-2xl bg-card px-6.75 py-5 text-card-foreground shadow transition hover:shadow-lg"
          >
            <div className="text-2xl">Отзыв {review.id}</div>
            <div className="text-2xl text-muted-foreground">HTML</div>
            <div
              className="pt-11 text-2xl md:pt-10"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review.text),
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
