import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { serialize } from "cookie";

interface User {
  id_perfil: string;
  email: string;
  name: string;
}

interface ApiResponse {
  dato: "correo" | "nombre" | "id_perfil" | "tiempo_sesion";
  valor: string;
}

const getUserData = (userData: ApiResponse[]): User => ({
  email: userData.find((item) => item.dato === "correo")?.valor || "",
  name: userData.find((item) => item.dato === "nombre")?.valor || "",
  id_perfil: userData.find((item) => item.dato === "id_perfil")?.valor || "",
});

const getSessionTime = (userData: ApiResponse[]): number => {
  const tiempoSesion =
    userData.find((item) => item.dato === "tiempo_sesion")?.valor || "0";
  const sessionTime = parseInt(tiempoSesion, 10);
  if (isNaN(sessionTime)) {
    throw new Error("Invalid session time returned from API");
  }
  return sessionTime;
};

const createAuthCookie = (token: string, sessionTime: number) =>
  serialize("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: sessionTime * 60,
    path: "/",
  });

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            "http://test.vrt-fcs.com/api_migracion/account/Login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const token = response.data?.token;
          if (!token) {
            throw new Error("No token received");
          }

          const userData = response.data?.data || [];
          const user = getUserData(userData);
          const sessionTime = getSessionTime(userData);

          // Crear y enviar la cookie de autenticación
          const cookie = createAuthCookie(token, sessionTime);
          req.res?.setHeader("Set-Cookie", cookie);

          return user;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("API Error:", error.response?.data || error.message);
            if (error.response?.status === 401) {
              throw new Error(
                "Credenciales invalidas. Por favor verifica el email y la contraseña."
              );
            }
          } else {
            console.error("Unexpected error:", error);
          }
          throw new Error("Failed to authenticate");
        }
      },
    }),
  ],
  pages: {},
  callbacks: {
    async signIn({ user }) {
      return !!user; // Verifica si el usuario es válido
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/login"; // Redirige a la página de inicio de sesión
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user; // Asigna el usuario al objeto session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Asigna el usuario al token
      }
      return token;
    },
  },
});
