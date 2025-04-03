import express from "express";
import axios, { isAxiosError } from "axios";
import { serialize, parse } from "cookie";

const router = express.Router();

// Función para extraer datos del usuario
const getUserData = (userData) => ({
  email: userData.find((item) => item.dato === "correo")?.valor || "",
  name: userData.find((item) => item.dato === "nombre")?.valor || "",
  id_perfil: userData.find((item) => item.dato === "id_perfil")?.valor || "",
  id_pais: userData.find((item) => item.dato === "id_pais")?.valor || "",
  pais: userData.find((item) => item.dato === "pais")?.valor || "",
  sessionTime: getSessionTime(),
});

// Función para obtener tiempo de sesión
const getSessionTime = (userData) => {
  const tiempoSesion =
    userData.find((item) => item.dato === "tiempo_sesion")?.valor || "0";
  return parseInt(tiempoSesion, 10) || 0;
};

// 🚀 **Ruta de login**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      "http://test.vrt-fcs.com/api_migracion/account/Login",
      { email, password },
      { credentials: "include" }
    );

    const token = response.data?.token;
    if (!token) {
      return res.status(401).json({ message: "No token received" });
    }

    const userData = response.data?.data || [];
    const user = getUserData(userData);
    const sessionTime = getSessionTime(userData);


    res.setHeader("Set-Cookie", cookies);

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
      console.error("Error Inesperado:", error);
    }
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🚀 **Ruta de logout**
router.post("/logout", (req, res) => {
  console.log("🚪 Cierre de sesión solicitado");

  // Crear cookies expiradas para eliminar las existentes
  const expiredCookies = [
    serialize("token", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    }),
    serialize("email", "", {
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    }),
    serialize("name", "", {
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    }),
    serialize("id_perfil", "", {
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    }),
  ];

  res.setHeader("Set-Cookie", expiredCookies);

  return res.json({ message: "Logout exitoso" });
});

// 🚀 **Ruta para obtener los datos del usuario desde la cookie**
router.get("/me", (req, res) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.token || null;
  const email = cookies.email || null;
  const name = cookies.name || null;
  const id_perfil = cookies.id_perfil || null;

  if (!token || !email) {
    return res.status(401).json({ message: "No autenticado" });
  }

  return res.json({ token, email, name, id_perfil });
});

export default router;
