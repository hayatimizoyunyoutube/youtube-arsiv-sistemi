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

export async function signInAdminWithPassword(email, password) {
  if (!supabaseAuthConfig.isReady) {
    return { data: null, error: 'Supabase env bilgileri yok. Vercel ve .env.local içine VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY eklenmeli.' };
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
