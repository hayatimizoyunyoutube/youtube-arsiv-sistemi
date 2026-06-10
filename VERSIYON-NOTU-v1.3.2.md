# v1.3.2 — RAWG Oyun Bilgisi Hazırlığı

Bu sürümde oyun ekleme sürecini kolaylaştırmak için RAWG oyun arama ve kapak/meta önizleme altyapısı eklendi.

## Eklenenler

- Yönetim paneline `RAWG Oyun Bilgisi` sayfası eklendi.
- Oyun adına göre RAWG araması yapılır.
- Sonuçlarda oyun adı, çıkış tarihi, türler, RAWG ID ve kapak URL gösterilir.
- `api/rawg-search.js` Vercel serverless endpoint olarak eklendi.
- GitHub/Vercel sürüm bilgileri v1.3.2 olarak güncellendi.

## Supabase SQL gerekli mi?

Hayır. Bu sürümde Supabase SQL gerekmez.

## Yeni .env gerekli mi?

Evet. Vercel Environment Variables içine eklenir:

```env
RAWG_API_KEY=BURAYA_RAWG_API_KEY
```

Mevcut veri ve yetkiler sıfırlanmaz.
