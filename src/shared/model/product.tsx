export type Product = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
};

export type ProductApiResponse = {
  page: number;
  amount: number;
  total: number;
  items: Product[];
};
