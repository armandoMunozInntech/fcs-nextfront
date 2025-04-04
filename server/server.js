import express from "express";
import next from "next";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import ticketsRoutes from "./routes/tickets.js";
import dotenv from "dotenv";

dotenv.config();
const dev = process.env.NODE_ENV !== "prod";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";


app.prepare().then(() => {
  const server = express();

  server.use(
    cors({
      origin: FRONTEND_URL, // Permitir peticiones desde el frontend
      methods: "GET, POST, PUT, DELETE", // Métodos permitidos
      credentials: true, // Permitir cookies si usas autenticación
    })
  );

  server.use(express.json()); // Middleware para JSON

  // Usar rutas definidas
  server.use("/api/auth", authRoutes);
  server.use("/api/tickets", ticketsRoutes);

  // Manejar todas las demás rutas con Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en ${FRONTEND_URL}, Puerto backfront: ${PORT}`);
  });
});
