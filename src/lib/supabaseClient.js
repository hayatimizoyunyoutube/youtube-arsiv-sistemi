const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SESSION_KEY = 'hoy_admin_session_v113';

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

function headers(session, prefer = '') {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {})
  };
}

export async function signIn(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel Environment Variables eklenip Redeploy yapılmalı.' };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: headers(null), body: JSON.stringify({ email, password })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: json.error_description || json.msg || json.error || `Giriş hatası: ${res.status}` };
  const session = { access_token: json.access_token, refresh_token: json.refresh_token, user: json.user };
  saveSession(session);
  return { data: session, error: null };
}

export async function signUp(email, password) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel Environment Variables eklenip Redeploy yapılmalı.' };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST', headers: headers(null), body: JSON.stringify({ email, password })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: json.error_description || json.msg || json.error || `Kayıt hatası: ${res.status}` };
  return { data: json, error: null };
}

export async function listTable(table, session = null, order = 'sort_order.asc') {
  if (!supabaseConfig.isReady) return { data: [], error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=${order}`, { headers: headers(session) });
  const json = await res.json().catch(() => []);
  if (!res.ok) return { data: [], error: json.message || `${table} listeleme hatası: ${res.status}` };
  return { data: Array.isArray(json) ? json : [], error: null };
}

export async function createRow(table, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: 'POST', headers: headers(session, 'return=representation'), body: JSON.stringify([row]) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: json.message || `${table} ekleme hatası: ${res.status}` };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function updateRow(table, id, row, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'PATCH', headers: headers(session, 'return=representation'), body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { data: null, error: json.message || `${table} güncelleme hatası: ${res.status}` };
  return { data: Array.isArray(json) ? json[0] : json, error: null };
}

export async function deleteRow(table, id, session) {
  if (!supabaseConfig.isReady) return { data: null, error: 'Supabase env eksik.' };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'DELETE', headers: headers(session) });
  if (!res.ok) { const json = await res.json().catch(() => ({})); return { data: null, error: json.message || `${table} silme hatası: ${res.status}` }; }
  return { data: true, error: null };
}
