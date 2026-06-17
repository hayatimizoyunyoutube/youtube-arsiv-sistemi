document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const message = document.getElementById('message');

    async function handleAuth(type) {
        if (!emailInput.value || !passwordInput.value) {
            message.innerText = "Bilgileri girin!";
            return;
        }

        message.innerText = "İşleniyor...";

        try {
            // Supabase işlemini başlat
            const { data, error } = type === 'login' 
                ? await window.supabase.auth.signInWithPassword({ 
                    email: emailInput.value, 
                    password: passwordInput.value 
                  })
                : await window.supabase.auth.signUp({ 
                    email: emailInput.value, 
                    password: passwordInput.value 
                  });

            if (error) throw error;

            console.log("Supabase Yanıtı:", data);
            
            if (type === 'login') {
                message.innerText = "Giriş başarılı!";
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } else {
                message.innerText = "Kayıt başarılı! Şimdi giriş yapabilirsiniz.";
            }
        } catch (err) {
            console.error("Supabase Hatası:", err);
            message.innerText = "Hata: " + err.message;
        }
    }

    if (loginBtn) loginBtn.onclick = () => handleAuth('login');
    if (registerBtn) registerBtn.onclick = () => handleAuth('register');
});