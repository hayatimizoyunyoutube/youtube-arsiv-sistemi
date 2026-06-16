// HTML'deki elementleri seçiyoruz
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const messageDiv = document.getElementById('message');

// KAYIT OLMA İŞLEMİ
registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    messageDiv.style.color = "blue";
    messageDiv.innerText = "Kayıt yapılıyor, lütfen bekleyin...";

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        messageDiv.style.color = "red";
        messageDiv.innerText = "Hata: " + error.message;
    } else {
        messageDiv.style.color = "green";
        messageDiv.innerText = "Kayıt başarılı! Şimdi giriş yapabilirsiniz.";
    }
});

// GİRİŞ YAPMA İŞLEMİ
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    messageDiv.style.color = "blue";
    messageDiv.innerText = "Giriş yapılıyor...";

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        messageDiv.style.color = "red";
        messageDiv.innerText = "Hata: " + error.message;
    } else {
        messageDiv.style.color = "green";
        messageDiv.innerText = "Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...";
        // 1 saniye sonra ana sayfaya at
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});