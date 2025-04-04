import api from "@/utils/api";
import { getUserData } from "../utils/userData";
import { deleteCookie, setCookie } from "cookies-next";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/account/Login", { email, password });
    const token = response.data?.token;

    if (!token) throw new Error("No token received");

    const userData = response?.data?.user;
    Object.entries(userData).forEach(([key, value]) => {
      setCookie(key, value || "", {
        maxAge: 60 * 60 * 1000,
        path: "/",
      });
    });
    return {
      status: 200,
      message: "Login exitoso",
      user: getUserData(response.data?.data || []),
    };
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
    deleteCookie('name');
    deleteCookie('id_pais');
    deleteCookie('id_perfil');
    deleteCookie('email');
    deleteCookie('pais');
    deleteCookie('sessionTime');
    return { status: 200, message: "Logout exitoso" };
    
  } catch (error) {
    return error;
  }
};
