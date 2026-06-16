document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    function showMessage(text, color) {
        messageDiv.innerText = text;
        messageDiv.style.color = color;
    }

    loginBtn.addEventListener('click', async () => {
        showMessage("Giriş yapılıyor...", "#3ea6ff");
        const { error } = await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value
        });
        if (error) showMessage(error.message, "#ff4444");
        else {
            showMessage("Başarılı! Yönlendiriliyorsunuz...", "#28a745");
            setTimeout(() => window.location.href = 'index.html', 1000);
        }
    });

    registerBtn.addEventListener('click', async () => {
        showMessage("Kayıt olunuyor...", "#3ea6ff");
        const { error } = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value
        });
        if (error) showMessage(error.message, "#ff4444");
        else showMessage("Kayıt başarılı! Giriş yapabilirsiniz.", "#28a745");
    });
});