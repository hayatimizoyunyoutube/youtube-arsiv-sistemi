const genreMap = {
  action: 'Aksiyon', adventure: 'Macera', role_playing_games_rpg: 'RPG', rpg: 'RPG', shooter: 'Nişancı', puzzle: 'Bulmaca', indie: 'Bağımsız', platformer: 'Platform', racing: 'Yarış', sports: 'Spor', fighting: 'Dövüş', strategy: 'Strateji', simulation: 'Simülasyon', arcade: 'Arcade', family: 'Aile', casual: 'Basit', educational: 'Eğitici', board_games: 'Masa Oyunu', card: 'Kart', massively_multiplayer: 'Çok Oyunculu'
};

function normalizeQuery(q) {
  const text = String(q || '').trim();
  if (/^007\s+first\s+light$/i.test(text) || /james\s*bond.*first\s*light/i.test(text)) return '007 First Light James Bond';
  return text;
}

function trGenre(g) {
  const key = String(g?.slug || g?.name || '').toLowerCase().replaceAll('-', '_').replaceAll(' ', '_');
  return genreMap[key] || g?.name || '';
}

function makeTurkishStory(game) {
  const title = game?.name || 'Bu oyun';
  const raw = String(game?.description_raw || '').replace(/\s+/g, ' ').trim();
  if (/007|james bond|first light/i.test(title)) {
    return `${title}, James Bond'un erken dönem görevlerine odaklanan sinematik bir casusluk macerası olarak öne çıkar. Oyuncu; gizlilik, takip, çatışma ve yüksek tempolu aksiyon sahneleriyle Bond'un ajanlığa yükselişini deneyimler. Hikaye, uluslararası tehditler, gizli operasyonlar ve karakterin ilk büyük sınavları etrafında ilerler. Arşivde bu oyun; ana hikaye, görev akışı, bölüm kayıtları ve oynatma listesi bağlantılarıyla takip edilecek şekilde hazırlanmıştır.`;
  }
  if (!raw) return `${title} için hikaye özeti henüz RAWG tarafında yeterli değil. Oyun bilgisi, kapaklar, türler ve çıkış tarihi otomatik çekildi; hikaye metni daha sonra yönetim panelinden geliştirilebilir.`;
  const first = raw.split(/(?<=[.!?])\s+/).slice(0, 4).join(' ');
  return `${title} için RAWG kaynağından alınan hikaye/oyun açıklaması Türkçe arşiv notu olarak özetlendi: ${first}`;
}

async function steamInfo(query) {
  try {
    const url = new URL('https://store.steampowered.com/api/storesearch/');
    url.searchParams.set('term', query);
    url.searchParams.set('l', 'turkish');
    url.searchParams.set('cc', 'tr');
    const r = await fetch(url.toString(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const j = await r.json();
    const item = Array.isArray(j?.items) ? j.items[0] : null;
    if (!item?.id) return {};
    const appid = String(item.id);
    return {
      steam_appid: appid,
      steam_name: item.name,
      steam_header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
      steam_cover: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900_2x.jpg`,
      steam_banner: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_hero.jpg`,
      steam_logo: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/logo.png`
    };
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  const key = process.env.RAWG_API_KEY;
  const query = normalizeQuery(String(req.query?.query || '').trim());

  if (!key) return res.status(500).json({ error: 'RAWG_API_KEY eksik. Vercel Environment Variables içine ekleyip redeploy yap.' });
  if (!query) return res.status(400).json({ error: 'Oyun adı gerekli.' });

  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.set('key', key);
  url.searchParams.set('search', query);
  url.searchParams.set('search_precise', 'true');
  url.searchParams.set('page_size', '8');

  try {
    const rawg = await fetch(url.toString());
    const data = await rawg.json();
    if (!rawg.ok) return res.status(rawg.status).json({ error: data?.detail || 'RAWG API yanıt vermedi.' });
    const results = data.results || [];
    const bestBase = results.find(x => String(x.name || '').toLowerCase().includes(String(req.query?.query || '').toLowerCase().split(' ')[0])) || results[0];
    if (!bestBase) return res.status(200).json({ results: [] });

    let detail = bestBase;
    try {
      const detailUrl = new URL(`https://api.rawg.io/api/games/${bestBase.id}`);
      detailUrl.searchParams.set('key', key);
      const d = await fetch(detailUrl.toString());
      const dj = await d.json();
      if (d.ok) detail = { ...bestBase, ...dj };
    } catch {}

    const steam = await steamInfo(query);
    const enriched = {
      ...detail,
      ...steam,
      name: /007|james bond|first light/i.test(query) ? (detail.name || '007 First Light') : detail.name,
      genres_tr: (detail.genres || bestBase.genres || []).map(trGenre).filter(Boolean),
      description_tr: makeTurkishStory(detail),
      story_tr: makeTurkishStory(detail),
      cover_url: steam.steam_cover || detail.background_image || bestBase.background_image || '',
      background_image_additional: steam.steam_banner || detail.background_image_additional || detail.background_image || '',
      logo_url: steam.steam_logo || steam.steam_header || detail.background_image || '',
      series_title: /007|james bond|first light/i.test(query) ? 'James Bond' : (detail.name || bestBase.name || query)
    };

    return res.status(200).json({ query, best: enriched, results: [enriched, ...results.filter(x => x.id !== bestBase.id)] });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'RAWG bağlantı hatası.' });
  }
}
