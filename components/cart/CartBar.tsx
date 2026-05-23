"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartBar() {

  const items = useCartStore(
    (state) => state.items
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#6F4E37] text-white px-6 py-4 rounded-2xl shadow-xl w-[90%] max-w-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="font-semibold">
            {items.length} ürün
          </p>

          <p className="text-sm opacity-80">
            ₺{totalPrice}
          </p>

        </div>

        <button className="bg-white text-[#6F4E37] px-5 py-2 rounded-xl font-bold">

          Sepete Git

        </button>

      </div>

    </div>
  );
}