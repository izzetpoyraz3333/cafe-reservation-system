
"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import CartBar from "../../components/cart/CartBar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCartStore } from "@/store/cartStore";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{ backgroundColor: "#fdf6ec" }}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="text-6xl mb-4">☕</div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#4a2c1a" }}>
        Cab Cafe.
      </h1>
      <p className="mb-10" style={{ color: "#b07850" }}>
        Dijital Kafe Sistemi
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/menu/5"
          className="block text-center py-3 px-6 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundColor: "#6b3f2a" }}
        >
          🪑 Masa Siparişi
        </Link>
        <Link
          href="/menu/takeaway"
          className="block text-center py-3 px-6 rounded-xl font-semibold transition-all border"
          style={{ backgroundColor: "#fdf6ec", color: "#6b3f2a", borderColor: "#e8c9a0" }}
        >
          📦 Gel-Al Siparişi
        </Link>
        <Link
          href="/reserve"
          className="block text-center py-3 px-6 rounded-xl font-semibold transition-all border"
          style={{ backgroundColor: "#fdf6ec", color: "#6b3f2a", borderColor: "#e8c9a0" }}
        >
          📅 Masa Rezervasyonu
        </Link>
        <Link
          href="/admin"
          className="block text-center py-3 px-6 rounded-xl font-semibold transition-all border"
          style={{ backgroundColor: "#fdf6ec", color: "#6b3f2a", borderColor: "#e8c9a0" }}
        >
          🔧 Admin Paneli
        </Link>
      </div>
    </main>
  );
}