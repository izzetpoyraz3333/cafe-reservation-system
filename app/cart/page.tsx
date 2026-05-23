"use client";

import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CartPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, orderType, updateQuantity, setTableId } = useCartStore();
  
  const [isOrdering, setIsOrdering] = useState(false);
  const [inputTableNo, setInputTableNo] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center" style={{ backgroundColor: "#fdf6ec" }}>
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#4a2c1a" }}>Sepetiniz Boş</h2>
        <p className="mb-6" style={{ color: "#8b5e3c" }}>Görünüşe göre henüz bir ürün seçmediniz.</p>
        <button onClick={() => router.back()} className="py-3 px-8 rounded-xl font-bold text-white" style={{ backgroundColor: "#6b3f2a" }}>
          Menüye Dön
        </button>
      </div>
    );
  }

  const handleOrder = async () => {
    if (orderType === "dine-in" && inputTableNo.trim() === "") {
      toast.error("Lütfen masa numaranızı giriniz!");
      return;
    }

    setIsOrdering(true);
    if (orderType === "dine-in") setTableId(inputTableNo);

    try {
      await addDoc(collection(db, "orders"), {
        items: items,
        totalPrice: totalPrice(),
        orderType: orderType,
        tableId: orderType === "dine-in" ? inputTableNo : "Gel-Al",
        status: "bekliyor", 
        createdAt: serverTimestamp(),
      });

      toast.success("Siparişiniz başarıyla alındı!");
      router.push("/success");
    } catch (error) {
      toast.error("Sipariş alınırken bir hata oluştu.");
      console.error(error);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fdf6ec", minHeight: "100vh", paddingBottom: "100px" }}>
      
      {/* Üst Bar */}
      <div style={{ backgroundColor: "#6b3f2a", padding: "16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <button onClick={() => router.back()} className="text-white text-xl">←</button>
          <div>
            <p className="text-white font-bold text-lg">Sipariş Özeti</p>
            <p style={{ color: "#e8c9a0", fontSize: "13px" }}>
              {orderType === "dine-in" ? "Masa Siparişi" : "Gel-Al Siparişi"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 mt-4">
        
        {/* Ürün Listesi */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm" style={{ border: "1px solid #f5e6d3" }}>
          <h3 className="font-bold mb-4" style={{ color: "#4a2c1a", borderBottom: "1px solid #f5e6d3", paddingBottom: "8px" }}>
            Seçilen Ürünler
          </h3>
          
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-bold" style={{ color: "#2d1a0e" }}>{item.name}</p>
                    <p className="text-sm font-semibold" style={{ color: "#b07850" }}>₺{item.price}</p>
                  </div>
                </div>
                
                {/* Miktar Kontrolü */}
                <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex items-center justify-center rounded-full font-bold" style={{ width: "28px", height: "28px", backgroundColor: "#fdf6ec", color: "#6b3f2a", fontSize: "18px" }}>−</button>
                    <span className="font-bold w-4 text-center" style={{ color: "#2d1a0e" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex items-center justify-center rounded-full font-bold text-white" style={{ width: "28px", height: "28px", backgroundColor: "#6b3f2a", fontSize: "18px" }}>+</button>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sipariş Onay Kutusu */}
        <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: "1px solid #f5e6d3" }}>
          
          {/* MASA NUMARASI SORMA KISMI */}
          {orderType === "dine-in" && (
            <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: "#fdf6ec", border: "1px solid #e8c9a0" }}>
              <label className="block text-sm font-bold mb-2" style={{ color: "#4a2c1a" }}>Masa Numaranız</label>
              <input 
                type="text" 
                value={inputTableNo}
                onChange={(e) => setInputTableNo(e.target.value)}
                placeholder="Örn: 5, 12, Teras-3"
                className="w-full p-3 rounded-xl border outline-none font-semibold text-lg"
                style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "white" }}
              />
            </div>
          )}

          <div className="flex justify-between items-center mb-6 text-lg">
            <span style={{ color: "#4a2c1a", fontWeight: "600" }}>Toplam Tutar:</span>
            <span className="font-bold text-3xl" style={{ color: "#2d1a0e" }}>₺{totalPrice()}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={isOrdering}
            className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-md active:scale-95"
            style={{ 
              backgroundColor: isOrdering ? "#b07850" : "#6b3f2a",
              opacity: isOrdering ? 0.8 : 1
            }}
          >
            {isOrdering ? "Sipariş İletiliyor..." : "Siparişi Onayla"}
          </button>
        </div>

      </div>
    </div>
  );
}