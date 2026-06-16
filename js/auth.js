const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const messageDiv = document.getElementById('message');

function showMessage(text, color) {
    messageDiv.style.color = color;
    messageDiv.innerText = text;
}

// KAYIT OL
registerBtn.addEventListener('click', async () => {
    if (!emailInput.value || !passwordInput.value) return showMessage("Lütfen tüm alanları doldurun.", "orange");
    showMessage("Kayıt yapılıyor...", "yellow");

    const { data, error } = await supabase.auth.signUp({
        email: emailInput.value,
        password: passwordInput.value,
    });

    if (error) showMessage("Hata: " + error.message, "red");
    else showMessage("Kayıt başarılı! Şimdi giriş yapabilirsiniz.", "green");
});

// GİRİŞ YAP
loginBtn.addEventListener('click', async () => {
    if (!emailInput.value || !passwordInput.value) return showMessage("Lütfen tüm alanları doldurun.", "orange");
    showMessage("Giriş yapılıyor...", "yellow");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.value,
        password: passwordInput.value,
    });

    if (error) showMessage("Hata: " + error.message, "red");
    else {
        showMessage("Başarılı! Yönlendiriliyorsunuz...", "green");
        setTimeout(() => window.location.href = 'index.html', 1000);
    }
});