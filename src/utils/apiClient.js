// src/utils/apiClient.js
import axios from "axios";
import { toast } from "react-toastify";
import { getAccessToken } from "./getAccessToken";

const apiClient = axios.create({
  baseURL: "api1", // Cambia si es una URL externa completa
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      toast.error("No se pudo obtener el token de acceso");
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
apiClient.interceptors.response.use(   (response) => {
    const res = response.data;
    console.log(res.data);
    if (res?.IsSuccess === false || res?.isSuccess === false) {
      const msg = res.ErrorMessage || res.errorMessage || res.Message || res.message || "Error en la operación.";
      toast.error(msg);
      return Promise.reject(new Error(msg));
    }
    return res.data;
  },
  (error) => {
    let msg = "Error desconocido";

    if (error.response?.data) {
      const errData = error.response.data;
      msg = errData.ErrorMessage || errData.errorMessage || errData.Message || errData.message || "Error del servidor";
    } else if (error.message) {
      msg = error.message;
    }

    toast.error(msg);
    return Promise.reject(error);
  }
);

export default apiClient;