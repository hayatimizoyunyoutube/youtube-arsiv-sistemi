# v1.2.6 Fix - Bakım Modu Kullanıcı Koruma

Bu paket sürüm değildir, v1.2.6 için fix paketidir.

## Düzeltildi

- Bakım modu açıkken normal kullanıcılar ve giriş yapmamış ziyaretçiler bakım ekranına düşer.
- Kurucu/yetkili hesaplar bakım modunda siteyi kullanmaya devam edebilir.
- Bakım modu ayarları kaydedildikten sonra F5/yenileme sonrası sıfırlanmaz.
- `site_runtime_config` ve `site_settings` kayıtları artık güvenli upsert mantığıyla kaydedilir.
- Oturum süresi dolduğunda refresh token ile yenileme denenir; gereksiz `JWT expired` azalır.

## Supabase SQL gerekli mi?

Yeni tablo/kolon eklenmediği için normalde gerekmez.

Eğer v1.2.6 `schema.sql` daha önce çalıştırılmadıysa çalıştırılmalı. Daha önce çalıştırıldıysa bu fix için ekstra SQL gerekmez.

## Veri koruma

- Tablo sıfırlama yok.
- Kullanıcı yetkileri sıfırlanmaz.
- Oyun, seri, kategori, kanal, bölüm ve takvim verileri silinmez.
