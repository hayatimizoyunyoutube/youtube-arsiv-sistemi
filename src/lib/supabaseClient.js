const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SESSION_KEY = 'hoy_admin_session_v115';

export const supabaseConfig = {
  url: SUPABASE_URL,
  hasUrl: Boolean(SUPABASE_URL),
  hasAnonKey: Boolean(SUPABASE_ANON_KEY),
  isReady: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
export function saveSession(session) { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
export function clearSession() { localStorage.removeItem(SESSION_KEY); }

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
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const user = session?.user;
  const email = user?.email || '';
  if (!session?.access_token || !email) return { data: null, error: 'Oturum bilgisi eksik.' };

  const payload = {
    auth_user_id: user.id,
    email,
    display_name: email.split('@')[0],
    role: 'user',
    status: 'active',
    updated_at: new Date().toISOString()
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/app_users?on_conflict=auth_user_id`, {
    method: 'POST',
    headers: headers(session, 'resolution=merge-duplicates,return=representation'),
    body: JSON.stringify([payload])
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `Profil kaydı oluşturulamadı: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function signIn(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel Environment Variables eklenip Redeploy yapılmalı.' };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: headers(null), body: JSON.stringify({ email, password })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const raw = cleanSupabaseError(json, `Giriş hatası: ${res.status}`);
    const hint = raw.toLowerCase().includes('confirm') || raw.toLowerCase().includes('email')
      ? ' Supabase Dashboard → Authentication → Providers → Email bölümünde Confirm email kapalı olmalı veya mail onaylanmalı.'
      : '';
    return { data: null, error: raw + hint };
  }
  const session = { access_token: json.access_token, refresh_token: json.refresh_token, user: json.user };
  saveSession(session);
  await ensureAppUserProfile(session);
  return { data: session, error: null };
}

export async function signUp(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel Environment Variables eklenip Redeploy yapılmalı.' };
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
    notice: 'Kayıt Supabase Auth içine düştü. Giriş için Supabase Email Confirm kapalı olmalı veya kullanıcı mail onayı yapmalı.'
  };
}

export async function listTable(table, session = null, order = 'sort_order.asc') {
  if (!supabaseConfig.isReady) return { data: [], error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=${order}`, { headers: headers(session) });
  const json = await res.json().catch(() => []);
  if (!res.ok) return { data: [], error: cleanSupabaseError(json, `${table} listeleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json : [], error: null };
}

export async function createRow(table, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: 'POST', headers: headers(session, 'return=representation'), body: JSON.stringify([row]) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `${table} ekleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function updateRow(table, id, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'PATCH', headers: headers(session, 'return=representation'), body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: cleanSupabaseError(json, `${table} güncelleme hatası: ${res.status}`) };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function deleteRow(table, id, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'DELETE', headers: headers(session) });
  if (!res.ok) { const json = await res.json().catch(() => ({})); return { data: null, error: cleanSupabaseError(json, `${table} silme hatası: ${res.status}`) }; }
  return { data: true, error: null };
}
