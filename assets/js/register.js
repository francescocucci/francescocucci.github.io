document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessageContainer = document.getElementById("error-message");
    const successMessageContainer = document.getElementById("success-message");
  
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Reset dei messaggi
      errorMessageContainer.textContent = '';
      successMessageContainer.textContent = '';
  
      const userData = {
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
      };
  
      const apiEndpoint = window.fastapiEndpoint + "/register";  // Assicurati che `window.fastapiEndpoint` contenga l'endpoint corretto
  
      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "User registered successfully") {  // Qui controlliamo la risposta `data`
            successMessageContainer.textContent = "User registered successfully! Please check your email to confirm your account.";
          } else {
            errorMessageContainer.textContent = data.detail || "Error occurred during registration.";
          }
        })
        .catch(() => {
          errorMessageContainer.textContent = "An error occurred while trying to register.";
        });
    });
  });
  