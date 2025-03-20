import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  // Otros campos según lo que te devuelva la API
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Llamada a la API para autenticar al usuario
          const response = await axios.post(
            "https://test.vrt-fcs.com/api_vrt/api/login/Login",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { withCredentials: true }
          );

          console.log("response ---->", response);

          if (response.data?.user) {
            const user: User = response.data.user; // Asegúrate de que los datos coincidan con la interfaz User
            return user;
          } else {
            // Si no hay usuario, retornar null
            return null;
          }
        } catch (error) {
          const userError: User = {
            id: "error",
            email: "email@error.com",
            name: "Armando Muñoz",
          };
          console.error(
            "Error durante el inicio de sesión: ",
            error?.response?.data
          );
          return userError;
        }
      },
    }),
  ],
  pages: {},
  callbacks: {
    async signIn({ user }) {
      return user ? true : false; // Devuelve true si el usuario es válido
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/login"; // Redirige a la URL base
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
