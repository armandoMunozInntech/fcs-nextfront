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

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/buscar_ticket",
      { params: { id } }
    );

    return res.status(200).json(response?.data?.data[0]);
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

router.post("/encargadoTicket", async (req, res) => {
  const { id_pais } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/account/listar_coordinadores",
      { params: { id_pais } }
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

router.post("/asignaTicket", async (req, res) => {
  const { id, id_encargado, procede } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/asigna_ticket",
      { params: { id, id_encargado, procede } }
    );
    console.log("response asigna server", response.data);

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
    return res.status(500).json(error.response?.data || error.message);
  }
});

export default router;
