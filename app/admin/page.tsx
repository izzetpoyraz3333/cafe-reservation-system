"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Link from "next/link";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface Order {
  id: string;
  tableId: string;
  orderType: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
  createdAt: unknown; // TypeScript hatasını önlemek için 'any' yerine 'unknown' kullanıldı
}

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
  status: string;
  assignedTable: string;
  createdAt: unknown; // TypeScript hatasını önlemek için 'any' yerine 'unknown' kullanıldı
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dine-in" | "takeaway" | "reservations">("dine-in");
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedTables, setSelectedTables] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resData: Reservation[] = [];
      snapshot.forEach((doc) => {
        resData.push({ id: doc.id, ...doc.data() } as Reservation);
      });
      setReservations(resData);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      toast.success(`Sipariş durumu güncellendi: ${newStatus}`);
    } catch (error) {
      toast.error("Durum güncellenirken hata oluştu.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Siparişi silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        toast.success("Sipariş silindi.");
      } catch (error) {
        toast.error("Sipariş silinemedi.");
      }
    }
  };

  const handleApproveReservation = async (resId: string) => {
    const tableNo = selectedTables[resId];
    if (!tableNo || tableNo.trim() === "") {
      toast.error("Lütfen önce bir masa numarası yazın veya seçin!");
      return;
    }

    try {
      await updateDoc(doc(db, "reservations", resId), {
        status: "onaylandi",
        assignedTable: tableNo,
      });
      toast.success("Rezervasyon onaylandı ve masa atandı!");
    } catch (error) {
      toast.error("Rezervasyon onaylanırken bir hata oluştu.");
    }
  };

  const handleRejectReservation = async (resId: string) => {
    try {
      await updateDoc(doc(db, "reservations", resId), { status: "iptal edildi" });
      toast.error("Rezervasyon iptal edildi.");
    } catch (error) {
      toast.error("İşlem başarısız.");
    }
  };

  const filteredOrders = orders.filter((order) => order.orderType === activeTab);

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: "#fdf6ec" }}>
      
      {/* Üst Başlık Alanı */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-6" style={{ borderColor: "#e8c9a0" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="px-3 py-2 bg-white rounded-xl text-sm font-bold shadow-sm" style={{ color: "#6b3f2a", border: "1px solid #e8c9a0" }}>
            ← Müşteri Ekranı
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: "#4a2c1a" }}>☕ Cab Cafe. Yönetim Paneli</h1>
        </div>
        <p className="text-sm font-semibold mt-2 sm:mt-0" style={{ color: "#8b5e3c" }}>Canlı Sipariş & Rezervasyon Takibi</p>
      </div>

      {/* Üst Sekme Butonları */}
      <div className="max-w-5xl mx-auto flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("dine-in")}
          className="px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: activeTab === "dine-in" ? "#6b3f2a" : "white",
            color: activeTab === "dine-in" ? "white" : "#6b3f2a",
            border: "1px solid #e8c9a0",
          }}
        >
          🪑 Masa Siparişleri ({orders.filter(o => o.orderType === "dine-in").length})
        </button>
        
        <button
          onClick={() => setActiveTab("takeaway")}
          className="px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: activeTab === "takeaway" ? "#6b3f2a" : "white",
            color: activeTab === "takeaway" ? "white" : "#6b3f2a",
            border: "1px solid #e8c9a0",
          }}
        >
          📦 Gel-Al Siparişleri ({orders.filter(o => o.orderType === "takeaway").length})
        </button>

        <button
          onClick={() => setActiveTab("reservations")}
          className="px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: activeTab === "reservations" ? "#6b3f2a" : "white",
            color: activeTab === "reservations" ? "white" : "#6b3f2a",
            border: "1px solid #e8c9a0",
          }}
        >
          📅 Masa Rezervasyonları ({reservations.length})
        </button>
      </div>

      {/* İÇERİK ALANI */}
      <div className="max-w-5xl mx-auto">
        
        {/* SİPARİŞLER SEKMESİ (Masa veya Gel-Al) */}
        {activeTab !== "reservations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.length === 0 ? (
              <p className="text-center col-span-2 py-10 font-semibold" style={{ color: "#8b5e3c" }}>Henüz bu kategoride sipariş yok.</p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between" style={{ border: "1px solid #f5e6d3" }}>
                  <div>
                    {/* Sipariş Başlığı */}
                    <div className="flex justify-between items-start border-b pb-2 mb-3">
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase" style={{ backgroundColor: order.status === "bekliyor" ? "#e67e22" : order.status === "hazirlaniyor" ? "#3498db" : "#2ecc71" }}>
                          {order.status}
                        </span>
                        <h3 className="font-bold text-lg mt-1" style={{ color: "#2d1a0e" }}>
                          {order.orderType === "dine-in" ? `Masa: ${order.tableId}` : "📦 Gel-Al Siparişi"}
                        </h3>
                      </div>
                      <p className="font-bold text-xl" style={{ color: "#6b3f2a" }}>₺{order.totalPrice}</p>
                    </div>

                    {/* Ürün Detayları */}
                    <div className="flex flex-col gap-2 my-3">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm font-medium" style={{ color: "#4a2c1a" }}>
                          <span>{item.emoji} {item.name} <b style={{ color: "#8b5e3c" }}>x{item.quantity}</b></span>
                          <span>₺{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Yönetim Butonları */}
                  <div className="flex gap-2 mt-4 pt-3 border-t" style={{ borderColor: "#fdf6ec" }}>
                    {order.status === "bekliyor" && (
                      <button onClick={() => handleUpdateOrderStatus(order.id, "hazirlaniyor")} className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-500 hover:bg-blue-600">
                        👨‍🍳 Hazırla
                      </button>
                    )}
                    {order.status === "hazirlaniyor" && (
                      <button onClick={() => handleUpdateOrderStatus(order.id, "tamamlandi")} className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600">
                        ✅ Teslim Et
                      </button>
                    )}
                    <button onClick={() => handleDeleteOrder(order.id)} className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600">
                      🗑️ Kapat
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* REZERVASYONLAR SEKMESİ */}
        {activeTab === "reservations" && (
          <div className="flex flex-col gap-4">
            {reservations.length === 0 ? (
              <p className="text-center py-10 font-semibold" style={{ color: "#8b5e3c" }}>Henüz hiç rezervasyon talebi yok.</p>
            ) : (
              reservations.map((res) => (
                <div key={res.id} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ border: "1px solid #f5e6d3" }}>
                  
                  {/* Sol Taraf: Müşteri Bilgileri */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase" style={{ backgroundColor: res.status === "bekliyor" ? "#e67e22" : res.status === "onaylandi" ? "#2ecc71" : "#max-w" }}>
                        {res.status === "onaylandi" ? `Onaylandı (Masa ${res.assignedTable})` : res.status}
                      </span>
                      <p className="text-xs text-gray-500">Kişi: 👤 {res.guests}</p>
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: "#2d1a0e" }}>{res.name}</h3>
                    <p className="text-sm font-semibold" style={{ color: "#6b3f2a" }}>📞 {res.phone}</p>
                    <p className="text-sm mt-1 font-medium" style={{ color: "#8b5e3c" }}>🗓️ {res.date} @ ⏰ {res.time}</p>
                    {res.notes && <p className="text-xs mt-2 bg-amber-50 p-2 rounded-lg text-amber-800 border border-amber-200">📝 Not: {res.notes}</p>}
                  </div>

                  {/* Sağ Taraf: Masa Atama ve Onay Sistemi */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                    {res.status === "bekliyor" ? (
                      <>
                        <input
                          type="text"
                          placeholder="Masa No"
                          value={selectedTables[res.id] || ""}
                          onChange={(e) => setSelectedTables({ ...selectedTables, [res.id]: e.target.value })}
                          className="p-2 border rounded-xl font-semibold text-center text-sm w-full sm:w-24 outline-none"
                          style={{ borderColor: "#e8c9a0", color: "#4a2c1a" }}
                        />
                        <button onClick={() => handleApproveReservation(res.id)} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm whitespace-nowrap shadow-sm">
                          ✅ Masayı Ata & Onayla
                        </button>
                        <button onClick={() => handleRejectReservation(res.id)} className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-bold rounded-xl text-sm shadow-sm">
                          İptal Et
                        </button>
                      </>
                    ) : (
                      <div className="text-sm font-bold text-right" style={{ color: res.status === "onaylandi" ? "#2ecc71" : "#red" }}>
                        {res.status === "onaylandi" ? `Masa ${res.assignedTable} rezerve edildi.` : "Bu talep iptal edildi."}
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}