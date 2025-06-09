import { LocalStorage } from '@/shared/constants/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  phone: string;

  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getQuantity: (id: number) => number;

  setPhone: (phone: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      phone: '',

      addItem: (id) => {
        const { cart } = get();
        const existing = cart.find((item) => item.id === id);
        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cart: [...cart, { id, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      getQuantity: (id) => {
        const item = get().cart.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      setPhone: (phone) => set({ phone }),
      clearCart: () => set({ cart: [], phone: '' }),
    }),
    {
      name: LocalStorage.CART_STORAGE_KEY, // localStorage key
    }
  )
);
