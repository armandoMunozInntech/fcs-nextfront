"use client";

// import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
// import Loader from "@/component/common/loader";
import DetalleTicketCont from "@/container/tickets/detalleTicketCont";
import { AlertProps } from "@mui/material";
import { useRouter } from "next/router";
import AlertComp from "@/component/common/alert";
import Loader from "@/component/common/loader";
import { getCookie } from "cookies-next";
import api from "@/utils/api";

interface AlertCompProps {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

interface Ticket {
  coordinator: string;
  category_cause: string;
  subcategory_cause: string;
  actions_history: ActionHistory[];
  serial_history: SerialHistoryProps[];
  id: number;
  ticket: string;
  status: string;
  client: string;
  site: string;
  serial: string;
  cause: string;
  type_service: string | null;
  registration_date: string;
}
interface SerialHistoryProps {
  serie: string;
  folio: string;
  fecha: string;
}

interface ActionHistory {
  usuario: string;
  estatus: string; // Parece un error de escritura, debería ser "estatus"?
  fecha: string;
  comentario: string;
}

interface EncargadoProps {
  id: string;
  valor: string;
}

const DetalleTicket: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [dataDetalleTicket, setDetalleTicket] = useState<Ticket | null>(null);
  const [encargado, setEncargado] = useState<EncargadoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
  
  const id_pais = getCookie("id_pais");
  // const { data: session, status } = useSession();

  // // Si no hay sesión, redirige al usuario al inicio de sesión
  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     router.push("/login");
  //   }
  //   return null;
  // }

  const getDetalleTicket = async (id: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/detalleTicket", { id });

      if (response.data && !response.data?.isSuccess) {
        setDetalleTicket(response.data);
        setLoading(false);
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "Falla en servicio",
        });
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const getEncargado = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/encargadoTicket", {
        id_pais,
      });

      if (response.data && !response.data?.isSuccess) {
        setEncargado(response.data);
        setLoading(false);
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "Falla en servicio",
        });
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const asignaTicket = async (encargado: string, procede: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/asignaTicket", {
        id: dataDetalleTicket?.id,
        id_encargado: encargado,
        procede,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El ticket se asignó con exito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo asignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const reasignaTicket = async (encargado: string, comentario: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/reasignaTicket", {
        id: dataDetalleTicket?.id,
        id_encargado: encargado,
        comentario,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El ticket se reasigno con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo reasignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const asignaTicketCallcenter = async (encargado: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/asignaTicketCallcenter", {
        id: dataDetalleTicket?.id,
        id_encargado: encargado,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El ticket se asignó con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo asignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const garantiaTicket = async (garantia: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/asignaTicket", {
        id: dataDetalleTicket?.id,
        garantia,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El cambio estatus con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo cambiar estatus del ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const cerrarTicket = async (comentario: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/cerrarTicket", {
        id: dataDetalleTicket?.id,
        comentario,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El ticket se cerró con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo cerrar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const comentarTicket = async (comentario: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/comentarTicket", {
        id: dataDetalleTicket?.id,
        comentario,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "Se agrego observación con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo agregar observación el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const actualizarFolio = async (folio: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/tickets/actualizarFolio", {
        id: dataDetalleTicket?.id,
        folio,
      });

      if (response.data?.isSuccess) {
        getDetalleTicket(slug as string);
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "El folio se actualizo con éxito",
        });
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.data?.message || "No se pudo actualizar el folio",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en cerrarTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.data?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEncargado();
  }, []);

  useEffect(() => {
    if (slug) {
      getDetalleTicket(slug as string);
    }
  }, [slug]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {showAlert && (
        <AlertComp
          severity={alertInfo.severity}
          title={alertInfo.title}
          message={alertInfo.message}
          show={showAlert}
          handleShow={setShowAlert}
        />
      )}
      <DetalleTicketCont
        dataDetalleTicket={dataDetalleTicket}
        encargado={encargado}
        asignaTIcket={asignaTicket}
        garantiaTicket={garantiaTicket}
        cerrarTicket={cerrarTicket}
        actualizarFolio={actualizarFolio}
        comentarTicket={comentarTicket}
        reasignaTicket={reasignaTicket}
        asignaTicketCallcenter={asignaTicketCallcenter}
      />
      ;
    </>
  );
};

DetalleTicket.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DetalleTicket;
