"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  
  // Sipariş numarasını state ilk oluşturulurken (sadece 1 kez) atıyoruz
  const [orderNumber] = useState(() => {
    const randomNum = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `#${randomNum}`;
  });

  useEffect(() => {
    // Sepeti temizleme işlemi hala dış sistemle (Zustand/LocalStorage) 
    // alakalı olduğu için useEffect içinde kalması doğru olanıdır.
    clearCart();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Bağımlılık dizisini boş bıraktık ki sadece ilk açılışta çalışsın

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center" 
      style={{ backgroundColor: "#fdf6ec" }}
    >
      <div 
        className="flex items-center justify-center rounded-full mb-6"
        style={{ width: "100px", height: "100px", backgroundColor: "#e8c9a0", fontSize: "50px" }}
      >
        🎉
      </div>

      <h1 className="text-3xl font-bold mb-2" style={{ color: "#4a2c1a" }}>
        Siparişiniz Alındı!
      </h1>
      
      <p className="text-lg mb-8 font-medium" style={{ color: "#8b5e3c" }}>
        Sipariş Numarası: <span className="font-bold text-[#6b3f2a]">{orderNumber}</span>
      </p>

      <div 
        className="w-full max-w-sm rounded-2xl p-6 mb-8 shadow-sm"
        style={{ backgroundColor: "white", border: "1px solid #f5e6d3" }}
      >
        <p className="font-semibold mb-2" style={{ color: "#b07850" }}>
          Tahmini Hazırlanma Süresi
        </p>
        <div className="flex items-end justify-center gap-2">
          <span className="text-6xl font-black" style={{ color: "#6b3f2a" }}>15</span>
          <span className="text-2xl font-bold mb-1" style={{ color: "#8b5e3c" }}>dk</span>
        </div>
        <p className="mt-4 text-sm" style={{ color: "#8b5e3c" }}>
          Kahveniz hazır olduğunda ekranda veya masanızda görebilirsiniz.
        </p>
      </div>

      <Link 
        href="/"
        className="py-4 px-12 rounded-xl font-bold text-white transition-all shadow-md hover:opacity-90"
        style={{ backgroundColor: "#6b3f2a" }}
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}