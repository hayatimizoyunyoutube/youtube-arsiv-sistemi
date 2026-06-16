document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const messageDiv = document.getElementById('message');

    // Supabase kontrolü
    const checkSupabase = () => {
        if (!window.supabase) {
            console.error("Supabase yüklenmedi!");
            messageDiv.innerText = "Sistem yükleniyor, bekleyin...";
            return false;
        }
        return true;
    };

    async function handleAuth(type) {
        if (!checkSupabase()) return;

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            messageDiv.innerText = "Lütfen e-posta ve şifre girin!";
            return;
        }

        messageDiv.innerText = type === 'login' ? "Giriş yapılıyor..." : "Kayıt olunuyor...";

        try {
            const { data, error } = type === 'login' 
                ? await window.supabase.auth.signInWithPassword({ email, password })
                : await window.supabase.auth.signUp({ email, password });

            if (error) throw error;

            messageDiv.innerText = type === 'login' ? "Giriş başarılı!" : "Kayıt başarılı!";
            if (type === 'login') setTimeout(() => window.location.href = 'index.html', 1000);
        } catch (err) {
            console.error("Auth Hata Detayı:", err);
            messageDiv.innerText = "Hata: " + err.message;
        }
    }

    if (loginBtn) loginBtn.onclick = () => handleAuth('login');
    if (registerBtn) registerBtn.onclick = () => handleAuth('register');
});