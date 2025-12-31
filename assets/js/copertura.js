// Funzione di inizializzazione della mappa
function initMap() {
    // Coordinate che racchiudono la Sicilia
    const bounds = new google.maps.LatLngBounds(
        { lat: 36.6312, lng: 12.4230 }, // Sud-Ovest (es. Marettimo)
        { lat: 38.2874, lng: 15.6500 }  // Nord-Est (es. Messina)
    );

    // Inizializza la mappa
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7, // Zoom iniziale
        mapTypeId: "roadmap", // Tipo di mappa (roadmap, satellite, hybrid, terrain)
    });

    // Adatta la mappa ai limiti definiti
    map.fitBounds(bounds);

    // Città con coordinate aggiornate
    const cities = [
        { position: { lat: 37.1562722, lng: 14.6985135 }, title: "Licodia Eubea" },
        { position: { lat: 37.2126311, lng: 14.6245224 }, title: "Grammichele" },
        { position: { lat: 37.0865635, lng: 14.5263153 }, title: "Mazzarrone" },
        { position: { lat: 37.2639342, lng: 14.6860685 }, title: "Mineo" },
        { position: { lat: 37.1599964, lng: 14.7461785 }, title: "Vizzini" },
        { position: { lat: 37.1333, lng: 14.7500 }, title: "Vizzini Scalo" },
        { position: { lat: 37.1449, lng: 14.5741 }, title: "Granieri" },
        { position: { lat: 37.0703, lng: 14.6019 }, title: "Pedalino" },
    ];

    // Aggiungi i marker sulla mappa
    cities.forEach(city => {
        new google.maps.Marker({
            position: city.position,
            map: map,
            title: city.title,
        });
    });
}

// Associa la funzione di inizializzazione all'evento window.onload
window.onload = initMap;

// Gestione della validazione del form
function validateForm() {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        // Evento 'input' per validare il campo
        input.addEventListener("input", function () {
            if (input.checkValidity()) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            }
        });

        // Rimuove le classi di errore quando il campo riceve il focus
        input.addEventListener("focus", function () {
            input.classList.remove("is-invalid", "is-valid");
        });
    });

    // Evento 'submit' per bloccare invio non valido
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
    });
}

// Inizializza la validazione del form
validateForm();
