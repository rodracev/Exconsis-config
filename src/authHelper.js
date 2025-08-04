// src/authHelper.js
import { instance } from './msalConfig';
import { loginRequest } from './auth/authConfig';

// Esto obtiene la cuenta activa (si hay una sesión iniciada)
const getAccount = () => {
  const currentAccounts = instance.getAllAccounts();
  if (currentAccounts.length === 0) return null;
  return currentAccounts[0]; // Puedes ajustar si manejas varias cuentas
};

export const getAccessToken = async () => {
  const account = getAccount();
  if (!account) {
    console.warn('No hay sesión activa');
    return null;
  }

  try {
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return response.accessToken;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    return null;
  }
};