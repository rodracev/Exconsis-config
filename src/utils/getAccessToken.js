// src/utils/getAccessToken.js
import { msalInstance } from "../main"; // <- necesitas exportar esto en main.jsx
import { loginRequest } from "../auth/authConfig";

export const getAccessToken = async () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) return null;

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });

    return response.accessToken;
  } catch (error) {
    console.error("Error al obtener token:", error);
    return null;
  }
};