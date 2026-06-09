import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { siteConfig } from './config/site.js';
import { clearSession, createRow, deleteRow, getCurrentAppUser, getSession, isAdminRole, listTable, roleLabel, signIn, signUp, supabaseConfig, updateAppUser, updateRow } from './lib/supabaseClient.js';

const VERSION = siteConfig.version;
const PLACEHOLDER = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';

const topMenu = [
  ['🏠 Ana Sayfa', '/'],
  ['🎮 Arşiv', '/archive'],
  ['📁 Koleksiyonlar', '/collections'],
  ['🎬 Seriler', '/series'],
  ['🗓️ Yayın Takvimi', '/calendar'],
  ['🛠️ Site Durumu', '/status'],
  ['📘 Site Rehberi', '/guide'],
  ['🛡️ Yönetim Paneli', '/admin'],
  ['👤 Profil', '/profile']
];

const adminButtons = [
  ['🛡️ Panel', '/admin'],
  ['➕ Oyun Ekle', '/admin/games/new'],
  ['🎮 Oyunlar', '/admin/games'],
  ['🎬 Seriler', '/admin/series'],
  ['▶️ Bölümler', '/admin/episodes'],
  ['🗓️ Takvim', '/admin/calendar'],
  ['📝 Notlar', '/admin/notes'],
  ['🛠️ Bakım', '/admin/maintenance'],
  ['👥 Kullanıcılar', '/admin/users'],
  ['💾 Veri Sağlığı', '/admin/data-health'],
  ['👑 Yetkili Rehberi', '/admin/guide']
];

function Layout({ children }) {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  useEffect(() => { if (session?.access_token) getCurrentAppUser(session).then(r => setProfile(r.data)); }, [session?.access_token]);
  const canSeeAdmin = isAdminRole(profile?.role);
  const visibleMenu = topMenu.filter(([, href]) => href !== '/admin' || canSeeAdmin);
  return <main className="page-shell">
    <header className="site-header compact-header">
      <a className="brand compact-brand" href="/"><span className="brand-mark">HO</span><span><strong>{siteConfig.name}</strong><small>{VERSION} • Bölüm Yönetimi</small></span></a>
      <nav className="nav one-line-nav">
        {visibleMenu.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        {session?.access_token
          ? <button className="nav-danger" onClick={() => { clearSession(); location.href = '/login'; }}>🚪 Çıkış Yap</button>
          : <a className="nav-danger" href="/login">🔐 Giriş Yap</a>}
      </nav>
    </header>
    {children}
    <footer className="footer"><span>{siteConfig.releaseName}</span><span>{VERSION}</span></footer>
  </main>;
}

function useTable(table) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  async function reload() {
    setLoading(true);
    const r = await listTable(table);
    setRows(r.data || []);
    setError(r.error || '');
    setLoading(false);
  }
  useEffect(() => { reload(); }, [table]);
  return { rows, error, loading, reload };
}

function PageHero({ icon, title, text }) {
  return <section className="updates-hero"><div><span>{icon} {VERSION}</span><h1>{title}</h1><p>{text}</p></div><div className="release-target"><small>Supabase</small><strong>{supabaseConfig.isReady ? 'Hazır' : 'Bağlantı Eksik'}</strong><p>{siteConfig.releaseName}</p></div></section>;
}

function EmptyState({ title = 'Kayıt yok', text = 'Bu alan Supabase tablosundan veri bekliyor.' }) {
  return <section className="notes-card"><h2>{title}</h2><p>{text}</p><a className="ghost-btn" href="/admin">Yönetim paneline git</a></section>;
}


function useDeployInfo() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    fetch('/deploy-info.json?ts=' + Date.now())
      .then(r => r.ok ? r.json() : null)
      .then(setInfo)
      .catch(() => setInfo(null));
  }, []);
  return info;
}

function DataCard({ item, type = 'series' }) {
  const title = item.title || item.name || 'Başlıksız';
  const slug = item.slug || item.id;
  const img = item.cover_url || item.poster_url || item.logo_url || PLACEHOLDER;
  return <a className="series-card upgraded-series-card" href={`/${type}/${slug}`}>
    <div className="series-image-wrap"><img src={img} alt={title} /><span className="status-badge">{item.status || 'Aktif'}</span></div>
    <div className="series-content"><h3>{title}</h3><p>{item.description || 'Açıklama henüz eklenmedi.'}</p><div className="card-info-row"><span>{item.category_title || item.channel_title || 'Arşiv'}</span><span>{item.episodes || item.episode_count || 0} kayıt</span></div></div>
  </a>;
}

function HomePage() {
  const deployInfo = useDeployInfo();
  const games = useTable('public_games');
  const series = useTable('public_series');
  const categories = useTable('public_categories');
  const users = useTable('app_users');
  return <Layout>
    <section className="hero-card showcase-hero">
      <div className="showcase-copy"><div className="version-pill">✅ {VERSION} • Seri yönetimi merkezi</div><h1>Oyunları serilere bağlayan seri yönetimi merkezi hazırlandı.</h1><p>Yönetim panelinden seri ekle, düzenle, sil ve oyunları seriye bağla; SQL mevcut verileri sıfırlamadan eksikleri ekler.</p><div className="hero-actions"><a className="primary-btn" href="/admin">Yönetim Paneli</a><a className="ghost-btn" href="/register">Kayıt Ol</a><a className="ghost-btn" href="/status">Durumu Kontrol Et</a></div></div>
      <aside className="showcase-panel"><span>SQL Durumu</span><strong>{supabaseConfig.isReady ? 'Bağlantı hazır' : 'Vercel ortam değişkenlerini kontrol et'}</strong><p>Bu sürümde Supabase gereklidir. Seri tablosu ve oyun-seri bağlantıları güvenli migration ile güncellenir; Vercel build sırasında deploy-info.json yenilenir.</p><div className="mini-metrics"><b>{games.rows.length} oyun</b><b>{series.rows.length} seri</b><b>{users.rows.length} kullanıcı</b><b>Deploy #{deployInfo?.deployNumber || '—'}</b></div></aside>
    </section>
    <section className="beta-stats premium-stats"><article><span>{games.rows.length}</span><p>Oyun</p></article><article><span>{series.rows.length}</span><p>Seri</p></article><article><span>{categories.rows.length}</span><p>Kategori</p></article><article><span>{users.rows.length}</span><p>Kullanıcı</p></article></section>
    <Updates />
  </Layout>;
}

function ListPage({ table, icon, title, text, type }) {
  const { rows, loading, error } = useTable(table);
  return <Layout><PageHero icon={icon} title={title} text={text} />{error ? <p className="form-message error">{error}</p> : null}{loading ? <p>Yükleniyor...</p> : rows.length ? <section className="series-section"><div className="series-grid premium-series-grid">{rows.map(x => <DataCard key={x.id} item={x} type={type} />)}</div></section> : <EmptyState title={`${title} kaydı yok`} text="SQL temiz başlangıç yaptığı için kayıtlar yönetim panelinden eklenecek." />}</Layout>;
}

function SimplePage({ title, icon, text }) { return <Layout><PageHero icon={icon} title={title} text={text} /><EmptyState title="İskelet hazır" text="Bu sayfa route olarak kuruldu. İçerik sonraki sürümlerde Supabase tablosuyla doldurulacak." /></Layout>; }

function AuthPage({ mode }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const r = mode === 'register' ? await signUp(email.trim(), password) : await signIn(email.trim(), password);
    setLoading(false);
    if (r.error) return setMessage(r.error);
    if (mode === 'register') {
      if (r.data?.session) {
        setMessage('Başarı: kayıt oluşturuldu, profil kaydı açıldı ve oturum başlatıldı. Admin panele yönlendiriliyorsun.');
        setTimeout(() => location.href = '/admin', 700);
      } else {
        setMessage(r.notice || 'Başarı: kayıt Supabase Auth içine düştü. Giriş için mail onayı gerekebilir.');
      }
      return;
    }
    setMessage('Başarı: giriş yapıldı, app_users profil kaydı kontrol edildi.');
    setTimeout(() => location.href = '/admin', 600);
  }
  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🔐 {VERSION} • Kayıt ve giriş</div><h1>{mode === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}</h1><p>v1.2.3 ile seri yönetimi ve güvenli SQL migration eklendi.</p></div><section className="status-grid"><article className="status-check-card"><strong>Supabase Bağlantısı</strong><p>{supabaseConfig.isReady ? 'Hazır' : 'Eksik: Vercel ortam değişkenleri ve yeniden dağıtım gerekli.'}</p></article><article className="status-check-card"><strong>E-posta Onayı</strong><p>Test için Supabase Auth → Providers → Email bölümünde e-posta onayı test aşamasında kapalı olmalı.</p></article><article className="status-check-card"><strong>Profil Kaydı</strong><p>schema.sql içindeki trigger app_users profilini otomatik açar.</p></article></section><form className="admin-card login-card" onSubmit={submit}><h2>{mode === 'register' ? 'Yeni hesap' : 'Hesaba giriş'}</h2><label>E-posta<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Şifre<input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required /></label><button className="primary-btn" disabled={loading}>{loading ? 'İşleniyor...' : mode === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}</button>{message ? <p className={message.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{message}</p> : null}<div className="hero-actions"><a className="ghost-btn" href={mode === 'register' ? '/login' : '/register'}>{mode === 'register' ? 'Girişe geç' : 'Kayıt ol'}</a><a className="ghost-btn" href="/status">Durumu kontrol et</a></div></form></section></Layout>;
}

function AdminNav() { return <div className="admin-button-bar single-row-admin">{adminButtons.map(([label, href]) => <a key={href} className="ghost-btn admin-mini-btn" href={href}>{label}</a>)}</div>; }
function AdminPage() {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!session?.access_token) { setLoading(false); return; }
    getCurrentAppUser(session).then(r => { setProfile(r.data); setError(r.error || ''); setLoading(false); });
  }, [session?.access_token]);
  if (!session?.access_token) return <AuthPage mode="login" />;
  if (loading) return <Layout><section className="admin-shell"><p>Yetki kontrol ediliyor...</p></section></Layout>;
  if (!isAdminRole(profile?.role)) return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👤 {VERSION} • Normal Kullanıcı</div><h1>Yönetim paneli sadece yetkililere açıktır.</h1><p>Hesabın normal kullanıcı rolünde görünüyor. Bu yüzden yönetim paneli menüde gösterilmez ve bu alana giriş kapalıdır.</p></div><section className="notes-card"><h2>Hesap Bilgisi</h2><p>Rol: <strong>{roleLabel(profile?.role)}</strong></p><p>{error || 'Yetkili olmak için kurucu hesabından rol verilmesi gerekir.'}</p><a className="primary-btn" href="/profile">Profile Git</a></section></section></Layout>;
  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🛡️ {VERSION} • Yönetim Paneli</div><h1>Yetkili yönetim paneli hazır.</h1><p>v1.2.3 ile bölüm yönetimi merkezi aktif edildi; SQL mevcut verileri sıfırlamaz.</p></div><AdminNav /><AdminQuickManager session={session} /></section></Layout>;
}

function AdminQuickManager({ session }) {
  const empty = {
    slug: '',
    title: '',
    description: '',
    status: 'Planlandı',
    category_slug: '',
    category_title: '',
    channel_slug: '',
    channel_title: '',
    series_slug: '',
    series_title: '',
    release_date: '',
    cover_url: '',
    banner_url: '',
    logo_url: '',
    media_note: '',
    sort_order: 100,
    is_public: true
  };
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const r = await listTable('public_games', session);
    setRows(r.data || []);
    setMsg(r.error || `Başarı: ${r.data?.length || 0} oyun yüklendi.`);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  function set(k, v) { setForm(x => ({ ...x, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    const slug = (form.slug || form.title).trim().toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9-]/g, '');
    const payload = { ...form, slug, sort_order: Number(form.sort_order) || 100, release_date: form.release_date || null };
    const r = edit ? await updateRow('public_games', edit, payload, session) : await createRow('public_games', payload, session);
    if (r.error) return setMsg(r.error);
    setMsg(edit ? 'Başarı: oyun güncellendi.' : 'Başarı: oyun eklendi.');
    setEdit(null); setForm(empty); load();
  }

  async function del(row) {
    if (!confirm(`${row.title} silinsin mi?`)) return;
    const r = await deleteRow('public_games', row.id, session);
    setMsg(r.error || 'Başarı: oyun silindi.');
    load();
  }

  return <section className="admin-grid"><form className="admin-card login-card" onSubmit={submit}><h2>🎮 Oyun Yönetimi</h2><p>v1.2.3 ile kapak, banner ve logo medya alanları eklendi. Bu sürümde URL alanları kullanılır; dosya yükleme sonraki sürüme bırakıldı.</p>
    <div className="form-two-col"><label>Oyun Adı<input value={form.title} onChange={e => set('title', e.target.value)} required /></label><label>Slug<input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="boş kalırsa otomatik" /></label></div>
    <label>Açıklama<textarea rows="3" value={form.description} onChange={e => set('description', e.target.value)} /></label>
    <div className="form-two-col"><label>Kategori Başlığı<input value={form.category_title} onChange={e => set('category_title', e.target.value)} placeholder="Korku" /></label><label>Kategori Slug<input value={form.category_slug} onChange={e => set('category_slug', e.target.value)} placeholder="korku" /></label></div>
    <div className="form-two-col"><label>Kanal Başlığı<input value={form.channel_title} onChange={e => set('channel_title', e.target.value)} placeholder="Hayatımız Oyun" /></label><label>Kanal Slug<input value={form.channel_slug} onChange={e => set('channel_slug', e.target.value)} placeholder="hayatimiz-oyun" /></label></div>
    <div className="form-two-col"><label>Seri Başlığı<input value={form.series_title} onChange={e => set('series_title', e.target.value)} /></label><label>Seri Slug<input value={form.series_slug} onChange={e => set('series_slug', e.target.value)} /></label></div>
    <div className="form-two-col"><label>Durum<select value={form.status} onChange={e => set('status', e.target.value)}><option>Planlandı</option><option>Devam Ediyor</option><option>Tamamlandı</option><option>Gizli</option></select></label><label>Yayın Tarihi<input type="date" value={form.release_date || ''} onChange={e => set('release_date', e.target.value)} /></label></div>
    <label>Kapak URL<input value={form.cover_url} onChange={e => set('cover_url', e.target.value)} placeholder="https://..." /></label>
    <label>Banner URL<input value={form.banner_url} onChange={e => set('banner_url', e.target.value)} placeholder="https://..." /></label>
    <label>Logo URL<input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." /></label>
    <label>Medya Notu<textarea rows="2" value={form.media_note} onChange={e => set('media_note', e.target.value)} placeholder="Kapak/banner hakkında kısa not" /></label>
    <div className="media-preview-grid">
      <article><strong>Kapak Önizleme</strong><img src={form.cover_url || PLACEHOLDER} alt="Kapak önizleme" /></article>
      <article><strong>Banner Önizleme</strong><img src={form.banner_url || PLACEHOLDER} alt="Banner önizleme" /></article>
      <article><strong>Logo Önizleme</strong><img src={form.logo_url || PLACEHOLDER} alt="Logo önizleme" /></article>
    </div>
    <div className="form-two-col"><label>Sıra<input type="number" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} /></label><label className="inline-check"><input type="checkbox" checked={form.is_public} onChange={e => set('is_public', e.target.checked)} /> Public görünsün</label></div>
    <button className="primary-btn">{edit ? 'Oyunu Güncelle' : 'Oyunu Ekle'}</button>{msg ? <p className={msg.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{msg}</p> : null}</form>
    <div className="admin-card admin-table-card"><h2>Oyun Listesi</h2><button className="ghost-btn" onClick={load}>{loading ? 'Yükleniyor...' : 'Yenile'}</button><table className="admin-table"><thead><tr><th>Oyun</th><th>Kategori</th><th>Durum</th><th>İşlemler</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.title}</strong><small>{r.slug}</small></td><td>{r.category_title || '—'}</td><td>{r.status}</td><td><button onClick={() => { setEdit(r.id); setForm({ ...empty, ...r, release_date: r.release_date || '' }); }}>Düzenle</button><button onClick={() => del(r)}>Sil</button></td></tr>)}{!rows.length ? <tr><td colSpan="4">Henüz oyun yok.</td></tr> : null}</tbody></table></div></section>;
}


function AdminSeriesPage() {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [rows, setRows] = useState([]);
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const empty = {
    title: '', slug: '', description: '', category_title: '', category_slug: '', channel_title: '', channel_slug: '',
    status: 'Devam Ediyor', cover_url: '', banner_url: '', logo_url: '', game_count: 0, episode_count: 0,
    sort_order: 100, is_public: true
  };
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);

  useEffect(() => { if (session?.access_token) getCurrentAppUser(session).then(r => { setProfile(r.data); setLoadingProfile(false); }); else setLoadingProfile(false); }, [session?.access_token]);

  async function load() {
    setLoading(true);
    const [seriesRes, gameRes] = await Promise.all([listTable('public_series', session), listTable('public_games', session)]);
    setRows(seriesRes.data || []);
    setGames(gameRes.data || []);
    setMsg(seriesRes.error || gameRes.error || `Başarı: ${(seriesRes.data || []).length} seri yüklendi.`);
    setLoading(false);
  }
  useEffect(() => { if (session?.access_token) load(); }, [session?.access_token]);
  function set(k, v) { setForm(x => ({ ...x, [k]: v })); }
  function makeSlug(value) { return String(value || '').trim().toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9-]/g, ''); }

  async function submit(e) {
    e.preventDefault();
    const slug = makeSlug(form.slug || form.title);
    const payload = {
      ...form,
      slug,
      game_count: Number(form.game_count) || games.filter(g => g.series_slug === slug).length,
      episode_count: Number(form.episode_count) || 0,
      sort_order: Number(form.sort_order) || 100
    };
    const r = edit ? await updateRow('public_series', edit, payload, session) : await createRow('public_series', payload, session);
    if (r.error) return setMsg(r.error);
    setMsg(edit ? 'Başarı: seri güncellendi.' : 'Başarı: seri eklendi.');
    setEdit(null); setForm(empty); load();
  }

  async function del(row) {
    if (!confirm(`${row.title || row.name} serisi silinsin mi? Oyun kayıtları silinmez.`)) return;
    const r = await deleteRow('public_series', row.id, session);
    setMsg(r.error || 'Başarı: seri silindi. Oyun kayıtları korunur.');
    load();
  }

  async function attachGame(game, series) {
    const payload = { series_slug: series.slug, series_title: series.title || series.name || '' };
    const r = await updateRow('public_games', game.id, payload, session);
    setMsg(r.error || `Başarı: ${game.title} oyunu ${series.title || series.name} serisine bağlandı.`);
    load();
  }

  if (!session?.access_token) return <AuthPage mode="login" />;
  if (loadingProfile) return <Layout><section className="admin-shell"><p>Yetki kontrol ediliyor...</p></section></Layout>;
  if (!isAdminRole(profile?.role)) return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👤 {VERSION}</div><h1>Bu alan sadece yetkililere açıktır.</h1><p>Normal kullanıcı hesabıyla seri yönetimi açılamaz.</p></div></section></Layout>;

  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🎬 {VERSION} • Seri Yönetimi</div><h1>Seri Yönetimi Merkezi</h1><p>Seri ekle, düzenle, sil ve oyunları seçili seriye bağla. SQL veri sıfırlamaz.</p></div><AdminNav />
    <section className="admin-grid"><form className="admin-card login-card" onSubmit={submit}><h2>{edit ? 'Seri Düzenle' : 'Seri Ekle'}</h2>
      <div className="form-two-col"><label>Seri Adı<input value={form.title} onChange={e => set('title', e.target.value)} required /></label><label>Slug<input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="boş kalırsa otomatik" /></label></div>
      <label>Açıklama<textarea rows="3" value={form.description} onChange={e => set('description', e.target.value)} /></label>
      <div className="form-two-col"><label>Kategori Başlığı<input value={form.category_title} onChange={e => set('category_title', e.target.value)} placeholder="Korku" /></label><label>Kategori Slug<input value={form.category_slug} onChange={e => set('category_slug', e.target.value)} placeholder="korku" /></label></div>
      <div className="form-two-col"><label>Kanal Başlığı<input value={form.channel_title} onChange={e => set('channel_title', e.target.value)} placeholder="Hayatımız Oyun" /></label><label>Kanal Slug<input value={form.channel_slug} onChange={e => set('channel_slug', e.target.value)} placeholder="hayatimiz-oyun" /></label></div>
      <div className="form-two-col"><label>Durum<select value={form.status} onChange={e => set('status', e.target.value)}><option>Devam Ediyor</option><option>Tamamlandı</option><option>Planlandı</option><option>Gizli</option></select></label><label>Sıra<input type="number" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} /></label></div>
      <label>Kapak URL<input value={form.cover_url} onChange={e => set('cover_url', e.target.value)} placeholder="https://..." /></label>
      <label>Banner URL<input value={form.banner_url} onChange={e => set('banner_url', e.target.value)} placeholder="https://..." /></label>
      <label>Logo URL<input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." /></label>
      <div className="media-preview-grid"><article><strong>Kapak</strong><img src={form.cover_url || PLACEHOLDER} alt="Kapak" /></article><article><strong>Banner</strong><img src={form.banner_url || PLACEHOLDER} alt="Banner" /></article><article><strong>Logo</strong><img src={form.logo_url || PLACEHOLDER} alt="Logo" /></article></div>
      <div className="form-two-col"><label>Oyun Sayısı<input type="number" value={form.game_count} onChange={e => set('game_count', e.target.value)} /></label><label>Bölüm Sayısı<input type="number" value={form.episode_count} onChange={e => set('episode_count', e.target.value)} /></label></div>
      <label className="inline-check"><input type="checkbox" checked={form.is_public} onChange={e => set('is_public', e.target.checked)} /> Public görünsün</label>
      <button className="primary-btn">{edit ? 'Seriyi Güncelle' : 'Seriyi Ekle'}</button>{msg ? <p className={msg.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{msg}</p> : null}</form>
      <div className="admin-card admin-table-card"><h2>Seri Listesi</h2><button className="ghost-btn" onClick={load}>{loading ? 'Yükleniyor...' : 'Yenile'}</button><table className="admin-table"><thead><tr><th>Seri</th><th>Kategori</th><th>Durum</th><th>İşlemler</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.title || r.name}</strong><small>{r.slug}</small></td><td>{r.category_title || '—'}</td><td>{r.status}</td><td><button onClick={() => { setEdit(r.id); setForm({ ...empty, ...r, title: r.title || r.name || '' }); }}>Düzenle</button><button onClick={() => del(r)}>Sil</button></td></tr>)}{!rows.length ? <tr><td colSpan="4">Henüz seri yok.</td></tr> : null}</tbody></table></div></section>
    <section className="admin-card admin-table-card"><h2>Oyunları Seriye Bağla</h2><p>Oyun kaydı silinmez. Sadece seçtiğin oyunun seri bilgisi güncellenir.</p><table className="admin-table"><thead><tr><th>Oyun</th><th>Mevcut Seri</th><th>Seriye Bağla</th></tr></thead><tbody>{games.map(g => <tr key={g.id}><td><strong>{g.title}</strong><small>{g.slug}</small></td><td>{g.series_title || 'Bağlı değil'}</td><td><div className="user-actions">{rows.map(s => <button key={s.id} onClick={() => attachGame(g, s)}>{s.title || s.name}</button>)}</div></td></tr>)}{!games.length ? <tr><td colSpan="3">Önce oyun ekle.</td></tr> : null}</tbody></table></section>
  </section></Layout>;
}

function AdminEpisodesPage() {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [games, setGames] = useState([]);
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const empty = { game_slug: '', game_title: '', series_slug: '', series_title: '', title: '', episode_no: 1, youtube_url: '', thumbnail_url: '', duration: '', status: 'Taslak', published_at: '', sort_order: 100, is_public: true };
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);

  useEffect(() => { if (session?.access_token) getCurrentAppUser(session).then(r => { setProfile(r.data); setLoadingProfile(false); }); else setLoadingProfile(false); }, [session?.access_token]);

  async function load() {
    setLoading(true);
    const [episodeRes, gameRes] = await Promise.all([listTable('public_episodes', session, 'sort_order.asc'), listTable('public_games', session)]);
    setRows(episodeRes.data || []);
    setGames(gameRes.data || []);
    setMsg(episodeRes.error || gameRes.error || `Başarı: ${(episodeRes.data || []).length} bölüm yüklendi.`);
    setLoading(false);
  }
  useEffect(() => { if (session?.access_token) load(); }, [session?.access_token]);
  function set(k, v) { setForm(x => ({ ...x, [k]: v })); }
  function pickGame(slug) {
    const game = games.find(g => g.slug === slug);
    setForm(x => ({ ...x, game_slug: slug, game_title: game?.title || '', series_slug: game?.series_slug || x.series_slug || '', series_title: game?.series_title || x.series_title || '' }));
  }
  async function submit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      episode_no: Number(form.episode_no) || 1,
      sort_order: Number(form.sort_order) || Number(form.episode_no) || 100,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null
    };
    const r = edit ? await updateRow('public_episodes', edit, payload, session) : await createRow('public_episodes', payload, session);
    if (r.error) return setMsg(r.error);
    setMsg(edit ? 'Başarı: bölüm güncellendi.' : 'Başarı: bölüm eklendi.');
    setEdit(null); setForm(empty); load();
  }
  async function del(row) {
    if (!confirm(`${row.title} bölümü silinsin mi?`)) return;
    const r = await deleteRow('public_episodes', row.id, session);
    setMsg(r.error || 'Başarı: bölüm silindi.');
    load();
  }
  async function quickStatus(row, status) {
    const r = await updateRow('public_episodes', row.id, { status, is_public: status === 'Yayında' ? true : row.is_public }, session);
    setMsg(r.error || `Başarı: bölüm ${status} durumuna alındı.`);
    load();
  }

  if (!session?.access_token) return <AuthPage mode="login" />;
  if (loadingProfile) return <Layout><section className="admin-shell"><p>Yetki kontrol ediliyor...</p></section></Layout>;
  if (!isAdminRole(profile?.role)) return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👤 {VERSION}</div><h1>Bu alan sadece yetkililere açıktır.</h1><p>Normal kullanıcı hesabıyla bölüm yönetimi açılamaz.</p></div></section></Layout>;

  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">▶️ {VERSION} • Bölüm Yönetimi</div><h1>Seri Yönetimi Merkezi</h1><p>Oyunlara bağlı bölüm ekle, YouTube bağlantısı gir, yayın durumunu ve bölüm sırasını yönet.</p></div><AdminNav />
    <section className="admin-grid"><form className="admin-card login-card" onSubmit={submit}><h2>{edit ? 'Bölüm Düzenle' : 'Bölüm Ekle'}</h2>
      <div className="form-two-col"><label>Oyun<select value={form.game_slug} onChange={e => pickGame(e.target.value)}><option value="">Oyun seç</option>{games.map(g => <option key={g.id} value={g.slug}>{g.title}</option>)}</select></label><label>Oyun Başlığı<input value={form.game_title} onChange={e => set('game_title', e.target.value)} placeholder="Oyun adı" /></label></div>
      <div className="form-two-col"><label>Seri Slug<input value={form.series_slug} onChange={e => set('series_slug', e.target.value)} /></label><label>Seri Başlığı<input value={form.series_title} onChange={e => set('series_title', e.target.value)} /></label></div>
      <div className="form-two-col"><label>Bölüm No<input type="number" min="1" value={form.episode_no} onChange={e => set('episode_no', e.target.value)} required /></label><label>Bölüm Başlığı<input value={form.title} onChange={e => set('title', e.target.value)} required /></label></div>
      <label>YouTube URL<input value={form.youtube_url} onChange={e => set('youtube_url', e.target.value)} placeholder="https://youtube.com/watch?v=..." /></label>
      <label>Thumbnail URL<input value={form.thumbnail_url} onChange={e => set('thumbnail_url', e.target.value)} placeholder="https://..." /></label>
      <div className="form-two-col"><label>Yayın Tarihi/Saati<input type="datetime-local" value={form.published_at || ''} onChange={e => set('published_at', e.target.value)} /></label><label>Süre<input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="01:25:30" /></label></div>
      <div className="form-two-col"><label>Durum<select value={form.status} onChange={e => set('status', e.target.value)}><option>Taslak</option><option>Yayında</option><option>Planlandı</option><option>Gizli</option></select></label><label>Sıra<input type="number" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} /></label></div>
      <label className="inline-check"><input type="checkbox" checked={form.is_public} onChange={e => set('is_public', e.target.checked)} /> Public görünsün</label>
      <button className="primary-btn">{edit ? 'Bölümü Güncelle' : 'Bölümü Ekle'}</button>{msg ? <p className={msg.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{msg}</p> : null}</form>
      <div className="admin-card admin-table-card"><h2>Bölüm Listesi</h2><button className="ghost-btn" onClick={load}>{loading ? 'Yükleniyor...' : 'Yenile'}</button><table className="admin-table"><thead><tr><th>Bölüm</th><th>Oyun</th><th>Durum</th><th>İşlemler</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.episode_no}. {r.title}</strong><small>{r.youtube_url || 'YouTube URL yok'}</small></td><td>{r.game_title || r.game_slug || '—'}</td><td>{r.status}</td><td><button onClick={() => { setEdit(r.id); setForm({ ...empty, ...r, published_at: r.published_at ? String(r.published_at).slice(0,16) : '' }); }}>Düzenle</button><button onClick={() => quickStatus(r, 'Yayında')}>Yayına Al</button><button onClick={() => quickStatus(r, 'Taslak')}>Taslak Yap</button><button onClick={() => del(r)}>Sil</button></td></tr>)}{!rows.length ? <tr><td colSpan="4">Henüz bölüm yok.</td></tr> : null}</tbody></table></div></section>
  </section></Layout>;
}

function AdminUsersPage() {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.access_token) getCurrentAppUser(session).then(r => { setProfile(r.data); setLoadingProfile(false); });
    else setLoadingProfile(false);
  }, [session?.access_token]);

  async function loadUsers() {
    setLoading(true);
    const r = await listTable('app_users', session);
    setRows(r.data || []);
    setMsg(r.error || `Başarı: ${r.data?.length || 0} kullanıcı yüklendi.`);
    setLoading(false);
  }

  useEffect(() => { if (session?.access_token) loadUsers(); }, [session?.access_token]);

  if (!session?.access_token) return <AuthPage mode="login" />;
  if (loadingProfile) return <Layout><section className="admin-shell"><p>Yetki kontrol ediliyor...</p></section></Layout>;
  if (!isAdminRole(profile?.role)) return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👤 {VERSION}</div><h1>Bu alan sadece yetkililere açıktır.</h1><p>Normal kullanıcı hesabıyla kullanıcı yönetimi açılamaz.</p></div></section></Layout>;

  const filtered = rows.filter(user => {
    const text = `${user.email || ''} ${user.display_name || ''} ${user.role || ''}`.toLowerCase();
    const q = query.trim().toLowerCase();
    const roleOk = roleFilter === 'all' || String(user.role || 'user').toLowerCase() === roleFilter;
    return (!q || text.includes(q)) && roleOk;
  });

  const stats = {
    total: rows.length,
    staff: rows.filter(x => isAdminRole(x.role)).length,
    banned: rows.filter(x => x.is_banned || x.status === 'banned').length,
    users: rows.filter(x => !isAdminRole(x.role)).length
  };

  async function changeRole(user, role) {
    if (!confirm(`${user.email} hesabı ${roleLabel(role)} yapılsın mı?`)) return;
    const r = await updateAppUser(user.id, { role, status: user.status === 'banned' ? 'banned' : 'active' }, session);
    setMsg(r.error || `Başarı: ${user.email} rolü ${roleLabel(role)} olarak güncellendi.`);
    loadUsers();
  }

  async function setBan(user, banned) {
    const reason = banned ? prompt('Ban sebebi yaz:', user.ban_reason || 'Yetkili tarafından banlandı.') || 'Yetkili tarafından banlandı.' : '';
    const r = await updateAppUser(user.id, { is_banned: banned, ban_reason: reason, status: banned ? 'banned' : 'active' }, session);
    setMsg(r.error || (banned ? `Başarı: ${user.email} banlandı.` : `Başarı: ${user.email} banı kaldırıldı.`));
    loadUsers();
  }

  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👥 {VERSION} • Kullanıcılar ve Yetkiler</div><h1>Kullanıcılar ve Yetkiler Merkezi</h1><p>Rol verme, kullanıcı arama, banlama ve ban kaldırma işlemleri buradan yapılır.</p></div><AdminNav />
    <section className="beta-stats premium-stats"><article><span>{stats.total}</span><p>Toplam Kullanıcı</p></article><article><span>{stats.staff}</span><p>Yetkili</p></article><article><span>{stats.users}</span><p>Normal Kullanıcı</p></article><article><span>{stats.banned}</span><p>Banlı</p></article></section>
    <section className="admin-card user-toolbar"><label>Arama<input value={query} onChange={e => setQuery(e.target.value)} placeholder="E-posta, isim veya rol ara" /></label><label>Rol Filtresi<select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}><option value="all">Tümü</option><option value="founder">Kurucu</option><option value="admin">Yönetici</option><option value="editor">Editör</option><option value="moderator">Moderatör</option><option value="user">Kullanıcı</option></select></label><button className="ghost-btn" onClick={loadUsers}>{loading ? 'Yükleniyor...' : 'Yenile'}</button></section>
    {msg ? <p className={msg.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{msg}</p> : null}
    <section className="admin-card admin-table-card"><h2>Kullanıcı Listesi</h2><table className="admin-table users-table"><thead><tr><th>Kullanıcı</th><th>Rol</th><th>Durum</th><th>Yetki Komutları</th></tr></thead><tbody>{filtered.map(user => <tr key={user.id}><td><strong>{user.display_name || user.email}</strong><small>{user.email}</small></td><td><span className="role-badge">{roleLabel(user.role)}</span></td><td>{user.is_banned || user.status === 'banned' ? <span className="status-badge danger">Banlı</span> : <span className="status-badge ok">Aktif</span>}<small>{user.ban_reason || ''}</small></td><td><div className="user-actions"><button onClick={() => changeRole(user, 'founder')}>👑 Kurucu Yap</button><button onClick={() => changeRole(user, 'admin')}>🛡️ Yönetici Yap</button><button onClick={() => changeRole(user, 'editor')}>✍️ Editör Yap</button><button onClick={() => changeRole(user, 'moderator')}>👮 Moderatör Yap</button><button onClick={() => changeRole(user, 'user')}>👤 Kullanıcı Yap</button>{user.is_banned || user.status === 'banned' ? <button onClick={() => setBan(user, false)}>✅ Ban Kaldır</button> : <button onClick={() => setBan(user, true)}>🚫 Banla</button>}</div></td></tr>)}{!filtered.length ? <tr><td colSpan="4">Kullanıcı bulunamadı.</td></tr> : null}</tbody></table></section>
  </section></Layout>;
}

function AdminPlaceholder({ title }) {
  const session = getSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (session?.access_token) getCurrentAppUser(session).then(r => { setProfile(r.data); setLoading(false); }); else setLoading(false); }, [session?.access_token]);
  if (!session?.access_token) return <AuthPage mode="login" />;
  if (loading) return <Layout><section className="admin-shell"><p>Yetki kontrol ediliyor...</p></section></Layout>;
  if (!isAdminRole(profile?.role)) return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">👤 {VERSION}</div><h1>Bu alan sadece yetkililere açıktır.</h1><p>Normal kullanıcı hesabıyla yönetim sayfaları açılmaz.</p></div><a className="primary-btn" href="/profile">Profile Git</a></section></Layout>;
  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🚧 {VERSION}</div><h1>{title}</h1><p>Sayfa yolu kuruldu. İçeriği sonraki sürümlerde doldurulacak.</p></div><AdminNav /><EmptyState title="İskelet hazır" text="Bu buton artık hata vermiyor. İç sistem sonraki sürümde eklenecek." /></section></Layout>;
}
function Updates() { return <section className="notes-card"><h2>📌 {VERSION} Tamamlananlar</h2><ul><li>✅ Seri Yönetimi Merkezi eklendi.</li><li>✅ Admin panelden seri ekleme/düzenleme/silme aktif edildi.</li><li>✅ Oyunları seriye bağlama alanı eklendi.</li><li>✅ Seri kapak, banner, logo ve istatistik alanları eklendi.</li><li>✅ public_series tablosu güvenli migration ile genişletildi.</li><li>✅ Vercel/GitHub sürüm etiketi v1.2.3 olarak güncellendi.</li><li>🟢 Supabase gerekli: schema.sql tekrar çalıştırılmalı.</li></ul></section>; }
function UpdatesPage() { return <Layout><PageHero icon="📝" title="Güncellemeler" text="v1.2.3 tamamlananlar ve sıradaki plan." /><Updates /><section className="next-card"><h2>➡️ Sonraki Plan: v1.2.4 Kanal Yönetimi Gelişmiş</h2><p>Kanal ekleme/düzenleme, kanal-seri bağlantısı ve kanal medya alanları geliştirilecek.</p></section></Layout>; }
function StatusPage() { return <Layout><PageHero icon="✅" title="Site Durumu" text="Seri yönetimi merkezi migration kontrol paneli." /><section className="status-grid"><article className="status-check-card"><strong>Supabase gerekli</strong><p>{supabaseConfig.isReady ? 'Bağlantı hazır görünüyor.' : 'Bağlantı eksik veya Vercel yeniden dağıtım yapılmadı.'}</p></article><article className="status-check-card"><strong>SQL Sonucu</strong><p>Supabase Results kısmında <strong>v1.2.3 başarıyla çalıştı</strong> yazmalı. Bu SQL veri sıfırlamaz; sadece eksik seri kolonlarını ekler.</p></article><article className="status-check-card"><strong>Seri Tablosu</strong><p>public_series tablosuna medya, kategori, kanal, oyun sayısı, bölüm sayısı ve sıra alanları eklenir.</p></article><article className="status-check-card"><strong>Veri Koruma</strong><p>DROP TABLE / TRUNCATE yoktur. Mevcut kullanıcı, oyun, kategori, kanal, seri ve bölüm verileri korunur.</p></article></section></Layout>; }
function NotFoundPage() { return <Layout><section className="hero-card"><div className="version-pill">404 • {VERSION}</div><h1>Sayfa hazır değil.</h1><p>Bu route henüz planlanmadı veya yanlış yazıldı.</p><div className="hero-actions"><a className="primary-btn" href="/">Ana Sayfa</a><a className="ghost-btn" href="/admin">Admin</a></div></section></Layout>; }

function AppRouter() {
  const p = location.pathname.replace(/\/$/, '') || '/';
  if (p === '/') return <HomePage />;
  if (p === '/archive') return <ListPage table="public_games" icon="🎮" title="Arşiv" text="Oyun arşivi Supabase public_games tablosundan gelir." type="games" />;
  if (p === '/collections' || p === '/categories') return <ListPage table="public_categories" icon="📁" title="Koleksiyonlar" text="Fotoğraftaki üst menüye uygun koleksiyon/kategori merkezi." type="collections" />;
  if (p === '/series') return <ListPage table="public_series" icon="🎬" title="Seriler" text="Seriler Supabase public_series tablosundan gelir." type="series" />;
  if (p === '/channels') return <ListPage table="public_channels" icon="📺" title="Kanallar" text="Kanallar Supabase public_channels tablosundan gelir." type="channels" />;
  if (p === '/calendar') return <SimplePage title="Yayın Takvimi" icon="🗓️" text="Takvim tablosu kuruldu. İç ekran sonraki sürümde doldurulacak." />;
  if (p === '/guide') return <SimplePage title="Site Rehberi" icon="📘" text="Rehber route iskeleti hazır." />;
  if (p === '/profile') return <SimplePage title="Profil" icon="👤" text="Profil tablosu app_users ile hazırlandı. Profil ekranı sonraki sürümde doldurulacak." />;
  if (p === '/updates') return <UpdatesPage />;
  if (p === '/status') return <StatusPage />;
  if (p === '/login') return <AuthPage mode="login" />;
  if (p === '/register') return <AuthPage mode="register" />;
  if (p === '/admin') return <AdminPage />;
  if (p === '/admin/users') return <AdminUsersPage />;
  if (p === '/admin/series') return <AdminSeriesPage />;
  if (p === '/admin/episodes') return <AdminEpisodesPage />;
  if (p === '/admin/games' || p === '/admin/games/new') return <AdminPage />;
  if (p.startsWith('/admin/')) return <AdminPlaceholder title={adminButtons.find(x => x[1] === p)?.[0] || 'Yönetim Alanı'} />;
  return <NotFoundPage />;
}

createRoot(document.getElementById('root')).render(<AppRouter />);
