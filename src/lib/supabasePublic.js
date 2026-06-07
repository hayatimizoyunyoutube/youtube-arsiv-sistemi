const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabasePublicConfig = {
  url: SUPABASE_URL,
  hasUrl: Boolean(SUPABASE_URL),
  hasAnonKey: Boolean(SUPABASE_ANON_KEY),
  isReady: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

export async function fetchPublicSeriesFromSupabase() {
  if (!supabasePublicConfig.isReady) {
    return { data: [], error: 'Supabase env bilgileri yok. Demo veri kullanılacak.' };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/public_series?select=*&is_public=eq.true&order=sort_order.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      return { data: [], error: `Supabase cevap hatası: ${response.status}` };
    }

    const rows = await response.json();
    return { data: Array.isArray(rows) ? rows : [], error: null };
  } catch (error) {
    return { data: [], error: error?.message || 'Supabase bağlantı hatası' };
  }
}
