/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, isAxiosError } from "axios";

// Base de la API con credenciales
const api = axios.create({
  withCredentials: true,
});

// Interceptor para mostrar el loader al iniciar una solicitud
let activeRequests = 0;
let setGlobalLoading: (state: boolean) => void;

export const setLoaderHandler = (handler: (state: boolean) => void) => {
  setGlobalLoading = handler;
};

// 🚀 **Manejo global de errores**
function handleApiError(error: any, res: any) {
  if (isAxiosError(error)) {
    console.error("🚨 Error API:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(401).json({
        message:
          error.response?.data?.message ||
          error.message ||
          "Credenciales inválidas",
      });
    }
  } else {
    console.error(" Error Inesperado:", error);
  }
  return res.status(500).json({
    message:
      error.response?.data?.message || error.message || "Error en el servidor",
  });
}

// 🛠 **Interceptor de respuestas para manejar errores**
api.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0 && setGlobalLoading) setGlobalLoading(false); // Oculta el loader
    return response;
  },
  (error: AxiosError) => {
    activeRequests--;
    if (activeRequests === 0 && setGlobalLoading) setGlobalLoading(false); // Oculta el loader
    return Promise.reject(handleApiError(error, api.interceptors.response));
  }
);

export default api;
