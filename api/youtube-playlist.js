export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY Vercel Environment Variables içinde eksik.' });
  }

  function extractPlaylistId(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    try {
      const url = new URL(text);
      const list = url.searchParams.get('list');
      if (list) return list.trim();
    } catch {}
    const match = text.match(/[?&]list=([^&\s]+)/) || text.match(/(PL[A-Za-z0-9_-]{12,})/);
    return match ? decodeURIComponent(match[1]).trim() : text.trim();
  }
  const playlistId = extractPlaylistId(req.query.playlistId || req.query.playlistUrl || req.query.url || '');
  if (!playlistId) {
    return res.status(400).json({ error: 'Playlist URL veya playlistId gerekli.' });
  }

  try {
    const items = [];
    let pageToken = '';
    let guard = 0;

    do {
      const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
      url.searchParams.set('part', 'snippet,contentDetails');
      url.searchParams.set('maxResults', '50');
      url.searchParams.set('playlistId', playlistId);
      url.searchParams.set('key', apiKey);
      if (pageToken) url.searchParams.set('pageToken', pageToken);

      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: json?.error?.message || 'YouTube API hatası.' });
      }

      for (const item of json.items || []) {
        const snippet = item.snippet || {};
        const videoId = item.contentDetails?.videoId || snippet.resourceId?.videoId || '';
        if (!videoId) continue;
        items.push({
          youtube_video_id: videoId,
          title: snippet.title || 'Başlıksız Bölüm',
          description: snippet.description || '',
          thumbnail_url: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
          youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
          published_at: snippet.publishedAt || null,
          position: Number(snippet.position || 0) + 1
        });
      }

      pageToken = json.nextPageToken || '';
      guard += 1;
    } while (pageToken && guard < 10);

    return res.status(200).json({ playlistId, count: items.length, items });
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Bilinmeyen YouTube API hatası.' });
  }
}
