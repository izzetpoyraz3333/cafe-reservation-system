import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (
    product: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;
}

export const useCartStore =
  create<CartStore>((set) => ({

    items: [],

    addToCart: (product) =>
      set((state) => {

        const existing =
          state.items.find(
            (item) => item.id === product.id
          );

        if (existing) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
            ),
          };
        }

        return {
          items: [
            ...state.items,
            {
              ...product,
              quantity: 1,
            },
          ],
        };
      }),

    removeFromCart: (id) =>
      set((state) => ({
        items: state.items.filter(
          (item) => item.id !== id
        ),
      })),

    clearCart: () =>
      set({
        items: [],
      }),

  }));