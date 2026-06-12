# v4.0.5 Revizyon Fix Notu

Bu paket yeni sürüm gibi numara yükseltmez; mevcut v4.0.5 içeriğini düzeltilmiş revizyon olarak verir.

## Düzeltilenler
- Kapak alanı artık otomatik Hayatımız Oyun kapağıyla dolu gelmez; SteamDB/Steam App ID çekimi sonrası Steam CDN görseli yazılır.
- `https://steamdb.info/app/3768760/` gibi URL girildiğinde içindeki App ID otomatik ayıklanır.
- 007 First Light için Steam App ID `3768760` yerel kesin eşleşmeye eklendi.
- Steam Store API veri döndürmezse bile Steam CDN üzerinden gerçek App ID kapak/banner URL'si üretilir.
- YouTube playlist çekiminde resmi `playlistItems.list` önce kullanılır; API hata verirse sahte bölüm üretmeden gerçek playlist sayfasındaki video ID yedeği denenir.
- API bekleme süresi playlist için artırıldı.
- Güncelleme notları içinde 10 adet planlandı maddesi eklendi.

## Vercel API kontrolü
- `YOUTUBE_API_KEY` dolu olmalı.
- `SUPABASE_URL` dolu olmalı.
- `SUPABASE_SERVICE_ROLE_KEY` dolu olmalı.
- SteamDB için API key gerekmez.
