async function checkUserAccess() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        document.getElementById('auth-link').innerText = "Profil";
        document.getElementById('admin-link').style.display = "inline-block"; // Admin panelini göster
    }
}
checkUserAccess();