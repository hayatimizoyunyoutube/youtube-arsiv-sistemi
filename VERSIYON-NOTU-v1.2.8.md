# v1.2.8 - Profil Merkezi

## Supabase SQL gerekli mi?
Hayır. Bu sürümde yeni tablo/kolon eklenmedi.

## Yeni .env gerekli mi?
Hayır. Mevcut `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` yeterli.

## Eklenenler
- Profil ekranı gerçek kullanıcı bilgisiyle dolduruldu.
- E-posta, görünen ad, rol, durum ve yetki bilgisi gösterildi.
- Görünen ad kaydetme eklendi.
- Oturum korunur; kullanıcı kendi çıkış yapmadan çıkış yapılmaz.
- Vercel/GitHub sürüm etiketi v1.2.8 olarak güncellendi.

## Veri Koruma
- `DROP TABLE` yok.
- `TRUNCATE` yok.
- Yetkiler sıfırlanmaz.
- Mevcut kullanıcı, oyun, kategori, kanal, seri ve bölüm verileri korunur.
