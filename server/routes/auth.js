import express from "express";
import axios, { isAxiosError } from "axios";
import { serialize } from "cookie";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const API_BASE_URL = process.env.API_BASE_URL;

// Función para extraer datos del usuario
const getUserData = (userData) => ({
  email: userData?.find((item) => item.dato === "correo")?.valor || "",
  name: userData?.find((item) => item.dato === "nombre")?.valor || "",
  id_perfil: userData?.find((item) => item.dato === "id_perfil")?.valor || "",
  id_pais: userData?.find((item) => item.dato === "id_pais")?.valor || "",
  pais: userData?.find((item) => item.dato === "pais")?.valor || "",
  sessionTime:
    userData?.find((item) => item.dato === "tiempo_sesion")?.valor || 0,
});

// Función para manejar errores de la API
function handleApiError(error, res) {
  if (isAxiosError(error)) {
    console.error("🚨 Error API:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(401).json({
        message:
          error.response?.data || error.message || "Credenciales inválidas",
      });
    }
  }
  return res.status(500).json({
    message: error.response?.data || error.message || "Error en el servidor",
  });
}

// 🚀 **Ruta de login**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/account/Login`,
      { email, password },
      { credentials: "include" }
    );

    const token = response.data?.token;
    if (!token) {
      return res.status(401).json({ message: "No token received" });
    }
    const userData = response.data?.data || [];
    const user = getUserData(userData);
    if (response.data?.isSuccess) {
      return res.status(200).json({
        message: "Login exitoso",
        user,
      });
    } else {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

// 🚀 **Ruta de logout**
router.post("/logout", (req, res) => {
  console.log("🚪 Cierre de sesión solicitado");

  // Crear cookies expiradas para eliminar las existentes
  const cookieNames = [
    "token",
    "email",
    "name",
    "id_perfil",
    "id_pais",
    "pais",
    "sessionTime",
  ];

  const expiredCookies = cookieNames.map((name) =>
    serialize(name, "", {
      httpOnly: name === "token",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    })
  );

  res.setHeader("Set-Cookie", expiredCookies);

  return res.json({ message: "Logout exitoso" });
});

export default router;
