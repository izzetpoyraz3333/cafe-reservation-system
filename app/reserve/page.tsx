"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ReservePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "reservations"), {
        ...formData,
        status: "bekliyor", 
        assignedTable: "",  
        createdAt: serverTimestamp(),
      });

      toast.success("Rezervasyon talebiniz başarıyla alındı!");
      router.push("/");
    } catch (error) {
      toast.error("Rezervasyon gönderilemedi.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fdf6ec", minHeight: "100vh", paddingBottom: "40px" }}>
      
      {/* Üst Bar */}
      <div style={{ backgroundColor: "#6b3f2a", padding: "16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center rounded-xl font-bold transition-all shadow-sm active:scale-95"
            style={{ backgroundColor: "#4a2c1a", color: "#e8c9a0", width: "42px", height: "42px", fontSize: "22px" }}
          >
            ←
          </button>
          <div>
            <p className="text-white font-bold text-lg leading-tight">Masa Rezervasyonu</p>
            <p style={{ color: "#e8c9a0", fontSize: "13px" }}>Cab Cafe.</p>
          </div>
        </div>
      </div>

      {/* Form Alanı */}
      <div className="max-w-md mx-auto p-4 mt-4">
        
        <div className="text-center mb-6">
          <p className="text-5xl mb-2">📅</p>
          <h2 className="text-xl font-bold" style={{ color: "#4a2c1a" }}>Yerinizi Ayırtın</h2>
          <p className="text-sm mt-1" style={{ color: "#8b5e3c" }}>Sizin için en güzel masamızı hazırlayalım.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4" style={{ border: "1px solid #f5e6d3" }}>
          
          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Ad Soyad</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full p-3 rounded-xl border outline-none font-medium"
              style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Telefon Numarası</label>
            <input 
              type="tel" 
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="05XX XXX XX XX"
              className="w-full p-3 rounded-xl border outline-none font-medium"
              style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Tarih</label>
              <input 
                type="date" 
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border outline-none font-medium"
                style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Saat</label>
              <input 
                type="time" 
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border outline-none font-medium"
                style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Kişi Sayısı</label>
            <select 
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border outline-none font-medium"
              style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
            >
              <option value="1">1 Kişi</option>
              <option value="2">2 Kişi</option>
              <option value="3">3 Kişi</option>
              <option value="4">4 Kişi</option>
              <option value="5">5 Kişi</option>
              <option value="6+">6+ Kişi (Lütfen not bırakın)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#4a2c1a" }}>Özel İstek / Not</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Bebek sandalyesi, cam kenarı isteği vb."
              className="w-full p-3 rounded-xl border outline-none font-medium resize-none"
              style={{ borderColor: "#e8c9a0", color: "#4a2c1a", backgroundColor: "#fdf6ec" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-4 rounded-xl font-bold text-white text-lg transition-all shadow-md active:scale-95"
            style={{ 
              backgroundColor: isSubmitting ? "#b07850" : "#6b3f2a",
              opacity: isSubmitting ? 0.8 : 1
            }}
          >
            {isSubmitting ? "Talebiniz İletiliyor..." : "Rezervasyonu Tamamla"}
          </button>
          
        </form>
      </div>
    </div>
  );
}