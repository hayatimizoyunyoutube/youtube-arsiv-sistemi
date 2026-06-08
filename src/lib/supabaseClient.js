const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SESSION_KEY = 'hoy_user_session_v120';
const OLD_SESSION_KEYS = ['hoy_user_session_v119', 'hoy_user_session_v118', 'hoy_user_session_v117', 'hoy_admin_session_v115'];

export const supabaseConfig = {
  url: SUPABASE_URL,
  hasUrl: Boolean(SUPABASE_URL),
  hasAnonKey: Boolean(SUPABASE_ANON_KEY),
  isReady: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

export function getSession() {
  try {
    const current = localStorage.getItem(SESSION_KEY);
    if (current) return JSON.parse(current);
    for (const key of OLD_SESSION_KEYS) {
      const old = localStorage.getItem(key);
      if (old) {
        localStorage.setItem(SESSION_KEY, old);
        localStorage.removeItem(key);
        return JSON.parse(old);
      }
    }
    return null;
  } catch { return null; }
}
export function saveSession(session) {
  const expires_at = session?.expires_at || (session?.expires_in ? Math.floor(Date.now() / 1000) + Number(session.expires_in) : undefined);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, expires_at, saved_at: new Date().toISOString() }));
}
export function clearSession() { localStorage.removeItem(SESSION_KEY); OLD_SESSION_KEYS.forEach(k => localStorage.removeItem(k)); }

export function isAdminRole(role) {
  return ['founder', 'kurucu', 'admin', 'editor', 'moderator', 'moderatör'].includes(String(role || '').toLowerCase());
}

export function roleLabel(role) {
  const value = String(role || 'user').toLowerCase();
  const map = { founder: 'Kurucu', kurucu: 'Kurucu', admin: 'Yönetici', editor: 'Editör', moderator: 'Moderatör', 'moderatör': 'Moderatör', user: 'Kullanıcı' };
  return map[value] || role || 'Kullanıcı';
}

export async function refreshSessionIfNeeded(session = getSession()) {
  if (!supabaseConfig.isReady || !session?.refresh_token) return { data: session, error: null };
  const now = Math.floor(Date.now() / 1000);
  if (session.expires_at && Number(session.expires_at) > now + 120) return { data: session, error: null };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: headers(null),
    body: JSON.stringify({ refresh_token: session.refresh_token })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: session, error: cleanSupabaseError(json, 'Oturum yenilenemedi. Tekrar giriş yapman gerekiyor.') };
  const fresh = {
    access_token: json.access_token,
    refresh_token: json.refresh_token || session.refresh_token,
    expires_at: json.expires_at || (json.expires_in ? Math.floor(Date.now() / 1000) + Number(json.expires_in) : undefined),
    user: json.user || session.user
  };
  saveSession(fresh);
  return { data: fresh, error: null };
}

export async function getCurrentAppUser(session = getSession()) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  let activeSession = session;
  const refreshed = await refreshSessionIfNeeded(session);
  if (refreshed.data) activeSession = refreshed.data;
  const userId = activeSession?.user?.id;
  const email = activeSession?.user?.email || '';
  if (!activeSession?.access_token || !userId) return { data: null, error: 'Oturum bilgisi eksik.' };
  let res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?auth_user_id=eq.${userId}&select=*&limit=1`, { headers: headers(activeSession) });
  let json = await res.json().catch(() => []);
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Kullanıcı profili okunamadı: ${res.status}`) };
  let row = Array.isArray(json) ? json[0] || null : null;
  if (!row && email) {
    res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?email=eq.${encodeURIComponent(email)}&select=*&limit=1`, { headers: headers(activeSession) });
    json = await res.json().catch(() => []);
    if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Kullanıcı profili okunamadı: ${res.status}`) };
    row = Array.isArray(json) ? json[0] || null : null;
  }
  if (!row && email) {
    const created = await ensureAppUserProfile(activeSession);
    row = created.data || null;
  }
  return { data: row, error: refreshed.error };
}

function cleanSupabaseError(json, fallback) {
  return json?.error_description || json?.msg || json?.message || json?.error || fallback;
}

function headers(session, prefer = '') {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {})
  };
}

export async function ensureAppUserProfile(session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  const user = session?.user;
  const email = user?.email || '';
  if (!session?.access_token || !email) return { data: null, error: 'Oturum bilgisi eksik.' };

  // ÖNEMLİ: Mevcut kullanıcı varsa rolünü asla user olarak ezme.
  let res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?or=(auth_user_id.eq.${user.id},email.eq.${encodeURIComponent(email)})&select=*&limit=1`, { headers: headers(session) });
  let json = await res.json().catch(() => []);
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Profil kaydı okunamadı: ${res.status}`) };
  const existing = Array.isArray(json) ? json[0] : null;
  if (existing) {
    const patch = { auth_user_id: user.id, email, updated_at: new Date().toISOString() };
    res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?id=eq.${existing.id}`, {
      method: 'PATCH',
      headers: headers(session, 'return=representation'),
      body: JSON.stringify(patch)
    });
    json = await res.json().catch(() => ({}));
    if (!res.ok) return { data: existing, error: cleanSupabaseError(json, `Profil kaydı güncellenemedi: ${res.status}`) };
    return { data: Array.isArray(json) ? json[0] : existing, error: null };
  }

  const payload = {
    auth_user_id: user.id,
    email,
    display_name: email.split('@')[0],
    role: email.toLowerCase() === 'mertdundaroyunda@gmail.com' ? 'founder' : 'user',
    status: 'active',
    updated_at: new Date().toISOString()
  };
  res = await fetch(`${SUPABASE_URL}/rest/v1/app_users`, {
    method: 'POST',
    headers: headers(session, 'return=representation'),
    body: JSON.stringify([payload])
  });
  json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Profil kaydı oluşturulamadı: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function signIn(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik. Vercel Ortam Değişkenleri eklenip yeniden dağıtım yapılmalı.' };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: headers(null), body: JSON.stringify({ email, password })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const raw = cleanSupabaseError(json, `Giriş hatası: ${res.status}`);
    const hint = raw.toLowerCase().includes('confirm') || raw.toLowerCase().includes('email')
      ? ' Supabase Paneli → Authentication → Providers → Email bölümünde e-posta onayı kapalı olmalı veya kullanıcı e-postasını onaylamalı.'
      : '';
    return { data: null, error: raw + hint };
  }
  const session = { access_token: json.access_token, refresh_token: json.refresh_token, user: json.user };
  saveSession(session);
  await ensureAppUserProfile(session);
  return { data: session, error: null };
}

export async function signUp(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik. Vercel Ortam Değişkenleri eklenip yeniden dağıtım yapılmalı.' };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST', headers: headers(null), body: JSON.stringify({ email, password })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Kayıt hatası: ${res.status}`) };

  if (json.access_token) {
    const session = { access_token: json.access_token, refresh_token: json.refresh_token, user: json.user };
    saveSession(session);
    await ensureAppUserProfile(session);
    return { data: { session, confirmed: true }, error: null };
  }

  return {
    data: { user: json.user, confirmed: false },
    error: null,
    notice: 'Kayıt Supabase Auth içine düştü. Giriş için Supabase e-posta onayı kapalı olmalı veya kullanıcı e-postasını onaylamalı.'
  };
}

export async function listTable(table, session = null, order = 'sort_order.asc') {
  if (!supabaseConfig.isReady) return { data: [], error: 'Supabase bağlantısı eksik.' };
  const safeOrder = table === 'app_users' ? 'created_at.desc' : order;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=${safeOrder}`, { headers: headers(session) });
  const json = await res.json().catch(() => []);
  if (!res.ok) return { data: [], error: cleanSupabaseError(json, `${table} listeleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json : [], error: null };
}

export async function createRow(table, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: 'POST', headers: headers(session, 'return=representation'), body: JSON.stringify([row]) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `${table} ekleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function updateRow(table, id, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'PATCH', headers: headers(session, 'return=representation'), body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `${table} güncelleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function deleteRow(table, id, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'DELETE', headers: headers(session) });
  if (!res.ok) { const json = await res.json().catch(() => ({})); return { data: null, error: cleanSupabaseError(json, `${table} silme hatası: ${res.status}`) }; }
  return { data: true, error: null };
}


export async function updateAppUser(id, payload, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase bağlantısı eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers(session, 'return=representation'),
    body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Kullanıcı güncelleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}
