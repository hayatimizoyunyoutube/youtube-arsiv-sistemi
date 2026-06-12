import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, CalendarDays, CheckCircle2, Clock, Gamepad2, Home, MonitorSmartphone, Search, Star, Trophy } from 'lucide-react';
import './style.css';

const VERSION = '0.0.6';

const games = [
  { id: 1, title: 'Resident Evil 5', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2py3.jpg', release: '2009', series: 'Resident Evil', status: 'Devam Ediyor', genres: ['Aksiyon', 'Korku'], tags: ['Türkçe Altyazılı', 'Co-op'], episodes: 4 },
  { id: 2, title: 'Assassin’s Creed Origins', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbe.jpg', release: '2017', series: 'Assassin’s Creed', status: 'Planlandı', genres: ['Açık Dünya', 'Aksiyon'], tags: ['Türkçe Altyazılı', '%100'], episodes: 1 },
  { id: 3, title: 'Dead Island 2', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg', release: '2023', series: 'Dead Island', status: 'Tamamlandı', genres: ['Zombi', 'Aksiyon'], tags: ['Co-op', 'Türkçe Altyazılı'], episodes: 6 },
  { id: 4, title: 'Silent Hill Homecoming', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l6y.jpg', release: '2008', series: 'Silent Hill', status: 'Arşivde', genres: ['Korku', 'Hayatta Kalma'], tags: ['Türkçe Altyazılı'], episodes: 2 },
  { id: 5, title: 'Resident Evil 0 HD Remaster', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2py7.jpg', release: '2016', series: 'Resident Evil', status: 'Arşivde', genres: ['Korku', 'Bulmaca'], tags: ['Türkçe Altyazılı'], episodes: 4 },
  { id: 6, title: 'Icarus', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3w4h.jpg', release: '2021', series: 'Icarus', status: 'Devam Ediyor', genres: ['Hayatta Kalma', 'Co-op'], tags: ['Co-op'], episodes: 4 }
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
        <p>{game.series} • {game.release} • {game.episodes} bölüm</p>
        <div className="chips">{game.genres.map((genre) => <span key={genre}>🎮 {genre}</span>)}</div>
        <div className="tags">{game.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Tümü');
  const statuses = ['Tümü', ...Array.from(new Set(games.map((game) => game.status)))];

  const filteredGames = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr-TR');
    return games.filter((game) => {
      const statusOk = status === 'Tümü' || game.status === status;
      const searchOk = !q || [game.title, game.series, game.status, ...game.genres, ...game.tags]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
        .includes(q);
      return statusOk && searchOk;
    });
  }, [search, status]);

  const totalEpisodes = games.reduce((sum, game) => sum + game.episodes, 0);

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">🎮 Hayatımız Oyun</div>
        <nav className="nav" aria-label="Ana Menü">
          <a href="#anasayfa"><Home size={16} /> Ana Sayfa</a>
          <a href="#arsiv"><Archive size={16} /> Arşiv</a>
          <a href="#takvim"><CalendarDays size={16} /> Takvim</a>
        </nav>
      </header>

      <section id="anasayfa" className="hero">
        <div className="badge">v{VERSION} • Arşiv Sayfası</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>Arşiv sayfası, listeleme yapısı, durum filtreleri ve demo veri sayısı bu sürümde geliştirildi. Kullanıcı ekranında teknik GitHub repo bağlantısı gösterilmez.</p>
        <div className="actions" aria-label="Sistem Durumu">
          <span><Gamepad2 size={18} /> Oyun Arşivi</span>
          <span><Search size={18} /> Arama + Filtre</span>
          <span><MonitorSmartphone size={18} /> Mobil Uyumlu</span>
          <span><Trophy size={18} /> v{VERSION}</span>
        </div>
      </section>

      <section className="stats" aria-label="Site İstatistikleri">
        <article><strong>{games.length}</strong><h2>Oyun</h2><p>Demo arşiv kaydı</p></article>
        <article><strong>{totalEpisodes}</strong><h2>Bölüm</h2><p>Bölüm sayacı hazır</p></article>
        <article><strong>{statuses.length - 1}</strong><h2>Durum</h2><p>Filtre sistemi aktif</p></article>
        <article><strong>Hazır</strong><h2>Build</h2><p>Vercel uyumlu</p></article>
      </section>

      <section id="arsiv" className="archive-panel">
        <div className="section-title">
          <div>
            <span className="mini-badge">📚 v0.0.6</span>
            <h2>Arşiv Sayfası</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Oyun, seri, tür veya etiket ara..." />
          </label>
        </div>

        <div className="filter-row" aria-label="Durum filtreleri">
          {statuses.map((item) => (
            <button key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item)}>{item}</button>
          ))}
        </div>

        <div className="result-info"><CheckCircle2 size={18} /> {filteredGames.length} oyun listeleniyor</div>

        {filteredGames.length > 0 ? <div className="game-grid">{filteredGames.map((game) => <GameCard key={game.id} game={game} />)}</div> : <div className="empty-state">🔍 Aradığın kritere uygun oyun bulunamadı.</div>}
      </section>

      <section id="takvim" className="preview">
        <h2>📌 Sonraki Plan</h2>
        <div className="preview-grid">
          <span><Search size={18} /> v0.0.7 Arama Geliştirme</span>
          <span><Star size={18} /> v0.0.8 Kategori Sistemi</span>
          <span><Clock size={18} /> v0.0.9 İlk Test</span>
          <span><Archive size={18} /> v0.1.0 Arşiv Geliştirme</span>
        </div>
      </section>

      <footer><strong>Hayatımız Oyun</strong> • Site Sürümü: v{VERSION} • Vercel Build Hazır • Supabase SQL şu an zorunlu değil</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
