document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const message = document.getElementById('message');

    // Supabase'in yüklenmesini bekleyen bir kontrol
    function getSupabase() {
        if (!window.supabase) {
            console.error("Supabase yüklenemedi!");
            return null;
        }
        return window.supabase;
    }

    async function handleAuth(type) {
        const client = getSupabase();
        if (!client) return message.innerText = "Sistem yükleniyor, bekleyin...";

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        message.innerText = type === 'login' ? "Giriş yapılıyor..." : "Kayıt olunuyor...";

        try {
            const { error } = type === 'login' 
                ? await client.auth.signInWithPassword({ email, password })
                : await client.auth.signUp({ email, password });

            if (error) throw error;
            message.innerText = type === 'login' ? "Giriş başarılı!" : "Kayıt başarılı!";
            if (type === 'login') setTimeout(() => window.location.href = 'index.html', 1000);
        } catch (err) {
            message.innerText = "Hata: " + err.message;
        }
    }

    if (loginBtn) loginBtn.onclick = () => handleAuth('login');
    if (registerBtn) registerBtn.onclick = () => handleAuth('register');
});