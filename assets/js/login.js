document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessageContainer = document.getElementById("error-message");
    const successMessageContainer = document.getElementById("success-message");
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
  
      const apiEndpoint = window.fastapiEndpoint + "/token";
      const body = new URLSearchParams({
        username: email,
        password: password,
      });
  
      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();  // Solo se la risposta è ok, trasformiamo in JSON
          } else {
            throw new Error('Login failed');
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          successMessageContainer.textContent = `Logged in successfully.`;
          errorMessageContainer.textContent = "";
  
          // Una volta effettuato il login, chiama il recupero dei dati sicuri
          // Qui richiamiamo la funzione dal file securedata.js senza modificarla
          fetchSecureData(); // Chiamata alla funzione definita in securedata.js
        })
        .catch((error) => {
          errorMessageContainer.textContent = error.message || "Something went wrong";
          successMessageContainer.textContent = "";
        });
    });
  });
  