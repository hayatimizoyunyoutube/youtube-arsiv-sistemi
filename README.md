# Hayatımız Oyun Arşiv Sistemi

**Sürüm:** v0.0.1  
**Repo:** https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi

## ✅ v0.0.1 İçeriği

- 🧱 Temiz proje başlangıcı yapıldı.
- 📁 `docs`, `src`, `public`, `supabase` klasörleri oluşturuldu.
- 📝 README ve CHANGELOG eklendi.
- 🚀 Vercel için `npm run build` hazırlandı.
- 🧹 Projeyi temizlemek için `01-siteyi-temizle-git-ve-bat-haric.bat` eklendi.
- 📤 GitHub'a otomatik göndermek için `02-githuba-otomatik-gonder.bat` eklendi.
- 🗄️ Supabase için v0.0.1 durum SQL dosyası eklendi.

## Kurulum

```bat
npm install
npm run dev
```

## Vercel Deploy Ayarı

- Framework Preset: **Vite**
- Build Command: **npm run build**
- Output Directory: **dist**
- Install Command: **npm install**

## Supabase Durumu

v0.0.1 için zorunlu tablo yoktur.  
Bu sürüm sadece temel site başlangıcıdır.

Supabase panelinde çalıştırmak istersen:

```sql
-- supabase/schema.sql dosyasını çalıştır.
-- Bu dosya tablo silmez, veri sıfırlamaz.
```

## Vercel ENV Durumu

v0.0.1 için zorunlu ENV yoktur.  
Yine de sonraki sürümlere hazırlık için `.env.example` eklendi.
