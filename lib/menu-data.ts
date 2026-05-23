export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  categoryId: string;
  avgPrepSeconds: number;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export const categories = [
  { id: "hot", name: "Sıcak Kahveler", emoji: "☕" },
  { id: "cold", name: "Soğuk Kahveler", emoji: "🧊" },
  { id: "tea", name: "Çaylar", emoji: "🫖" },
  { id: "soft", name: "Soğuk İçecekler", emoji: "🥤" },
  { id: "food", name: "Sandviç & Kahvaltı", emoji: "🥪" },
  { id: "dessert", name: "Tatlılar", emoji: "🍰" },
  { id: "snack", name: "Atıştırmalıklar", emoji: "🍪" },
];

export const products = [
  // --- Sıcak Kahveler ---
  { id: "h1", categoryId: "hot", name: "Türk Kahvesi", price: 50, emoji: "☕", description: "Çifte kavrulmuş, lokum ve su eşliğinde." },
  { id: "h2", categoryId: "hot", name: "Espresso", price: 65, emoji: "☕", description: "Yoğun ve aromalı tek shot espresso." },
  { id: "h3", categoryId: "hot", name: "Double Espresso", price: 80, emoji: "☕", description: "Daha yoğun bir deneyim için çift shot espresso." },
  { id: "h4", categoryId: "hot", name: "Macchiato", price: 75, emoji: "☕", description: "Espresso üzerine bir dokunuş süt köpüğü." },
  { id: "h5", categoryId: "hot", name: "Cortado", price: 85, emoji: "🥛", description: "Eşit oranda espresso ve sıcak süt." },
  { id: "h6", categoryId: "hot", name: "Flat White", price: 85, emoji: "☕", description: "İnce süt köpüğü ile yumuşak içimli çift shot espresso." },
  { id: "h7", categoryId: "hot", name: "Latte", price: 85, emoji: "🥛", description: "Espresso ve bol buharlı sıcak süt." },
  { id: "h8", categoryId: "hot", name: "Cappuccino", price: 80, emoji: "☕", description: "Klasik İtalyan bol köpüklü kahvesi." },
  { id: "h9", categoryId: "hot", name: "Americano", price: 70, emoji: "☕", description: "Sıcak su ile inceltilmiş espresso ferahlığı." },
  { id: "h10", categoryId: "hot", name: "Mocha", price: 95, emoji: "🍫", description: "Çikolata, espresso ve sıcak sütün tatlı uyumu." },
  { id: "h11", categoryId: "hot", name: "White Chocolate Mocha", price: 100, emoji: "🤍", description: "Beyaz çikolatalı, yumuşak içimli sıcak kahve." },
  { id: "h12", categoryId: "hot", name: "Filtre Kahve", price: 65, emoji: "☕", description: "Özel yöresel çekirdeklerden taze demlenmiş." },

  // --- Soğuk Kahveler ---
  { id: "c1", categoryId: "cold", name: "Iced Latte", price: 90, emoji: "🧊", description: "Buz, soğuk süt ve taze espresso." },
  { id: "c2", categoryId: "cold", name: "Iced Americano", price: 75, emoji: "🧊", description: "Buzlu su ve espresso ile serinletici lezzet." },
  { id: "c3", categoryId: "cold", name: "Cold Brew", price: 95, emoji: "🥃", description: "24 saat soğuk demlenmiş, yüksek kafeinli yoğun kahve." },
  { id: "c4", categoryId: "cold", name: "Iced Caramel Macchiato", price: 105, emoji: "🍯", description: "Buzlu süt, vanilya şurubu, espresso ve karamel sos." },
  { id: "c5", categoryId: "cold", name: "Iced Mocha", price: 100, emoji: "🍫", description: "Buzlu çikolatalı ve sütlü espresso keyfi." },
  { id: "c6", categoryId: "cold", name: "Frappe", price: 95, emoji: "🥤", description: "Blenderda çekilmiş kırık buzlu, köpüklü kahve." },
  { id: "c7", categoryId: "cold", name: "Affogato", price: 110, emoji: "🍨", description: "Bir top vanilyalı dondurma üzerine sıcak espresso." },

  // --- Çaylar (YENİ) ---
  { id: "t1", categoryId: "tea", name: "Bardak Çay", price: 30, emoji: "🍵", description: "Taze demlenmiş Türk çayı." },
  { id: "t2", categoryId: "tea", name: "Fincan Çay", price: 45, emoji: "🫖", description: "Büyük boy fincanda taze demlenmiş Türk çayı." },
  { id: "t3", categoryId: "tea", name: "Yeşil Çay", price: 60, emoji: "🌿", description: "Rahatlatıcı ve antioksidan kaynağı yeşil çay." },
  { id: "t4", categoryId: "tea", name: "Papatya Çayı", price: 60, emoji: "🌼", description: "Sakinleştirici bitki çayı." },
  { id: "t5", categoryId: "tea", name: "Kış Çayı", price: 70, emoji: "🍊", description: "Tarçın, karanfil ve portakal ile hazırlanan kış çayı." },
  { id: "t6", categoryId: "tea", name: "Chai Tea Latte", price: 85, emoji: "☕", description: "Baharatlı Hint çayı özü ve sıcak buharlı süt." },

  // --- Soğuk İçecekler ---
  { id: "s1", categoryId: "soft", name: "Ev Yapımı Limonata", price: 75, emoji: "🍋", description: "Taze nane ve limon ile günlük hazırlanır." },
  { id: "s2", categoryId: "soft", name: "Çilekli Limonata", price: 85, emoji: "🍓", description: "Çilek püreli taze limonata." },
  { id: "s3", categoryId: "soft", name: "Taze Sıkma Portakal", price: 85, emoji: "🍊", description: "Günlük taze sıkılmış C vitamini deposu." },
  { id: "s4", categoryId: "soft", name: "Karışık Orman Meyveli Smoothie", price: 95, emoji: "🫐", description: "Böğürtlen, frambuaz ve yoğurt." },
  { id: "s5", categoryId: "soft", name: "Çikolatalı Milkshake", price: 100, emoji: "🥤", description: "Dondurma ve sütün buzlu karışımı." },
  { id: "s6", categoryId: "soft", name: "Soğuk Çikolata", price: 80, emoji: "🍫", description: "Buzlu yoğun çikolatalı içecek." },
  { id: "s7", categoryId: "soft", name: "Maden Suyu", price: 35, emoji: "🫧", description: "Sade veya limon dilimli mineral su." },
  { id: "s8", categoryId: "soft", name: "Su", price: 20, emoji: "💧", description: "0.5L Cam şişe su." },

  // --- Sandviç & Kahvaltı (YENİ) ---
  { id: "f1", categoryId: "food", name: "Kaşarlı Tost", price: 90, emoji: "🥪", description: "Ekşi mayalı ekmekte bol kaşarlı sıcak tost." },
  { id: "f2", categoryId: "food", name: "Karışık Tost", price: 110, emoji: "🥪", description: "Sucuk ve kaşar peyniri ile doyurucu tost." },
  { id: "f3", categoryId: "food", name: "Beyaz Peynirli Soğuk Sandviç", price: 95, emoji: "🥖", description: "Baget ekmeğinde beyaz peynir, domates ve yeşillik." },
  { id: "f4", categoryId: "food", name: "Füme Etli Kruvasan", price: 140, emoji: "🥐", description: "Taze kruvasan içinde dana füme ve cheddar." },
  { id: "f5", categoryId: "food", name: "Granola Bowl", price: 120, emoji: "🥣", description: "Süzme yoğurt, mevsim meyveleri, bal ve çıtır granola." },

  // --- Tatlılar ---
  { id: "d1", categoryId: "dessert", name: "San Sebastian Cheesecake", price: 130, emoji: "🍰", description: "İçi akışkan, üzeri yanık efsane lezzet." },
  { id: "d2", categoryId: "dessert", name: "Tiramisu", price: 120, emoji: "☕", description: "Kedidili ve mascarpone peynirli, espresso bazlı İtalyan tatlısı." },
  { id: "d3", categoryId: "dessert", name: "Sıcak Çikolatalı Sufle", price: 115, emoji: "🧁", description: "İçi akışkan sıcak çikolata, yanında vanilyalı dondurma ile." },
  { id: "d4", categoryId: "dessert", name: "Brownie", price: 100, emoji: "🍫", description: "Cevizli ve yoğun çikolatalı ıslak kek." },
  { id: "d5", categoryId: "dessert", name: "Mozaik Pasta", price: 85, emoji: "🍫", description: "Klasik bisküvili ve çikolata dolgulu ev pastası." },
  { id: "d6", categoryId: "dessert", name: "Havuçlu Tarçınlı Kek", price: 90, emoji: "🥕", description: "Cevizli, havuçlu ve krem peynir dolgulu dilim kek." },
  { id: "d7", categoryId: "dessert", name: "Red Velvet", price: 125, emoji: "🍰", description: "Kırmızı kadife pasta ve hafif krema dolgusu." },

  // --- Atıştırmalıklar ---
  { id: "sn1", categoryId: "snack", name: "Sade Kruvasan", price: 70, emoji: "🥐", description: "Tereyağlı, çıtır Fransız klasiği." },
  { id: "sn2", categoryId: "snack", name: "Çikolatalı Kruvasan", price: 85, emoji: "🥐", description: "İçi sıcak çikolata kreması dolgulu." },
  { id: "sn3", categoryId: "snack", name: "Damla Çikolatalı Cookie", price: 60, emoji: "🍪", description: "İçi yumuşak, dışı çıtır Amerikan kurabiyesi." },
  { id: "sn4", categoryId: "snack", name: "Yaban Mersinli Muffin", price: 65, emoji: "🧁", description: "Bol yaban mersinli yumuşak kek." },
  { id: "sn5", categoryId: "snack", name: "Tarçınlı Çörek (Cinnamon Roll)", price: 85, emoji: "🥨", description: "Bol tarçınlı ve üzeri beyaz kremalı çörek." }
];