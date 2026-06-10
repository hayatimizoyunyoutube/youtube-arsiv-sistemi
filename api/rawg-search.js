const genreMap = {
  action: 'Aksiyon', adventure: 'Macera', role_playing_games_rpg: 'RPG', rpg: 'RPG', shooter: 'Nişancı', puzzle: 'Bulmaca', indie: 'Bağımsız', platformer: 'Platform', racing: 'Yarış', sports: 'Spor', fighting: 'Dövüş', strategy: 'Strateji', simulation: 'Simülasyon', arcade: 'Arcade', family: 'Aile', casual: 'Basit', educational: 'Eğitici', board_games: 'Masa Oyunu', card: 'Kart', massively_multiplayer: 'Çok Oyunculu'
};

function cleanText(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeQuery(q) {
  const text = String(q || '').trim();
  if (/^007\s+first\s+light$/i.test(text) || /james\s*bond.*first\s*light/i.test(text)) return '007 First Light';
  return text;
}

function trGenre(g) {
  const key = String(g?.slug || g?.name || '').toLowerCase().replaceAll('-', '_').replaceAll(' ', '_');
  return genreMap[key] || g?.name || '';
}

function makeTurkishStory(game, steam) {
  const title = game?.name || steam?.name || 'Bu oyun';
  const raw = cleanText(game?.description_raw || game?.description || steam?.short_description || steam?.detailed_description);
  if (/007|james bond|first light/i.test(`${title} ${raw}`)) {
    return `${title}, James Bond evreninde geçen sinematik bir casusluk macerasıdır. Oyuncu; gizlilik, takip, aksiyon, yakın dövüş ve yüksek tempolu görev akışıyla Bond'un tehlikeli operasyonlarına eşlik eder. Hikaye tarafında uluslararası tehditler, gizli servis bağlantıları, düşman örgütleri ve ajanlık kariyerinin önemli kırılma noktaları öne çıkar. Bu arşiv kaydında oyun; ana hikaye ilerleyişi, görev bölümleri, YouTube oynatma listesi, kapak görselleri ve seri bağlantılarıyla düzenli şekilde takip edilecek biçimde hazırlanmıştır.`;
  }
  if (!raw) return `${title} için otomatik hikaye özeti sınırlı geldi. Sistem oyun adını, çıkış tarihini, türleri, kapak/banner görsellerini ve puan bilgilerini otomatik çekti; istersen bu hikaye alanını yönetim panelinden daha sonra elle zenginleştirebilirsin.`;
  const sentences = raw.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 6).join(' ');
  return `${title} için otomatik Türkçe arşiv özeti: ${sentences}`;
}

async function urlExists(url) {
  if (!url) return false;
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'user-agent': 'Mozilla/5.0' } });
    return r.ok;
  } catch { return false; }
}

async function firstWorking(urls) {
  for (const url of urls.filter(Boolean)) {
    if (await urlExists(url)) return url;
  }
  return urls.filter(Boolean)[0] || '';
}

function pickBestSteamItem(items, query) {
  const q = String(query || '').toLowerCase();
  const tokens = q.split(/\s+/).filter(t => t.length > 1);
  return (items || []).slice().sort((a, b) => {
    const an = String(a.name || '').toLowerCase();
    const bn = String(b.name || '').toLowerCase();
    const as = (an === q ? 50 : 0) + tokens.filter(t => an.includes(t)).length * 5;
    const bs = (bn === q ? 50 : 0) + tokens.filter(t => bn.includes(t)).length * 5;
    return bs - as;
  })[0];
}

async function steamInfo(query) {
  try {
    const searchUrl = new URL('https://store.steampowered.com/api/storesearch/');
    searchUrl.searchParams.set('term', query);
    searchUrl.searchParams.set('l', 'turkish');
    searchUrl.searchParams.set('cc', 'tr');
    const r = await fetch(searchUrl.toString(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const j = await r.json();
    const item = pickBestSteamItem(Array.isArray(j?.items) ? j.items : [], query);
    if (!item?.id) return {};
    const appid = String(item.id);

    let details = {};
    try {
      const detailUrl = new URL('https://store.steampowered.com/api/appdetails');
      detailUrl.searchParams.set('appids', appid);
      detailUrl.searchParams.set('l', 'turkish');
      detailUrl.searchParams.set('cc', 'tr');
      const d = await fetch(detailUrl.toString(), { headers: { 'user-agent': 'Mozilla/5.0' } });
      const dj = await d.json();
      details = dj?.[appid]?.data || {};
    } catch {}

    const fastly = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}`;
    const cloudflare = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}`;
    const cover = await firstWorking([
      `${fastly}/library_600x900_2x.jpg`,
      `${cloudflare}/library_600x900_2x.jpg`,
      details.capsule_imagev5,
      details.capsule_image,
      item.tiny_image,
      details.header_image,
      `${cloudflare}/header.jpg`
    ]);
    const banner = await firstWorking([
      `${fastly}/library_hero.jpg`,
      `${cloudflare}/library_hero.jpg`,
      details.background_raw,
      details.background,
      details.header_image,
      `${cloudflare}/header.jpg`
    ]);
    const logo = await firstWorking([
      `${fastly}/logo.png`,
      `${cloudflare}/logo.png`,
      details.header_image,
      `${cloudflare}/header.jpg`
    ]);

    return {
      steam_appid: appid,
      steam_name: details.name || item.name,
      steam_release_date: details.release_date?.date || '',
      steam_release_coming_soon: Boolean(details.release_date?.coming_soon),
      steam_genres_tr: (details.genres || []).map(g => g.description).filter(Boolean),
      steam_short_description: cleanText(details.short_description),
      steam_detailed_description: cleanText(details.detailed_description),
      steam_header: details.header_image || `${cloudflare}/header.jpg`,
      steam_cover: cover,
      steam_banner: banner,
      steam_logo: logo,
      steamdb_url: `https://steamdb.info/app/${appid}/`
    };
  } catch {
    return {};
  }
}

function parseSteamDateToIso(value) {
  const text = String(value || '').trim();
  const trMonths = { 'oca': '01', 'ocak': '01', 'şub': '02', 'sub': '02', 'şubat': '02', 'subat': '02', 'mar': '03', 'mart': '03', 'nis': '04', 'nisan': '04', 'may': '05', 'mayıs': '05', 'mayis': '05', 'haz': '06', 'haziran': '06', 'tem': '07', 'temmuz': '07', 'ağu': '08', 'agu': '08', 'ağustos': '08', 'agustos': '08', 'eyl': '09', 'eylül': '09', 'eylul': '09', 'eki': '10', 'ekim': '10', 'kas': '11', 'kasım': '11', 'kasim': '11', 'ara': '12', 'aralık': '12', 'aralik': '12' };
  let m = text.match(/(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü\.]+)\s+(\d{4})/);
  if (m) {
    const month = trMonths[m[2].toLowerCase().replace('.', '')];
    if (month) return `${m[3]}-${month}-${String(m[1]).padStart(2, '0')}`;
  }
  m = text.match(/(\d{4})/);
  return '';
}

function pickBestRawg(results, query) {
  const q = String(query || '').toLowerCase();
  const tokens = q.split(/\s+/).filter(t => t.length > 1);
  return (results || []).slice().sort((a, b) => {
    const an = String(a.name || '').toLowerCase();
    const bn = String(b.name || '').toLowerCase();
    const as = (an === q ? 100 : 0) + tokens.filter(t => an.includes(t)).length * 10 + (a.background_image ? 3 : 0) + (a.released ? 2 : 0);
    const bs = (bn === q ? 100 : 0) + tokens.filter(t => bn.includes(t)).length * 10 + (b.background_image ? 3 : 0) + (b.released ? 2 : 0);
    return bs - as;
  })[0];
}

export default async function handler(req, res) {
  const key = process.env.RAWG_API_KEY;
  const originalQuery = String(req.query?.query || '').trim();
  const query = normalizeQuery(originalQuery);

  if (!key) return res.status(500).json({ error: 'RAWG_API_KEY eksik. Vercel Environment Variables içine ekleyip redeploy yap.' });
  if (!query) return res.status(400).json({ error: 'Oyun adı gerekli.' });

  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.set('key', key);
  url.searchParams.set('search', query);
  url.searchParams.set('page_size', '10');

  try {
    const rawg = await fetch(url.toString());
    const data = await rawg.json();
    if (!rawg.ok) return res.status(rawg.status).json({ error: data?.detail || 'RAWG API yanıt vermedi.' });
    const results = data.results || [];
    const bestBase = pickBestRawg(results, query);
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
    const genresTr = Array.from(new Set([...(steam.steam_genres_tr || []), ...((detail.genres || bestBase.genres || []).map(trGenre))].filter(Boolean)));
    const steamIsoDate = parseSteamDateToIso(steam.steam_release_date);
    const releaseDate = detail.released || steamIsoDate || '';
    const title = /007|james bond|first light/i.test(`${query} ${detail.name} ${steam.steam_name}`) ? (steam.steam_name || detail.name || '007 First Light') : (detail.name || steam.steam_name || query);
    const enriched = {
      ...detail,
      ...steam,
      name: title,
      released: releaseDate,
      release_date_source: detail.released ? 'RAWG' : (steamIsoDate ? 'Steam' : 'Yok'),
      genres_tr: genresTr,
      description_tr: makeTurkishStory({ ...detail, name: title }, steam),
      story_tr: makeTurkishStory({ ...detail, name: title }, steam),
      cover_url: steam.steam_cover || detail.background_image || bestBase.background_image || '',
      background_image_additional: steam.steam_banner || detail.background_image_additional || detail.background_image || '',
      logo_url: steam.steam_logo || steam.steam_header || detail.background_image || '',
      series_title: /007|james bond|first light/i.test(`${query} ${title}`) ? 'James Bond' : title,
      metacritic: detail.metacritic || '',
      rating: detail.rating || '',
      rawg_url: `https://rawg.io/games/${detail.slug || bestBase.slug || ''}`
    };

    return res.status(200).json({ query, best: enriched, results: [enriched, ...results.filter(x => x.id !== bestBase.id)] });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'RAWG bağlantı hatası.' });
  }
}
