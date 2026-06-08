# Hayatımız Oyun YouTube Arşiv Sistemi

Sürüm: v1.1.9

## Bu sürümde eklenenler

- `mertdundaroyunda@gmail.com` hesabı kurucu/founder yapılır.
- Supabase SQL artık tablo sıfırlamaz.
- Mevcut kullanıcı, oyun, kategori, kanal, seri ve bölüm verileri korunur.
- Eksik tablolar `create table if not exists` ile oluşturulur.
- Eksik kolonlar `alter table ... add column if not exists` ile eklenir.
- Status ekranı v1.1.9 başarı sonucunu gösterir.

## Supabase gerekli mi?

Evet. `supabase/schema.sql` çalıştırılmalı.

SQL Results kısmında şu yazmalı:

```text
v1.1.9 başarıyla çalıştı
```

## Güvenlik kuralı

`.env.local` GitHub'a gönderilmez. Vercel env tarafında şu iki bilgi yeterlidir:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

