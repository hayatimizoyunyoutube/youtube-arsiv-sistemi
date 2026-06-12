import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, CalendarDays, Gamepad2, Home, MonitorSmartphone, Search, Sparkles, Trophy } from 'lucide-react';
import './style.css';

const VERSION = '0.0.5';

const games = [
  {
    id: 1,
    title: 'Resident Evil 5',
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2py3.jpg',
    release: '2009',
    series: 'Resident Evil',
    status: 'Devam Ediyor',
    genres: ['Aksiyon', 'Korku'],
    tags: ['Türkçe Altyazılı', 'Co-op']
  },
  {
    id: 2,
    title: 'Assassin’s Creed Origins',
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbe.jpg',
    release: '2017',
    series: 'Assassin’s Creed',
    status: 'Planlandı',
    genres: ['Açık Dünya', 'Aksiyon'],
    tags: ['Türkçe Altyazılı', '%100']
  },
  {
    id: 3,
    title: 'Dead Island 2',
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg',
    release: '2023',
    series: 'Dead Island',
    status: 'Tamamlandı',
    genres: ['Zombi', 'Aksiyon'],
    tags: ['Co-op', 'Türkçe Altyazılı']
  },
  {
    id: 4,
    title: 'Silent Hill Homecoming',
    cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l6y.jpg',
    release: '2008',
    series: 'Silent Hill',
    status: 'Arşivde',
    genres: ['Korku', 'Hayatta Kalma'],
    tags: ['Türkçe Altyazılı']
  }
];

function GameCard({ game }) {
  return (
    <article className="game-card">
      <div className="cover-wrap">
        <img src={game.cover} alt={`${game.title} kapak görseli`} loading="lazy" />
        <span className="status">{game.status}</span>
      </div>
      <div className="game-body">
        <h3>{game.title}</h3>
        <p>{game.series} • {game.release}</p>
        <div className="chips">
          {game.genres.map((genre) => <span key={genre}>🎮 {genre}</span>)}
        </div>
        <div className="tags">
          {game.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const filteredGames = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr-TR');
    if (!q) return games;
    return games.filter((game) =>
      [game.title, game.series, game.status, ...game.genres, ...game.tags]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
        .includes(q)
    );
  }, [search]);

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">🎮 Hayatımız Oyun</div>
        <nav className="nav" aria-label="Ana Menü">
          <a href="#anasayfa"><Home size={16} /> Ana Sayfa</a>
          <a href="#oyunlar"><Archive size={16} /> Oyunlar</a>
          <a href="#takvim"><CalendarDays size={16} /> Takvim</a>
        </nav>
      </header>

      <section id="anasayfa" className="hero">
        <div className="badge">v{VERSION} • Oyun Kartları Sistemi</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>
          İlk gerçek oyun kartları, etiketler, durum rozetleri ve arama altyapısı eklendi.
          Kullanıcı ekranında teknik GitHub repo bağlantısı gösterilmez.
        </p>
        <div className="actions" aria-label="Sistem Durumu">
          <span><Gamepad2 size={18} /> Oyun Kartları</span>
          <span><Search size={18} /> Arama Hazır</span>
          <span><MonitorSmartphone size={18} /> Mobil Uyumlu</span>
          <span><Trophy size={18} /> v{VERSION}</span>
        </div>
      </section>

      <section className="stats" aria-label="Site İstatistikleri">
        <article><strong>{games.length}</strong><h2>Oyun</h2><p>Demo arşiv kartı</p></article>
        <article><strong>4</strong><h2>Seri</h2><p>Seri bilgisi hazır</p></article>
        <article><strong>5</strong><h2>Etiket</h2><p>TR, Co-op, DLC, %100</p></article>
        <article><strong>Hazır</strong><h2>Durum</h2><p>Vercel build uyumlu</p></article>
      </section>

      <section id="oyunlar" className="archive-panel">
        <div className="section-title">
          <div>
            <span className="mini-badge">🎮 v0.0.5</span>
            <h2>Oyun Kartları</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Oyun, seri veya etiket ara..." />
          </label>
        </div>

        {filteredGames.length > 0 ? (
          <div className="game-grid">
            {filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
        ) : (
          <div className="empty-state">🔍 Aradığın kritere uygun oyun bulunamadı.</div>
        )}
      </section>

      <section id="takvim" className="preview">
        <h2>📌 Sonraki Plan</h2>
        <div className="preview-grid">
          <span>📚 v0.0.6 Arşiv Sayfası</span>
          <span>🔍 v0.0.7 Arama Geliştirme</span>
          <span>🏷️ v0.0.8 Kategori Sistemi</span>
          <span>🧪 v0.0.9 İlk Test</span>
        </div>
      </section>

      <footer>
        <strong>Hayatımız Oyun</strong> • Site Sürümü: v{VERSION} • Vercel Build Hazır • Supabase sonraki sürümlere hazırlanıyor
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
