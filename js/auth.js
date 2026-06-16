// ... (Diğer kodlar aynı kalabilir, sadece register kısmını şu şekilde güncelle)
registerBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) return showMessage("Lütfen bilgileri girin.", "#ff9900");
    showMessage("Kayıt oluşturuluyor...", "#3ea6ff");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        showMessage("Hata: " + error.message, "#ff4444");
    } else {
        showMessage("Kayıt başarılı! Giriş yapabilirsiniz.", "#28a745");
    }
});