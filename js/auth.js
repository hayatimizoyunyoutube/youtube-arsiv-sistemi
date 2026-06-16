document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const message = document.getElementById('message');

    async function handleAuth(type) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!email || !password) return message.innerText = "Alanları doldur!";
        
        message.innerText = "İşleniyor...";
        
        const { error } = type === 'login' 
            ? await window.supabase.auth.signInWithPassword({ email, password })
            : await window.supabase.auth.signUp({ email, password });

        if (error) message.innerText = "Hata: " + error.message;
        else {
            message.innerText = type === 'login' ? "Giriş başarılı!" : "Kayıt başarılı!";
            if (type === 'login') setTimeout(() => window.location.href = 'index.html', 1000);
        }
    }

    if(loginBtn) loginBtn.onclick = () => handleAuth('login');
    if(registerBtn) registerBtn.onclick = () => handleAuth('register');
});