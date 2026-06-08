import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { siteConfig } from './config/site.js';
import { clearSession, createRow, deleteRow, getSession, listTable, signIn, signUp, supabaseConfig, updateRow } from './lib/supabaseClient.js';

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
  return <main className="page-shell">
    <header className="site-header compact-header">
      <a className="brand compact-brand" href="/"><span className="brand-mark">HO</span><span><strong>{siteConfig.name}</strong><small>{VERSION} • Tek Kurucu • Yetkili Sistem</small></span></a>
      <nav className="nav one-line-nav">
        {topMenu.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
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
  return <section className="updates-hero"><div><span>{icon} {VERSION}</span><h1>{title}</h1><p>{text}</p></div><div className="release-target"><small>Supabase</small><strong>{supabaseConfig.isReady ? 'Hazır' : 'Env Eksik'}</strong><p>{siteConfig.releaseName}</p></div></section>;
}

function EmptyState({ title = 'Kayıt yok', text = 'Bu alan Supabase tablosundan veri bekliyor.' }) {
  return <section className="notes-card"><h2>{title}</h2><p>{text}</p><a className="ghost-btn" href="/admin">Yönetim paneline git</a></section>;
}

function DataCard({ item, type = 'series' }) {
  const title = item.title || item.name || 'Başlıksız';
  const slug = item.slug || item.id;
  const img = item.cover_url || item.poster_url || PLACEHOLDER;
  return <a className="series-card upgraded-series-card" href={`/${type}/${slug}`}>
    <div className="series-image-wrap"><img src={img} alt={title} /><span className="status-badge">{item.status || 'Aktif'}</span></div>
    <div className="series-content"><h3>{title}</h3><p>{item.description || 'Açıklama henüz eklenmedi.'}</p><div className="card-info-row"><span>{item.category_title || item.channel_title || 'Arşiv'}</span><span>{item.episodes || item.episode_count || 0} kayıt</span></div></div>
  </a>;
}

function HomePage() {
  const games = useTable('public_games');
  const series = useTable('public_series');
  const categories = useTable('public_categories');
  const users = useTable('app_users');
  return <Layout>
    <section className="hero-card showcase-hero">
      <div className="showcase-copy"><div className="version-pill">✅ {VERSION} • Auth stabilizasyon ve profil kayıt fix</div><h1>Supabase Auth kayıt/giriş akışı düzeltildi.</h1><p>Kayıt olan kullanıcı Auth içine düşer; girişte app_users profili otomatik oluşturulur/kontrol edilir.</p><div className="hero-actions"><a className="primary-btn" href="/admin">Yönetim Paneli</a><a className="ghost-btn" href="/register">Kayıt Ol</a><a className="ghost-btn" href="/status">Durumu Kontrol Et</a></div></div>
      <aside className="showcase-panel"><span>SQL Durumu</span><strong>{supabaseConfig.isReady ? 'Env hazır' : 'Vercel env kontrol et'}</strong><p>Bu sürümde Supabase gereklidir. schema.sql tabloları sıfırlar.</p><div className="mini-metrics"><b>{games.rows.length} oyun</b><b>{series.rows.length} seri</b><b>{users.rows.length} kullanıcı</b></div></aside>
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
  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🔐 {VERSION} • Auth Fix</div><h1>{mode === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}</h1><p>v1.1.5 ile kayıt/giriş akışı düzeltildi. Kayıt olan kullanıcı Supabase Auth içine düşer; girişte app_users profili otomatik kontrol edilir.</p></div><section className="status-grid"><article className="status-check-card"><strong>Supabase Env</strong><p>{supabaseConfig.isReady ? 'Hazır' : 'Eksik: Vercel env + Redeploy gerekli.'}</p></article><article className="status-check-card"><strong>Email Confirm Fix</strong><p>Bu fix paketindeki schema.sql çalıştırılınca onaysız kullanıcılar otomatik onaylanır.</p></article><article className="status-check-card"><strong>Profil Kaydı</strong><p>schema.sql içindeki trigger app_users profilini otomatik açar.</p></article></section><form className="admin-card login-card" onSubmit={submit}><h2>{mode === 'register' ? 'Yeni hesap' : 'Hesaba giriş'}</h2><label>E-posta<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Şifre<input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required /></label><button className="primary-btn" disabled={loading}>{loading ? 'İşleniyor...' : mode === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}</button>{message ? <p className={message.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{message}</p> : null}<div className="hero-actions"><a className="ghost-btn" href={mode === 'register' ? '/login' : '/register'}>{mode === 'register' ? 'Girişe geç' : 'Kayıt ol'}</a><a className="ghost-btn" href="/status">Durumu kontrol et</a></div></form></section></Layout>;
}

function AdminNav() { return <div className="admin-button-bar single-row-admin">{adminButtons.map(([label, href]) => <a key={href} className="ghost-btn admin-mini-btn" href={href}>{label}</a>)}</div>; }
function AdminPage() { const session = getSession(); if (!session?.access_token) return <AuthPage mode="login" />; return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🛡️ {VERSION} • Yönetim Paneli</div><h1>Giriş/kayıt sistemi stabilize edildi.</h1><p>Supabase Auth kayıt, giriş ve app_users profil kaydı birlikte kontrol edilir.</p></div><AdminNav /><AdminQuickManager session={session} /></section></Layout>; }

function AdminQuickManager({ session }) {
  const empty = { slug: '', title: '', description: '', status: 'Aktif', sort_order: 100, is_public: true };
  const [table, setTable] = useState('public_games'); const [rows, setRows] = useState([]); const [form, setForm] = useState(empty); const [edit, setEdit] = useState(null); const [msg, setMsg] = useState('');
  async function load() { const r = await listTable(table, session); setRows(r.data || []); setMsg(r.error || `Başarı: ${r.data?.length || 0} kayıt yüklendi.`); }
  useEffect(() => { setEdit(null); setForm(empty); load(); }, [table]);
  function set(k, v) { setForm(x => ({ ...x, [k]: v })); }
  async function submit(e) { e.preventDefault(); const payload = { ...form, slug: form.slug.trim().toLowerCase().replaceAll(' ', '-'), sort_order: Number(form.sort_order) || 100 }; const r = edit ? await updateRow(table, edit, payload, session) : await createRow(table, payload, session); if (r.error) return setMsg(r.error); setMsg(edit ? 'Başarı: kayıt güncellendi.' : 'Başarı: kayıt eklendi.'); setEdit(null); setForm(empty); load(); }
  async function del(row) { if (!confirm(`${row.title} silinsin mi?`)) return; const r = await deleteRow(table, row.id, session); setMsg(r.error || 'Başarı: kayıt silindi.'); load(); }
  return <section className="admin-grid"><form className="admin-card login-card" onSubmit={submit}><h2>Hızlı Kayıt Yönetimi</h2><p>Şimdilik oyun/kategori/kanal/seri tablolarına temel kayıt ekler. Detaylı formlar sonraki sürümlerde gelecek.</p><label>Tablo<select value={table} onChange={e => setTable(e.target.value)}><option value="public_games">Oyunlar</option><option value="public_categories">Kategoriler</option><option value="public_channels">Kanallar</option><option value="public_series">Seriler</option></select></label><div className="form-two-col"><label>Slug<input value={form.slug} onChange={e => set('slug', e.target.value)} required /></label><label>Başlık<input value={form.title} onChange={e => set('title', e.target.value)} required /></label></div><label>Açıklama<textarea rows="3" value={form.description} onChange={e => set('description', e.target.value)} /></label><div className="form-two-col"><label>Durum<select value={form.status} onChange={e => set('status', e.target.value)}><option>Aktif</option><option>Devam Ediyor</option><option>Tamamlandı</option><option>Planlandı</option><option>Gizli</option></select></label><label>Sıra<input type="number" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} /></label></div><label className="inline-check"><input type="checkbox" checked={form.is_public} onChange={e => set('is_public', e.target.checked)} /> Public görünsün</label><button className="primary-btn">{edit ? 'Güncelle' : 'Ekle'}</button>{msg ? <p className={msg.startsWith('Başarı') ? 'form-message success' : 'form-message error'}>{msg}</p> : null}</form><div className="admin-card admin-table-card"><h2>Liste</h2><table className="admin-table"><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.title}</strong><small>{r.slug}</small></td><td>{r.status}</td><td><button onClick={() => { setEdit(r.id); setForm({ ...empty, ...r }); }}>Düzenle</button><button onClick={() => del(r)}>Sil</button></td></tr>)}{!rows.length ? <tr><td>Kayıt yok.</td></tr> : null}</tbody></table></div></section>;
}

function AdminPlaceholder({ title }) { const session = getSession(); if (!session?.access_token) return <AuthPage mode="login" />; return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🚧 {VERSION}</div><h1>{title}</h1><p>Route kuruldu. İçeriği sonraki sürümlerde doldurulacak.</p></div><AdminNav /><EmptyState title="İskelet hazır" text="Bu buton artık 404 vermiyor. İç sistem sonraki sürümde eklenecek." /></section></Layout>; }
function Updates() { return <section className="notes-card"><h2>📌 {VERSION} Tamamlananlar</h2><ul><li>✅ Kayıt ol / giriş yap akışı stabilize edildi.</li><li>✅ Giriş yapan kullanıcı için app_users profili otomatik kontrol ediliyor.</li><li>✅ schema.sql içine auth.users → app_users otomatik profil trigger eklendi.</li><li>✅ Email not confirmed hatası için SQL fix eklendi.</li><li>🟢 Supabase gerekli: schema.sql tekrar çalıştırılmalı.</li></ul></section>; }
function UpdatesPage() { return <Layout><PageHero icon="📝" title="Güncellemeler" text="v1.1.5 tamamlananlar ve sıradaki plan." /><Updates /><section className="next-card"><h2>➡️ Sonraki Plan: v1.1.6 Admin Menü İçerikleri</h2><p>Yönetim panelindeki oyunlar, kategoriler, kanallar, seriler ve kullanıcılar alanları ayrı ayrı doldurulacak.</p></section></Layout>; }
function StatusPage() { return <Layout><PageHero icon="✅" title="Site Durumu" text="Supabase Auth ve route kontrol paneli." /><section className="status-grid"><article className="status-check-card"><strong>Supabase gerekli</strong><p>{supabaseConfig.isReady ? 'Env hazır görünüyor.' : 'Env eksik veya Vercel Redeploy yapılmadı.'}</p></article><article className="status-check-card"><strong>SQL Results</strong><p>schema.sql sonunda v1.1.5 başarı satırı Supabase Results kısmında görünmeli.</p></article><article className="status-check-card"><strong>Auth Kontrol</strong><p>schema.sql sonunda Email confirm fix çalıştı sonucu görünmeli; mevcut onaysız kullanıcılar onaylanır.</p></article><article className="status-check-card"><strong>Profil Trigger</strong><p>Yeni Auth kullanıcısı oluşunca public.app_users profili otomatik oluşturulur.</p></article></section></Layout>; }
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
  if (p.startsWith('/admin/')) return <AdminPlaceholder title={adminButtons.find(x => x[1] === p)?.[0] || 'Yönetim Alanı'} />;
  return <NotFoundPage />;
}

createRoot(document.getElementById('root')).render(<AppRouter />);
