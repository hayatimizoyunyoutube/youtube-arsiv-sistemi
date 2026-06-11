# FIX - v1.3.2 Komple Site Bozulma Toparlama

Bu paket yeni sürüm değildir. v1.3.2 üstüne arayüz düzeltmesidir.

## Düzeltilenler

- Üst menüde butonların iç içe girme sorunu düzeltildi.
- Çıkış yap butonunun tüm menüyü kaplaması engellendi.
- Menü artık iki katmanlı güvenli düzendedir:
  - Üst satır: logo, profil, yönetim paneli, rol, çıkış/giriş
  - Alt satır: Ana Sayfa, Arşiv, Koleksiyonlar, Seriler, Yayın Takvimi, Site Durumu, Site Rehberi
- Ana sayfa hero alanındaki metin taşması ve üst üste binme düzeltildi.
- Kart ve istatistik gridleri taşmayacak şekilde yeniden sabitlendi.
- Mobil/tablet görünümde menüler kırılmadan alt satıra iner.

## Supabase

Supabase SQL gerekmez.

## Vercel

Yeni `.env` gerekmez.

## Not

Bu fix otomatik çekme sistemine dokunmaz; sadece bozuk site arayüzünü toparlar.
