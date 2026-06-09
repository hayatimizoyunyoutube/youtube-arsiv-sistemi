# v1.2.8 Profil Merkezi

## Eklenenler
- Yönetim paneli dashboard istatistikleri geliştirildi.
- Veri Sağlığı Merkezi eklendi.
- Oyun/seri/bölüm/kategori/kanal/kullanıcı/takvim sayıları gösterilir.
- Kapaksız, bannersız, logosuz oyun kontrol kartları eklendi.
- Bölümü olmayan oyun kontrolü eklendi.
- GitHub/Vercel commit ve deploy bilgisi v1.2.8 olarak güncellendi.

## Supabase SQL gerekli mi?
Hayır. Bu sürüm için yeni SQL gerekli değil.

## Yeni .env gerekli mi?
Hayır. Mevcut VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY yeterli.

## Veri Koruma
- DROP TABLE yok.
- TRUNCATE yok.
- Yetkiler sıfırlanmaz.
- Mevcut oyun/seri/bölüm/kategori/kanal/kullanıcı/takvim verileri korunur.
