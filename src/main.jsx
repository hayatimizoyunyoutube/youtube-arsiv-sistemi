import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, CalendarDays, Gamepad2, Home, MonitorSmartphone, Search, Trophy, ListFilter } from 'lucide-react';
import './style.css';

const VERSION = '0.0.6';

const games = [
  { id: 1, title: 'Resident Evil 5', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2py3.jpg', release: '2009', series: 'Resident Evil', status: 'Devam Ediyor', genres: ['Aksiyon', 'Korku'], tags: ['Türkçe Altyazılı', 'Co-op'] },
  { id: 2, title: 'Assassin’s Creed Origins', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbe.jpg', release: '2017', series: 'Assassin’s Creed', status: 'Planlandı', genres: ['Açık Dünya', 'Aksiyon'], tags: ['Türkçe Altyazılı', '%100'] },
  { id: 3, title: 'Dead Island 2', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg', release: '2023', series: 'Dead Island', status: 'Tamamlandı', genres: ['Zombi', 'Aksiyon'], tags: ['Co-op', 'Türkçe Altyazılı'] },
  { id: 4, title: 'Silent Hill Homecoming', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l6y.jpg', release: '2008', series: 'Silent Hill', status: 'Arşivde', genres: ['Korku', 'Hayatta Kalma'], tags: ['Türkçe Altyazılı'] },
  { id: 5, title: 'Serious Sam HD: The First Encounter', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7w.jpg', release: '2009', series: 'Serious Sam', status: 'Planlandı', genres: ['FPS', 'Aksiyon'], tags: ['Co-op'] },
  { id: 6, title: 'Resident Evil 0 HD Remaster', cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2pyo.jpg', release: '2016', series: 'Resident Evil', status: 'Arşivde', genres: ['Korku', 'Bulmaca'], tags: ['Türkçe Altyazılı'] }
];

const categories = ['Tümü', 'Aksiyon', 'Korku', 'Co-op', 'Planlandı', 'Tamamlandı'];

function GameCard({ game }) {
  return <article className="game-card">
    <div className="cover-wrap"><img src={game.cover} alt={`${game.title} kapak`} loading="lazy" /><span className="status">{game.status}</span></div>
    <div className="game-body"><h3>{game.title}</h3><p>{game.series} • {game.release}</p><div className="chips">{game.genres.map(g => <span key={g}>🎮 {g}</span>)}</div><div className="tags">{game.tags.map(t => <span key={t}>{t}</span>)}</div></div>
  </article>;
}

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tümü');
  const filteredGames = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr-TR');
    return games.filter(game => {
      const text = [game.title, game.series, game.status, ...game.genres, ...game.tags].join(' ').toLocaleLowerCase('tr-TR');
      const matchSearch = !q || text.includes(q);
      const matchCategory = category === 'Tümü' || text.includes(category.toLocaleLowerCase('tr-TR'));
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return <main className="page">
    <header className="topbar"><div className="brand">🎮 Hayatımız Oyun</div><nav className="nav"><a href="#anasayfa"><Home size={16}/> Ana Sayfa</a><a href="#arsiv"><Archive size={16}/> Arşiv</a><a href="#takvim"><CalendarDays size={16}/> Takvim</a></nav></header>
    <section id="anasayfa" className="hero"><div className="badge">v{VERSION} • Arşiv Sayfası</div><h1>Hayatımız Oyun Arşiv Sistemi</h1><p>Oyun kartları artık arşiv panelinde listeleniyor. Arama, kategori filtresi ve mobil listeleme yapısı güçlendirildi.</p><div className="actions"><span><Gamepad2 size={18}/> Oyun Kartları</span><span><Search size={18}/> Arama</span><span><ListFilter size={18}/> Filtre</span><span><MonitorSmartphone size={18}/> Mobil Uyum</span><span><Trophy size={18}/> v{VERSION}</span></div></section>
    <section className="stats"><article><strong>{games.length}</strong><h2>Oyun</h2><p>Demo arşiv</p></article><article><strong>{filteredGames.length}</strong><h2>Sonuç</h2><p>Filtrelenmiş liste</p></article><article><strong>{new Set(games.map(g=>g.series)).size}</strong><h2>Seri</h2><p>Seri altyapısı</p></article><article><strong>Hazır</strong><h2>Build</h2><p>Vercel uyumlu</p></article></section>
    <section id="arsiv" className="archive-panel"><div className="section-title"><div><p>📚 v0.0.6</p><h2>Arşiv Sayfası</h2></div><label className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Oyun, seri, etiket ara..." /></label></div><div className="category-row">{categories.map(c => <button className={category===c?'active':''} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="game-grid">{filteredGames.map(game => <GameCard key={game.id} game={game}/>)}</div>{filteredGames.length===0 && <div className="empty">Sonuç bulunamadı.</div>}</section>
    <section id="takvim" className="coming"><h2>📅 v0.0.7 Hazırlığı</h2><p>Sonraki sürümde footer, iletişim alanı ve site alt bilgi düzeni eklenecek.</p></section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
