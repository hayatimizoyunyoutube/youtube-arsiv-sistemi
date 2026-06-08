const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const SESSION_KEY = 'hoy_admin_session_v1';

export const supabaseAuthConfig = {
  url: SUPABASE_URL,
  hasUrl: Boolean(SUPABASE_URL),
  hasAnonKey: Boolean(SUPABASE_ANON_KEY),
  isReady: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

export function getAdminSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function authHeaders(session, prefer = '') {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export async function signInAdminWithPassword(email, password) {
  if (!supabaseAuthConfig.isReady) {
    return { data: null, error: 'Supabase bağlantı bilgileri tarayıcı derlemesinde görünmüyor. Vercel > Settings > Environment Variables içine VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekle, Production/Preview/Development seç, sonra yeniden dağıtım yap.' };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { data: null, error: payload?.error_description || payload?.msg || payload?.error || `Giriş hatası: ${response.status}` };
    }

    const session = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: payload.expires_at,
      user: payload.user,
    };

    saveAdminSession(session);
    return { data: session, error: null };
  } catch (error) {
    return { data: null, error: error?.message || 'Giriş bağlantı hatası' };
  }
}

export async function listAdminSeries(session) {
  if (!supabaseAuthConfig.isReady) return { data: [], error: 'Supabase env eksik. Vercel env ekledikten sonra mutlaka Redeploy gerekir.' };
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/public_series?select=*&order=sort_order.asc`, {
      headers: authHeaders(session),
    });
    const payload = await response.json().catch(() => []);
    if (!response.ok) return { data: [], error: payload?.message || `Listeleme hatası: ${response.status}` };
    return { data: Array.isArray(payload) ? payload : [], error: null };
  } catch (error) {
    return { data: [], error: error?.message || 'Seri listesi alınamadı.' };
  }
}

export async function createAdminSeries(session, form) {
  if (!supabaseAuthConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel env ekledikten sonra mutlaka Redeploy gerekir.' };
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/public_series`, {
      method: 'POST',
      headers: authHeaders(session, 'return=representation'),
      body: JSON.stringify([form]),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return { data: null, error: payload?.message || `Ekleme hatası: ${response.status}` };
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null };
  } catch (error) {
    return { data: null, error: error?.message || 'Seri eklenemedi.' };
  }
}

export async function updateAdminSeries(session, id, form) {
  if (!supabaseAuthConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel env ekledikten sonra mutlaka Redeploy gerekir.' };
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/public_series?id=eq.${id}`, {
      method: 'PATCH',
      headers: authHeaders(session, 'return=representation'),
      body: JSON.stringify({ ...form, updated_at: new Date().toISOString() }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return { data: null, error: payload?.message || `Güncelleme hatası: ${response.status}` };
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null };
  } catch (error) {
    return { data: null, error: error?.message || 'Seri güncellenemedi.' };
  }
}

export async function deleteAdminSeries(session, id) {
  if (!supabaseAuthConfig.isReady) return { data: null, error: 'Supabase env eksik. Vercel env ekledikten sonra mutlaka Redeploy gerekir.' };
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/public_series?id=eq.${id}`, {
      method: 'DELETE',
      headers: authHeaders(session),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return { data: null, error: payload?.message || `Silme hatası: ${response.status}` };
    }
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: error?.message || 'Seri silinemedi.' };
  }
}
