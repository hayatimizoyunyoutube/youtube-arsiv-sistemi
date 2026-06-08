import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { siteConfig } from './config/site.js';
import { clearSession, createRow, deleteRow, getSession, listTable, signIn, signUp, supabaseConfig, updateRow } from './lib/supabaseClient.js';

const VERSION = siteConfig.version;
const PLACEHOLDER = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
const adminButtons = [
  ['Panel', '/admin'], ['Oyun Ekle', '/admin/games/new'], ['Oyunlar', '/admin/games'], ['Seriler', '/admin/series'],
  ['Bölümler', '/admin/episodes'], ['Takvim', '/admin/calendar'], ['Notlar', '/admin/notes'], ['Bakım', '/admin/maintenance'],
  ['Kullanıcılar ve Yetkiler', '/admin/users'], ['Veri Sağlığı', '/admin/data-health'], ['Yetkili Rehberi', '/admin/guide']
];

function Layout({ children }) {
  const menu = [['Ana Sayfa','/'],['Arşiv','/series'],['Koleksiyonlar','/categories'],['Seriler','/series'],['Kanallar','/channels'],['Güncellemeler','/updates'],['Site Durumu','/status'],['Yönetim Paneli','/admin'],['Giriş','/login'],['Kayıt Ol','/register']];
  return <main className="page-shell">
    <header className="site-header">
      <a className="brand" href="/"><span className="brand-mark">HO</span><span><strong>{siteConfig.name}</strong><small>{VERSION} • {siteConfig.subtitle}</small></span></a>
      <nav className="nav">{menu.map(([label,href]) => <a key={href+label} href={href}>{label}</a>)}</nav>
    </header>
    {children}
    <footer className="footer"><span>{siteConfig.releaseName}</span><span>{VERSION}</span></footer>
  </main>;
}

function EmptyState({ title='Kayıt yok', text='Bu alan artık demo veri kullanmıyor. Supabase tablosundan veri bekleniyor.' }) {
  return <section className="notes-card"><h2>{title}</h2><p>{text}</p><a className="ghost-btn" href="/admin">Yönetim paneline git</a></section>;
}

function useSupabaseTable(table) {
  const [rows, setRows] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  async function load() { setLoading(true); const r = await listTable(table); setLoading(false); setRows(r.data); setError(r.error || ''); }
  useEffect(() => { load(); }, [table]);
  return { rows, error, loading, reload: load };
}

function HomePage() {
  const { rows: series } = useSupabaseTable('public_series');
  const { rows: categories } = useSupabaseTable('public_categories');
  const { rows: channels } = useSupabaseTable('public_channels');
  return <Layout>
    <section className="hero-card showcase-hero">
      <div className="showcase-copy"><div className="version-pill">✅ {VERSION} • Supabase ana iskelet</div><h1>Demo veriler kaldırıldı. Site artık Supabase kayıtlarını bekliyor.</h1><p>Bu sürümde giriş/kayıt ekranı, kategori tablosu, kanal/seri tablo hazırlığı ve yönetim paneli buton iskeleti kuruldu.</p><div className="hero-actions"><a className="primary-btn" href="/register">Kayıt Ol</a><a className="ghost-btn" href="/login">Giriş Yap</a><a className="ghost-btn" href="/admin">Admin Paneli</a></div></div>
      <aside className="showcase-panel"><span>Supabase Durumu</span><strong>{supabaseConfig.isReady ? 'Env hazır' : 'Env eksik'}</strong><p>Supabase gerekli. Vercel env değişkenleri eklenip Redeploy yapılmalı.</p><div className="mini-metrics"><b>{series.length} seri</b><b>{categories.length} kategori</b><b>{channels.length} kanal</b></div></aside>
    </section>
    <section className="beta-stats premium-stats"><article><span>{series.length}</span><p>Supabase Seri</p></article><article><span>{categories.length}</span><p>Supabase Kategori</p></article><article><span>{channels.length}</span><p>Supabase Kanal</p></article><article><span>{supabaseConfig.isReady ? 'Hazır':'Eksik'}</span><p>Env</p></article></section>
    {!series.length ? <EmptyState title="Demo seriler kaldırıldı" text="Seriler artık Supabase public_series tablosundan gelecek. Admin panelden kategori/seri/kanal kayıtları eklenmeye başlayacak." /> : <SeriesGrid rows={series} />}
    <Updates />
  </Layout>;
}

function Card({ item, type }) {
  const title = item.title || item.name || 'Başlıksız'; const slug = item.slug || '';
  const img = item.cover_url || item.cover || PLACEHOLDER;
  return <a className="series-card upgraded-series-card" href={`/${type}/${slug}`}><div className="series-image-wrap"><img src={img} alt={title}/><span className="status-badge">{item.status || 'Aktif'}</span></div><div className="series-content"><h3>{title}</h3><p>{item.description || 'Açıklama henüz eklenmedi.'}</p><div className="card-info-row"><span>{item.category_title || item.focus || 'Arşiv'}</span><span>{item.episodes || item.series_count || 0} kayıt</span></div></div></a>;
}
function SeriesGrid({ rows }) { return <section className="series-section"><div className="section-heading"><span>🎞️ Supabase</span><h2>Seriler</h2><p>Bu liste artık demo dosyadan değil Supabase public_series tablosundan gelir.</p></div><div className="series-grid premium-series-grid">{rows.map(x => <Card key={x.id} item={x} type="series" />)}</div></section>; }
function SeriesPage() { const {rows, loading, error}=useSupabaseTable('public_series'); return <Layout><PageHero icon="🎞️" title="Seriler" text="Demo veriler kaldırıldı. Supabase public_series kayıtları listelenir." />{error?<Alert text={error}/>:null}{loading?<p>Yükleniyor...</p>:rows.length?<SeriesGrid rows={rows}/>:<EmptyState/>}</Layout>; }
function CategoriesPage() { const {rows, loading, error}=useSupabaseTable('public_categories'); return <Layout><PageHero icon="📁" title="Kategoriler" text="Her kategori ayrı sayfa açacak şekilde Supabase tablosuna bağlandı." />{error?<Alert text={error}/>:null}{loading?<p>Yükleniyor...</p>:rows.length?<div className="series-grid premium-series-grid">{rows.map(x=><Card key={x.id} item={x} type="categories" />)}</div>:<EmptyState title="Kategori yok" text="Admin panelden kategori ekleyince burada görünecek."/>}</Layout>; }
function ChannelsPage() { const {rows, loading, error}=useSupabaseTable('public_channels'); return <Layout><PageHero icon="📺" title="Kanallar" text="Kanallar Supabase public_channels tablosundan gelir." />{error?<Alert text={error}/>:null}{loading?<p>Yükleniyor...</p>:rows.length?<div className="series-grid premium-series-grid">{rows.map(x=><Card key={x.id} item={x} type="channels" />)}</div>:<EmptyState title="Kanal yok" text="Kanal kayıtları sonraki yönetim adımında doldurulacak."/>}</Layout>; }
function DetailPage({ table, label }) { const slug=location.pathname.split('/').pop(); const {rows}=useSupabaseTable(table); const item=rows.find(x=>x.slug===slug); if(!item) return <NotFoundPage/>; return <Layout><section className="hero-card"><div className="version-pill">{label} Detayı</div><h1>{item.title}</h1><p>{item.description || 'Açıklama henüz eklenmedi.'}</p><div className="hero-actions"><a className="ghost-btn" href={`/${label==='Kategori'?'categories':label==='Kanal'?'channels':'series'}`}>Geri dön</a></div></section></Layout>; }
function PageHero({icon,title,text}) { return <section className="updates-hero"><div><span>{icon} {VERSION}</span><h1>{title}</h1><p>{text}</p></div><div className="release-target"><small>Supabase</small><strong>{supabaseConfig.isReady?'Hazır':'Eksik'}</strong><p>{siteConfig.releaseName}</p></div></section>; }
function Alert({text}) { return <p className="form-message error">{text}</p>; }

function AuthPage({ mode }) {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(e){ e.preventDefault(); setLoading(true); const r = mode==='register' ? await signUp(email,password) : await signIn(email,password); setLoading(false); if(r.error) return setMessage(r.error); setMessage(mode==='register'?'Başarı: kayıt oluşturuldu. Supabase e-posta onayı açıksa maili kontrol et.':'Başarı: giriş yapıldı.'); if(mode==='login') setTimeout(()=>location.href='/admin',600); }
  return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🔐 {VERSION}</div><h1>{mode==='register'?'Kayıt Ol':'Giriş Yap'}</h1><p>Supabase Auth kullanılır. Gerçek şifre/key GitHub’a gitmez, Vercel Environment Variables içinde tutulur.</p></div><form className="admin-card login-card" onSubmit={submit}><h2>{mode==='register'?'Yeni hesap':'Hesaba giriş'}</h2><label>E-posta<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Şifre<input type="password" minLength="6" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="primary-btn" disabled={loading}>{loading?'İşleniyor...':mode==='register'?'Kayıt Ol':'Giriş Yap'}</button>{message?<p className={message.startsWith('Başarı')?'form-message success':'form-message error'}>{message}</p>:null}<div className="hero-actions"><a className="ghost-btn" href={mode==='register'?'/login':'/register'}>{mode==='register'?'Girişe geç':'Kayıt ol'}</a></div></form></section></Layout>;
}

function AdminNav() { return <div className="admin-button-bar">{adminButtons.map(([label,href]) => <a key={href} className="ghost-btn admin-mini-btn" href={href}>{label}</a>)}</div>; }
function AdminPage() { const session=getSession(); if(!session?.access_token) return <AuthPage mode="login"/>; return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🛡️ {VERSION} • Yönetim Paneli</div><h1>Yönetim paneli butonları kuruldu.</h1><p>Bu sürümde butonların route iskeleti oluşturuldu. İçleri sonraki sürümlerde tek tek doldurulacak.</p><div className="hero-actions"><button className="ghost-btn" onClick={()=>{clearSession(); location.href='/login'}}>Çıkış Yap</button></div></div><AdminNav/><AdminCategoryManager session={session}/></section></Layout>; }
function AdminCategoryManager({session}) { const empty={slug:'', title:'', description:'', cover_url:'', status:'Aktif', sort_order:100, is_public:true}; const [rows,setRows]=useState([]), [form,setForm]=useState(empty), [edit,setEdit]=useState(null), [msg,setMsg]=useState(''); async function load(){const r=await listTable('public_categories',session); setRows(r.data); setMsg(r.error||`Başarı: ${r.data.length} kategori yüklendi.`)} useEffect(()=>{load()},[]); function set(k,v){setForm(x=>({...x,[k]:v}))} async function submit(e){e.preventDefault(); const payload={...form, slug:form.slug.trim().toLowerCase().replaceAll(' ','-'), sort_order:Number(form.sort_order)||100}; const r=edit?await updateRow('public_categories',edit,payload,session):await createRow('public_categories',payload,session); if(r.error) return setMsg(r.error); setMsg(edit?'Başarı: kategori güncellendi.':'Başarı: kategori eklendi.'); setEdit(null); setForm(empty); load();} async function del(row){if(!confirm(`${row.title} silinsin mi?`))return; const r=await deleteRow('public_categories',row.id,session); setMsg(r.error||'Başarı: kategori silindi.'); load()} return <section className="admin-grid"><form className="admin-card login-card" onSubmit={submit}><h2>{edit?'Kategori Düzenle':'Kategori Ekle'}</h2><p>Supabase gerekli: public_categories tablosuna yazar.</p><div className="form-two-col"><label>Slug<input value={form.slug} onChange={e=>set('slug',e.target.value)} required/></label><label>Başlık<input value={form.title} onChange={e=>set('title',e.target.value)} required/></label></div><label>Açıklama<textarea rows="3" value={form.description} onChange={e=>set('description',e.target.value)}/></label><label>Kapak URL<input value={form.cover_url} onChange={e=>set('cover_url',e.target.value)}/></label><div className="form-two-col"><label>Durum<select value={form.status} onChange={e=>set('status',e.target.value)}><option>Aktif</option><option>Gizli</option><option>Planlandı</option></select></label><label>Sıra<input type="number" value={form.sort_order} onChange={e=>set('sort_order',e.target.value)}/></label></div><label className="inline-check"><input type="checkbox" checked={form.is_public} onChange={e=>set('is_public',e.target.checked)}/> Public görünsün</label><button className="primary-btn">{edit?'Güncelle':'Kategori Ekle'}</button>{msg?<p className={msg.startsWith('Başarı')?'form-message success':'form-message error'}>{msg}</p>:null}</form><div className="admin-card admin-table-card"><h2>Kategori Listesi</h2><table className="admin-table"><tbody>{rows.map(r=><tr key={r.id}><td><strong>{r.title}</strong><small>{r.slug}</small></td><td>{r.status}</td><td><button onClick={()=>{setEdit(r.id); setForm({...empty,...r})}}>Düzenle</button><button onClick={()=>del(r)}>Sil</button></td></tr>)}{!rows.length?<tr><td>Kategori kaydı yok.</td></tr>:null}</tbody></table></div></section> }
function AdminPlaceholder({ title }) { const session=getSession(); if(!session?.access_token) return <AuthPage mode="login"/>; return <Layout><section className="admin-shell"><div className="admin-hero"><div className="version-pill">🚧 {VERSION}</div><h1>{title}</h1><p>Route kuruldu. Bu alanın içeriği sonraki sürümlerde doldurulacak.</p></div><AdminNav/><EmptyState title="İskelet hazır" text="Bu buton artık 404 vermiyor. İç sistem sonraki sürümde eklenecek."/></section></Layout> }
function Updates(){return <section className="notes-card"><h2>📌 {VERSION} Tamamlananlar</h2><ul><li>✅ Demo kategori/seri/kanal kullanımı kaldırıldı.</li><li>✅ Supabase public_categories ve public_channels tabloları eklendi.</li><li>✅ Giriş yap ve kayıt ol ekranları Supabase Auth ile kuruldu.</li><li>✅ Yönetim paneli buton route iskeleti kuruldu.</li><li>✅ Admin kategori ekle/düzenle/sil başlangıcı eklendi.</li><li>🟢 Supabase gerekli: schema.sql çalıştırılmalı, Vercel env + Redeploy yapılmalı.</li></ul></section>}
function UpdatesPage(){return <Layout><PageHero icon="📝" title="Güncellemeler" text="v1.1.3 tamamlananlar ve sıradaki plan."/><Updates/><section className="next-card"><h2>➡️ Sonraki Plan: v1.1.4 Kanal Yönetimi</h2><p>Admin panelde kanal ekleme, düzenleme, silme ve public kanal listesi güçlendirilecek.</p></section></Layout>}
function StatusPage(){return <Layout><PageHero icon="✅" title="Site Durumu" text="Supabase ve route kontrol paneli."/><section className="status-grid"><article className="status-check-card"><strong>Supabase gerekli</strong><p>{supabaseConfig.isReady?'Env hazır görünüyor.':'Env eksik veya Redeploy yapılmadı.'}</p></article><article className="status-check-card"><strong>SQL Results</strong><p>schema.sql sonunda v1.1.3 başarı satırı Supabase Results kısmında görünmeli.</p></article><article className="status-check-card"><strong>Demo Veriler</strong><p>Demo dosya listeleri public görünümden kaldırıldı.</p></article></section></Layout>}
function NotFoundPage(){return <Layout><section className="hero-card"><div className="version-pill">404 • {VERSION}</div><h1>Sayfa hazır değil.</h1><p>Bu route henüz planlanmadı veya yanlış yazıldı.</p><div className="hero-actions"><a className="primary-btn" href="/">Ana Sayfa</a><a className="ghost-btn" href="/admin">Admin</a></div></section></Layout>}
function AppRouter(){const p=location.pathname.replace(/\/$/,'')||'/'; if(p==='/')return <HomePage/>; if(p==='/series')return <SeriesPage/>; if(p.startsWith('/series/'))return <DetailPage table="public_series" label="Seri"/>; if(p==='/categories')return <CategoriesPage/>; if(p.startsWith('/categories/'))return <DetailPage table="public_categories" label="Kategori"/>; if(p==='/channels')return <ChannelsPage/>; if(p.startsWith('/channels/'))return <DetailPage table="public_channels" label="Kanal"/>; if(p==='/updates')return <UpdatesPage/>; if(p==='/status')return <StatusPage/>; if(p==='/login')return <AuthPage mode="login"/>; if(p==='/register')return <AuthPage mode="register"/>; if(p==='/admin')return <AdminPage/>; if(p.startsWith('/admin/'))return <AdminPlaceholder title={adminButtons.find(x=>x[1]===p)?.[0] || 'Yönetim Alanı'}/>; return <NotFoundPage/>}

createRoot(document.getElementById('root')).render(<AppRouter/>);
