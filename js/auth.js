document.addEventListener('DOMContentLoaded', () => {
    // Supabase kontrolü (Eğer yüklenmemişse hata bas)
    if (!window.supabase) {
        console.error("Supabase yüklenemedi, bağlantı ayarlarını kontrol et!");
        return;
    }

    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const message = document.getElementById('message');

    async function handleAuth(type) {
        if (!emailInput || !passwordInput) return;
        
        message.innerText = type === 'login' ? "Giriş yapılıyor..." : "Kayıt olunuyor...";

        try {
            const { error } = type === 'login' 
                ? await window.supabase.auth.signInWithPassword({ email: emailInput.value, password: passwordInput.value })
                : await window.supabase.auth.signUp({ email: emailInput.value, password: passwordInput.value });

            if (error) throw error;

            message.innerText = type === 'login' ? "Giriş başarılı!" : "Kayıt başarılı!";
            if (type === 'login') setTimeout(() => window.location.href = 'index.html', 1000);
        } catch (err) {
            console.error("Auth Hata:", err);
            message.innerText = "Hata: " + err.message;
        }
    }

    if(loginBtn) loginBtn.onclick = () => handleAuth('login');
    if(registerBtn) registerBtn.onclick = () => handleAuth('register');
});