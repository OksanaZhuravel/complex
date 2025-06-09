export type CartItem = {
  id: number;
  quantity: number;
};
export type OrderPayload = {
  phone: string;
  cart: CartItem[];
};
