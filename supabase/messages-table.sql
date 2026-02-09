-- Sadece messages tablosu (iletişim formu mesajları)
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın.
-- İletişim formundan gelen mesajlar admin panelde "Mesajlar" sekmesinde görünür.

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Service role ile insert/select (API route service role kullanıyor)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Messages insert via service" ON messages;
CREATE POLICY "Messages insert via service" ON messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Messages select via service" ON messages;
CREATE POLICY "Messages select via service" ON messages FOR SELECT USING (true);
