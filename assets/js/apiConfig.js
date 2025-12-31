const API_BASE_URL = window.fastapiEndpoint;  // Usa la variabile di configurazione di Jekyll

const ENDPOINTS = {
  login: `${API_BASE_URL}/token`,
  changePassword: `${API_BASE_URL}/change-password`,
  secureData: `${API_BASE_URL}/secure-data`,
  generaOroscopo: `${API_BASE_URL}/genera_oroscopo/`,
  register: `${API_BASE_URL}/register/`,
};

export { ENDPOINTS };
