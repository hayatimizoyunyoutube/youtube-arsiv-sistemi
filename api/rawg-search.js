export default async function handler(req, res) {
  const key = process.env.RAWG_API_KEY;
  const query = String(req.query?.query || '').trim();

  if (!key) {
    return res.status(500).json({ error: 'RAWG_API_KEY eksik. Vercel Environment Variables içine ekleyip redeploy yap.' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Oyun adı gerekli.' });
  }

  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.set('key', key);
  url.searchParams.set('search', query);
  url.searchParams.set('page_size', '8');

  try {
    const rawg = await fetch(url.toString());
    const data = await rawg.json();
    if (!rawg.ok) {
      return res.status(rawg.status).json({ error: data?.detail || 'RAWG API yanıt vermedi.' });
    }
    return res.status(200).json({ results: data.results || [] });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'RAWG bağlantı hatası.' });
  }
}
