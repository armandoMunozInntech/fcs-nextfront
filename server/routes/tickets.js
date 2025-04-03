import express from "express";
import axios, { isAxiosError } from "axios";

const router = express.Router();

router.post("/ticketsList", async (req, res) => {
  try {
    const response = await axios.get(
      "https://test.vrt-fcs.com/api_migracion/tracking/listar_tickets"
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data);
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "tracking/listar_tickets🚨 Error API:",
        error.response?.data || error.message
      );
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
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data[0]);
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data);
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/asignaTicketCallcenter", async (req, res) => {
  const { id, id_encargado } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/asigna_ticket_callcenter",
      { params: { id, id_encargado } }
    );

    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/garantiaTicket", async (req, res) => {
  const { id, garantia } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/garantia_ticket",
      { params: { id, garantia } }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/cerrarTicket", async (req, res) => {
  const { id, comentario } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/cerrar_ticket",
      {
        params: { id, comentario },
        validateStatus: () => true, // Permite manejar cualquier código HTTP sin que Axios lo tome como error
      }
    );

    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    console.error("🚨 Error Inesperado:", error);
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});

router.post("/buscarTicket", async (req, res) => {
  const { id } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/buscar_ticket",
      { params: { id } }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/comentarTicket", async (req, res) => {
  const { id, comentario } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/comentar_ticket",
      { params: { id, comentario } }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/actualizarFolio", async (req, res) => {
  const { id, folio } = req.body;

  try {
    const response = await axios.get(
      "http://test.vrt-fcs.com/api_migracion/tracking/actualizar_folio",
      { params: { id, folio } }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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

router.post("/reasignaTicket", async (req, res) => {
  const { id, id_encargado, comentario } = req.body;

  try {
    const response = await axios.post(
      "http://test.vrt-fcs.com/api_migracion/tracking/reasigna_ticket",
      { id, id_encargado, justificacion: comentario }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
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
