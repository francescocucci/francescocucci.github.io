document.addEventListener("DOMContentLoaded", function () {
  const secureDataContainer = document.getElementById("secure-data");
  const errorMessageContainer = document.getElementById("error-message");

  const apiEndpoint = window.fastapiEndpoint + "/secure-data";
  const token = localStorage.getItem("token");

  if (!token) {
    errorMessageContainer.textContent = "You need to login first.";
    return;
  }

  fetch(apiEndpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.detail) {
        errorMessageContainer.textContent = data.detail;
      } else {
        secureDataContainer.innerHTML = `
          <p>${data.message}</p>
          <p>Email: ${data.email}</p>
          <p>Created At: ${data.created_at}</p>
          <p>Verified: ${data.is_verified ? "Yes" : "No"}</p>
        `;
      }
    })
    .catch(() => {
      errorMessageContainer.textContent = "Something went wrong";
    });
});
