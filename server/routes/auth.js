import express from "express";
import axios, { isAxiosError } from "axios";
import { serialize, parse } from "cookie";

const router = express.Router();

// Función para extraer datos del usuario
const getUserData = (userData) => ({
  email: userData.find((item) => item.dato === "correo")?.valor || "",
  name: userData.find((item) => item.dato === "nombre")?.valor || "",
  id_perfil: userData.find((item) => item.dato === "id_perfil")?.valor || "",
});

// Función para obtener tiempo de sesión
const getSessionTime = (userData) => {
  const tiempoSesion =
    userData.find((item) => item.dato === "tiempo_sesion")?.valor || "0";
  return parseInt(tiempoSesion, 10) || 0;
};

// Función para crear cookie de autenticación con usuario y token
const createAuthCookie = (token, user, sessionTime) =>
  serialize("authData", JSON.stringify({ token, user }), {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: sessionTime * 60, // Convertir minutos a segundos
    path: "/",
  });

// 🚀 **Ruta de login**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      "http://test.vrt-fcs.com/api_migracion/account/Login",
      { email, password }
    );

    const token = response.data?.token;
    if (!token) {
      return res.status(401).json({ message: "No token received" });
    }

    const userData = response.data?.data || [];
    const user = getUserData(userData);
    const sessionTime = getSessionTime(userData);

    // 🛠 **Crear cookie con usuario y token**
    res.setHeader("Set-Cookie", createAuthCookie(token, user, sessionTime));

    return res.json({
      message: "Login exitoso",
      user,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("🚨 Error API:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        return res.status(401).json({
          message: "Credenciales inválidas. Verifica email y contraseña.",
        });
      }
    } else {
      console.error(" Error Inesperado:", error);
    }
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🚀 **Ruta de logout**
router.post("/logout", (req, res) => {
  console.log("🚪 Cierre de sesión solicitado");

  // Crear una cookie expirada para borrar la existente
  res.setHeader(
    "Set-Cookie",
    serialize("authData", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expira inmediatamente
      path: "/",
    })
  );

  return res.json({ message: "Logout exitoso" });
});

// 🚀 **Ruta para obtener los datos del usuario desde la cookie**
router.get("/me", (req, res) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const authData = cookies.authData ? JSON.parse(cookies.authData) : null;

  if (!authData || !authData.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  return res.json(authData.user);
});

export default router;
