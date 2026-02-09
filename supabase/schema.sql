-- Trey's Bakery - Supabase Schema
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın.

-- Ürünler tablosu (menü)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Pastalar', 'Kurabiyeler', 'Cupcake''ler')),
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Özel siparişler tablosu
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  order_details JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Bekliyor' CHECK (status IN ('Bekliyor', 'Onaylandı', 'Reddedildi', 'Teslim Edildi')),
  date_needed DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- İletişim mesajları tablosu
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Örnek ürünler (isteğe bağlı - tabloyu ilk oluşturduğunuzda bir kez çalıştırın; tekrar çalıştırırsanız aynı satırlar tekrar eklenir)
-- INSERT INTO products (name, description, price, category, image_url, featured) VALUES
--   ('Çikolatalı Pasta', 'Zengin belçika çikolatası ile hazırlanan nefis pasta', 299.00, 'Pastalar', '/images/cake-chocolate.jpg', true),
--   ('Kurabiye Karışımı', '6 çeşit ev yapımı kurabiye', 89.00, 'Kurabiyeler', '/images/cookies-mix.jpg', true),
--   ('Red Velvet Cupcake', 'Krem peynir frosting ile klasik red velvet', 45.00, 'Cupcake''ler', '/images/cupcake-redvelvet.jpg', true);

-- Row Level Security (RLS) - İsteğe bağlı: API anahtarı ile erişim kullanıyorsanız service role kullanın
-- Public okuma için (anon key ile menüyü göstermek):
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Sadece service role veya authenticated kullanıcı sipariş/mesaj ekleyebilir (API route üzerinden yapacağız)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orders insert via service" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders select via service" ON orders FOR SELECT USING (true);
CREATE POLICY "Orders update via service" ON orders FOR UPDATE USING (true);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages insert via service" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Messages select via service" ON messages FOR SELECT USING (true);
