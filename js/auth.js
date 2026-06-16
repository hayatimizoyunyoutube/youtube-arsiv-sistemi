document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const messageDiv = document.getElementById('message');

    async function handleAuth(type) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) return messageDiv.innerText = "Alanları doldur!";
        messageDiv.innerText = type === 'login' ? "Giriş yapılıyor..." : "Kayıt olunuyor...";

        try {
            let result;
            if (type === 'login') {
                result = await supabase.auth.signInWithPassword({ email, password });
            } else {
                result = await supabase.auth.signUp({ email, password });
            }

            if (result.error) throw result.error;

            messageDiv.innerText = type === 'login' ? "Giriş başarılı!" : "Kayıt başarılı!";
            if (type === 'login') setTimeout(() => window.location.href = 'index.html', 1000);
        } catch (err) {
            messageDiv.innerText = "Hata: " + err.message;
            console.error("Auth Hatası:", err);
        }
    }

    loginBtn.onclick = () => handleAuth('login');
    registerBtn.onclick = () => handleAuth('register');
});