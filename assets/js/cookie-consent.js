document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieConsent');
    const cookieModal = new bootstrap.Modal(document.getElementById('cookieSettingsModal'));
    const cookieSettingsForm = document.getElementById('cookieSettingsForm');
    const acceptAllButton = document.getElementById('acceptAllCookies');
    const manageCookiesButton = document.getElementById('manageCookies');
    const savePreferencesButton = document.getElementById('saveCookiePreferences');

    // Mostra il banner solo se non è già stato accettato
    if (!localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.remove('d-none');
    }

    // Accetta tutti i cookie
    acceptAllButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'all');
        cookieBanner.classList.add('d-none');
    });

    // Apri il modal per gestire i cookie
    manageCookiesButton.addEventListener('click', () => {
        cookieModal.show();
    });

    // Salva le preferenze
    savePreferencesButton.addEventListener('click', () => {
        const preferences = {};
        new FormData(cookieSettingsForm).forEach((value, key) => {
            preferences[key] = value === 'on';
        });
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        cookieModal.hide();
        cookieBanner.classList.add('d-none');
    });
});
