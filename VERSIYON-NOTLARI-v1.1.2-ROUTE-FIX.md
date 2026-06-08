# v1.1.2 Route Fix - Vercel SPA 404 Düzeltmesi

## Düzeltildi
- Vercel üzerinde `/categories`, `/categories/korku`, `/channels`, `/series/...` gibi sayfalara tıklayınca veya sayfa yenilenince gelen `404: NOT_FOUND` hatası düzeltildi.
- `vercel.json` eklendi.
- SPA yönlendirme kuralı eklendi: tüm public route istekleri `index.html` üzerinden açılır.
- ZIP paketinden `node_modules` ve `dist` çıkarıldı; GitHub'a gönderilmemeli.

## Supabase Gerekli mi?
- Bu fix için yeni Supabase SQL gerekli değil.
- Mevcut Vercel Environment Variables aynı kalacak.

## Deploy Notu
- Paketi projeye çıkar.
- `02-githuba-gonder.bat` ile GitHub'a gönder.
- Vercel otomatik deploy edecek.
- Olmazsa Vercel > Deployments > Redeploy yap.
