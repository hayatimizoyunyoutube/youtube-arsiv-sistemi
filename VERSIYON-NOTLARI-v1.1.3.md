# v1.1.3 - Supabase Kategori/Auth/Admin İskeleti

## Supabase gerekli mi?
Evet, gerekli.

## Eklenenler
- Demo veriler public görünümden kaldırıldı.
- `public_categories` tablosu eklendi.
- `public_channels` tablosu eklendi.
- `public_series` tablosu korundu ve yeni yapıyla güncellendi.
- Giriş yap ve kayıt ol sayfaları Supabase Auth ile kuruldu.
- Yönetim paneli içindeki butonların route iskeleti kuruldu.
- Admin panelde kategori ekle/düzenle/sil başlangıcı eklendi.
- Status/health sürümü v1.1.3 olarak güncellendi.

## Supabase SQL Results
`supabase/schema.sql` çalışınca Results alanında şu görünmeli:

```text
v1.1.3 başarıyla çalıştı
```

## Vercel Env
Vercel > Settings > Environment Variables içine:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Ekledikten sonra mutlaka Redeploy yapılacak.

## Sonraki Plan
v1.1.4 - Kanal Yönetimi
