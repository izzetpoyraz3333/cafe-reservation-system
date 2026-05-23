"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { products, categories } from "@/lib/menu-data";
import { useCartStore } from "@/lib/store";
import toast from "react-hot-toast";

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  
  // Klasör yapısına göre gelen parametreyi kontrol ediyoruz
  const routeParam = params?.tableId as string;
  
  const isTakeaway = routeParam === "takeaway";
  // Eğer parametre "masa" değilse ve boş değilse, bu spesifik bir masadır (Örn: Masa 5)
  const isSpecificTable = routeParam !== "takeaway" && routeParam !== "masa" && routeParam !== undefined;

  const [activeCat, setActiveCat] = useState("hot");
  const { items, addItem, updateQuantity, totalItems, totalPrice, setTableId, setOrderType } = useCartStore();

  useEffect(() => {
    if (isTakeaway) {
      setOrderType("takeaway");
    } else {
      setOrderType("dine-in");
      // Eğer spesifik bir masa (Örn: /menu/5) ise kaydet.
      // Değilse (Genel Masa Siparişi ise) boş bırak, böylece sepet sayfasında kullanıcıya sorulur.
      if (isSpecificTable) {
        setTableId(routeParam);
      } else {
        setTableId(""); 
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParam, isTakeaway, isSpecificTable]);

  const filteredProducts = products.filter((p) => p.categoryId === activeCat);

  const getQty = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  const handleAdd = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
    });
    toast.success(`${product.name} sepete eklendi`);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: "#fdf6ec", minHeight: "100vh", paddingBottom: "100px" }}>

      {/* Üst Bar */}
      <div
        style={{
          backgroundColor: "#6b3f2a",
          padding: "16px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="flex justify-between items-center max-w-lg mx-auto relative">
          
          {/* Sol Kısım: "Ana Menü" Butonu */}
          <div className="pl-1 sm:pl-2"> 
            <button 
              onClick={handleGoHome} 
              className="px-3 py-2 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              style={{ 
                backgroundColor: "#fdf6ec", 
                color: "#6b3f2a",           
                border: "1px solid #e8c9a0",
              }}
            >
              Ana Menü
            </button>
          </div>
            
          {/* Orta Kısım: Başlık */}
          <div className="flex flex-col ml-3 flex-1">
            <p className="text-white font-bold text-base leading-tight">☕ Cab Cafe.</p>
            <p style={{ color: "#e8c9a0", fontSize: "12px" }}>
              {isTakeaway 
                ? "Gel-Al Siparişi" 
                : isSpecificTable 
                  ? `Masa Siparişi ` 
                  : "Masa Siparişi"}
            </p>
          </div>

          {/* Sağ Kısım: Üst Sepet Özeti Butonu */}
          {totalItems() > 0 && (
            <div className="pr-1 sm:pr-2">
              <button
                onClick={() => router.push("/cart")}
                className="flex items-center gap-2 text-white font-semibold py-2 px-3 rounded-xl shadow-sm active:scale-95 whitespace-nowrap"
                style={{ backgroundColor: "#4a2c1a", fontSize: "14px" }}
              >
                🛒 {totalItems()}
                <span style={{ color: "#e8c9a0" }}>₺{totalPrice()}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Kategoriler */}
      <div
        className="flex gap-2 overflow-x-auto px-4 py-3 hide-scrollbar"
        style={{ backgroundColor: "white", borderBottom: "1px solid #f5e6d3" }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className="flex-shrink-0 py-2 px-4 rounded-full font-semibold text-sm transition-all"
            style={{
              backgroundColor: activeCat === cat.id ? "#6b3f2a" : "#fdf6ec",
              color: activeCat === cat.id ? "white" : "#8b5e3c",
              border: activeCat === cat.id ? "none" : "1px solid #e8c9a0",
            }}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Ürünler */}
      <div className="max-w-lg mx-auto p-4">
        <p className="font-bold mb-3" style={{ color: "#4a2c1a", fontSize: "18px" }}>
          {categories.find((c) => c.id === activeCat)?.emoji}{" "}
          {categories.find((c) => c.id === activeCat)?.name}
        </p>

        <div className="flex flex-col gap-3">
          {filteredProducts.map((product) => {
            const qty = getQty(product.id);
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #f5e6d3",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#fdf6ec",
                    fontSize: "32px",
                  }}
                >
                  {product.emoji}
                </div>

                <div className="flex-1">
                  <p className="font-bold" style={{ color: "#2d1a0e" }}>{product.name}</p>
                  <p className="text-sm" style={{ color: "#b07850" }}>{product.description}</p>
                  <p className="font-bold mt-1" style={{ color: "#6b3f2a" }}>₺{product.price}</p>
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center justify-center rounded-full font-bold text-white flex-shrink-0"
                    style={{ width: "36px", height: "36px", backgroundColor: "#6b3f2a", fontSize: "22px" }}
                  >
                    +
                  </button>
                ) : (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, qty - 1)}
                      className="flex items-center justify-center rounded-full font-bold"
                      style={{ width: "32px", height: "32px", backgroundColor: "#fdf6ec", border: "1px solid #e8c9a0", color: "#6b3f2a", fontSize: "20px" }}
                    >
                      −
                    </button>
                    <span className="font-bold w-5 text-center" style={{ color: "#2d1a0e" }}>{qty}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="flex items-center justify-center rounded-full font-bold text-white"
                      style={{ width: "32px", height: "32px", backgroundColor: "#6b3f2a", fontSize: "20px" }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alt Sepet Butonu */}
      {totalItems() > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 p-4 z-40"
          style={{ backgroundColor: "white", borderTop: "1px solid #f5e6d3" }}
        >
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => router.push("/cart")}
              className="w-full py-4 rounded-xl font-bold text-white flex justify-between items-center px-6 shadow-lg"
              style={{ backgroundColor: "#6b3f2a" }}
            >
              <span>🛒 Sepeti Görüntüle ({totalItems()})</span>
              <span>₺{totalPrice()}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}