import express from "express";
import axios, { isAxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const API_BASE_URL = process.env.API_BASE_URL;

// Función para manejar errores de la API
function handleApiError(error, res) {
  if (isAxiosError(error)) {
    console.error("🚨 Error API:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(401).json({
        message:
          error.response?.data?.message ||
          error.message ||
          "Credenciales inválidas",
      });
    }
  } else {
    console.error(" Error Inesperado:", error);
  }
  return res.status(500).json({
    message:
      error.response?.data?.message || error.message || "Error en el servidor",
  });
}

router.post("/ticketsList", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tracking/listar_tickets`);
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data);
    } else {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/detalleTicket", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await axios.get(`${API_BASE_URL}/tracking/buscar_ticket`, {
      params: { id },
    });
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data[0]);
    } else {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/encargadoTicket", async (req, res) => {
  const { id_pais } = req.body;
  try {
    const response = await axios.get(
      `${API_BASE_URL}/account/listar_coordinadores`,
      { params: { id_pais }, validateStatus: () => true }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response?.data?.data);
    } else {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/asignaTicket", async (req, res) => {
  const { id, id_encargado, procede } = req.body;

  try {
    const response = await axios.get(`${API_BASE_URL}/tracking/asigna_ticket`, {
      params: { id, id_encargado, procede },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/asignaTicketCallcenter", async (req, res) => {
  const { id, id_encargado } = req.body;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/tracking/asigna_ticket_callcenter`,
      {
        params: { id, id_encargado },
        validateStatus: () => true,
      }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/garantiaTicket", async (req, res) => {
  const { id, garantia } = req.body;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/tracking/garantia_ticket`,
      {
        params: { id, garantia },
        validateStatus: () => true,
      }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/cerrarTicket", async (req, res) => {
  const { id, comentario } = req.body;

  try {
    const response = await axios.get(`${API_BASE_URL}/tracking/cerrar_ticket`, {
      params: { id, comentario },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/buscarTicket", async (req, res) => {
  const { id } = req.body;

  try {
    const response = await axios.get(`${API_BASE_URL}/tracking/buscar_ticket`, {
      params: { id },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/comentarTicket", async (req, res) => {
  const { id, comentario } = req.body;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/tracking/comentar_ticket`,
      {
        params: { id, comentario },
        validateStatus: () => true,
      }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/actualizarFolio", async (req, res) => {
  const { id, folio } = req.body;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/tracking/actualizar_folio`,
      {
        params: { id, folio },
        validateStatus: () => true,
      }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

router.post("/reasignaTicket", async (req, res) => {
  const { id, id_encargado, comentario } = req.body;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/tracking/reasigna_ticket`,
      {
        params: { id, id_encargado, justificacion: comentario },
        validateStatus: () => true,
      }
    );
    if (response.data?.isSuccess) {
      return res.status(200).json(response.data); // ✅ Éxito
    } else {
      return res.status(200).json(response.data); // ❌ Error controlado de la API
    }
  } catch (error) {
    handleApiError(error, res);
  }
});

export default router;
