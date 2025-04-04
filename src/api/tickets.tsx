import api from "@/utils/api";

export const ticketsList = async () => {
  try {
    const response = await api.get(`/api/tracking/listar_tickets`);
    if (response.data?.isSuccess) {
      return response?.data?.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const detalleTicket = async (id: string) => {
  try {
    const response = await api.get(`/api/tracking/buscar_ticket`, {
      params: { id },
    });
    if (response.data?.isSuccess) {
      return response?.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const encargadoTicket = async (id_pais: string) => {
  try {
    const response = await api.get(`/api/account/listar_coordinadores`, {
      params: { id_pais },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response?.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const asignaTicket = async (
  id: string,
  id_encargado: string,
  procede: string
) => {
  try {
    const response = await api.get(`/api/tracking/asigna_ticket`, {
      params: { id, id_encargado, procede },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const asignaTicketCallcenter = async (
  id: string,
  id_encargado: string
) => {
  try {
    const response = await api.get(`/api/tracking/asigna_ticket_callcenter`, {
      params: { id, id_encargado },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const garantiaTicket = async (id: string, garantia: string) => {
  try {
    const response = await api.get(`/api/tracking/garantia_ticket`, {
      params: { id, garantia },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const cerrarTicket = async (id: string, comentario: string) => {
  try {
    const response = await api.get(`/api/tracking/cerrar_ticket`, {
      params: { id, comentario },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const buscarTicket = async (id: string) => {
  try {
    const response = await api.get(`/api/tracking/buscar_ticket`, {
      params: { id },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const comentarTicket = async (id: string, comentario: string) => {
  try {
    const response = await api.get(`/api/tracking/comentar_ticket`, {
      params: { id, comentario },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const actualizarFolio = async (id: string, folio: string) => {
  try {
    const response = await api.get(`/api/tracking/actualizar_folio`, {
      params: { id, folio },
      validateStatus: () => true,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const reasignaTicket = async (
  id: string,
  id_encargado: string,
  comentario: string
) => {
  try {
    const response = await api.post(`/api/tracking/reasigna_ticket`, {
      id,
      id_encargado,
      justificacion: comentario,
    });
    if (response.data?.isSuccess) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
