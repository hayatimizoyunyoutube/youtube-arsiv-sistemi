export default async function handler(req, res) {
  const query = String(req.query?.query || '').trim();
  if (!query) return res.status(400).json({ error: 'Oyun adı gerekli.' });

  try {
    const searchUrl = new URL('https://store.steampowered.com/api/storesearch/');
    searchUrl.searchParams.set('term', query);
    searchUrl.searchParams.set('cc', 'tr');
    searchUrl.searchParams.set('l', 'turkish');

    const response = await fetch(searchUrl.toString(), {
      headers: { 'User-Agent': 'HayatimizOyunArchive/1.3.2' }
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: 'Steam araması başarısız oldu.' });

    const item = (data.items || [])[0];
    if (!item?.id) return res.status(404).json({ error: 'Steam AppID bulunamadı.' });
    const appid = item.id;

    return res.status(200).json({
      appid,
      name: item.name,
      store_url: `https://store.steampowered.com/app/${appid}`,
      header_image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
      capsule_image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/capsule_616x353.jpg`,
      library_hero: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_hero.jpg`,
      note: 'SteamDB resmi API sunmadığı için AppID Steam Store aramasıyla bulunur; kapaklar Steam CDN adreslerinden doldurulur.'
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Steam kapak bağlantısı kurulamadı.' });
  }
}
