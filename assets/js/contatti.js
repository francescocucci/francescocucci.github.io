// Funzione di inizializzazione della mappa
function initMap() {
    // Coordinate centrali della Sicilia
    const sicilyCenter = { lat: 37.1580893, lng: 14.7043369 };

    // Inizializza la mappa centrata sulla Sicilia con zoom maggiore
    const map = new google.maps.Map(document.getElementById("map"), {
        center: sicilyCenter, // Centro della mappa a Licodia Eubea
        zoom: 10, // Livello di zoom iniziale maggiore
        mapTypeId: "roadmap" // Tipo di mappa (roadmap, satellite, hybrid, terrain)
    });

    // Città con coordinate aggiornate
    const cities = [
        { position: { lat: 37.1580893, lng: 14.7043369 }, title: "Licodia Eubea" },
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
