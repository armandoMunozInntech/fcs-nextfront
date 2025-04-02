import express from "express";
import axios, { isAxiosError } from "axios";

const router = express.Router();

router.post("/ticketsList", async (req, res) => {
  try {
    const response = await axios.get(
      "https://test.vrt-fcs.com/api_migracion/tracking/listar_tickets"
    );

    return res.status(200).json(response?.data?.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("🚨 Error API:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }
    } else {
      console.error(" Error Inesperado:", error);
    }
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/detalleTicket", async (req, res) => {
  const { id } = req.body;
  const idbody = id;
  try {
    const response = await axios({
      method: "get",
      url: "http://test.vrt-fcs.com/api_migracion/tracking/buscar_ticket",
      params: { id: idbody }, // 👈 Pasamos el ID como query params
    });
    console.log("id", response.data.args);

    return res.status(200).json(response?.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("🚨 Error API:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }
    } else {
      console.error(" Error Inesperado:", error);
    }
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
