# Vercel Kurulum Rehberi - v1.2.4

Bu dosya her sürümde güncellenecek. Gizli keyler GitHub'a gönderilmez.

## GitHub / Vercel Sürüm Notu

Bu paket: **v1.2.4 Kanal Yönetimi Gelişmiş**

`02-githuba-gonder.bat` commit mesajını v1.2.4 olarak gönderir. Vercel deploy ekranında yeni commit mesajı v1.2.4 olarak görünmelidir.

## Environment Variables

### Gerekli

Vercel → Project → Settings → Environment Variables içine şunlar ekli olmalı:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

### Bu sürümde yeni .env gerekli mi?

**Hayır.** v1.2.4 için yeni API key yok. Mevcut Supabase URL ve anon key yeterli.

### Henüz eklenmeyecekler

```env
YOUTUBE_API_KEY
RAWG_API_KEY
STEAM_API_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Bunlar ileride ilgili sürüm geldiğinde eklenecek. Şimdilik Vercel'e ekleme.

## Supabase SQL gerekli mi?

**Evet, gerekli.**

Çalıştırılacak dosya:

```text
supabase/schema.sql
```

### Bu SQL ne ekliyor?

- `public_channels` tablosuna eksik kolonları ekler.
- Kanal adı/açıklaması/türü alanlarını hazırlar.
- YouTube kanal ID alanı ekler.
- Kanal bağlantısı alanı ekler.
- Kapak/banner/logo URL alanlarını hazırlar.
- Sıralama ve görünürlük alanlarını günceller.
- `mertdundaroyunda@gmail.com` hesabını kurucu olarak korur.

### Veri sıfırlanır mı?

**Hayır.** Bu SQL veri silmez.

Kullanılmayanlar:

```sql
DROP TABLE
TRUNCATE
```

Results kısmında şunu görmelisin:

```text
v1.2.4 başarıyla çalıştı
```

## Deploy sonrası

Vercel'de env zaten varsa sadece GitHub'a gönder ve deploy bekle. Env yeni eklenirse veya değişirse:

```text
Deployments → Redeploy
```


## v1.2.4 Kanal SQL Fix Notu

Yeni `.env` gerekli değil. Mevcut değerler yeterli:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Supabase SQL gerekli: **Evet**.

Bu SQL kullanıcı yetkilerini sıfırlamaz ve mevcut verileri silmez.
