import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Cambia por tu URL base
  withCredentials: true,
});

// Interceptor para mostrar el loader al iniciar una solicitud
let activeRequests = 0;
let setGlobalLoading: (state: boolean) => void;

export const setLoaderHandler = (handler: (state: boolean) => void) => {
  setGlobalLoading = handler;
};

api.interceptors.request.use((config) => {
  activeRequests++;
  if (setGlobalLoading) setGlobalLoading(true); // Muestra el loader
  return config;
});

api.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0 && setGlobalLoading) setGlobalLoading(false); // Oculta el loader
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0 && setGlobalLoading) setGlobalLoading(false); // Oculta el loader
    return Promise.reject(error);
  }
);

export default api;
