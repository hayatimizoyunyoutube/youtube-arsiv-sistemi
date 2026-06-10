export default async function handler(req, res) {
  const key = process.env.RAWG_API_KEY;
  const query = String(req.query?.query || '').trim();

  if (!key) {
    return res.status(500).json({ error: 'RAWG_API_KEY eksik. Vercel Environment Variables içine ekleyip redeploy yap.' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Oyun adı gerekli.' });
  }

  try {
    const url = new URL('https://api.rawg.io/api/games');
    url.searchParams.set('key', key);
    url.searchParams.set('search', query);
    url.searchParams.set('page_size', '8');

    const rawg = await fetch(url.toString());
    const data = await rawg.json();
    if (!rawg.ok) {
      return res.status(rawg.status).json({ error: data?.detail || 'RAWG API yanıt vermedi.' });
    }

    const baseResults = data.results || [];
    const detailed = await Promise.all(baseResults.map(async (item) => {
      try {
        const detailUrl = new URL(`https://api.rawg.io/api/games/${item.id}`);
        detailUrl.searchParams.set('key', key);
        const detailResponse = await fetch(detailUrl.toString());
        const detail = await detailResponse.json();
        if (!detailResponse.ok) return item;
        return {
          ...item,
          description_raw: detail.description_raw || item.description_raw || '',
          description: detail.description || item.description || '',
          website: detail.website || item.website || '',
          developers: detail.developers || [],
          publishers: detail.publishers || [],
          stores: detail.stores || item.stores || [],
          genres: detail.genres?.length ? detail.genres : item.genres || []
        };
      } catch {
        return item;
      }
    }));

    return res.status(200).json({ results: detailed });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'RAWG bağlantı hatası.' });
  }
}
