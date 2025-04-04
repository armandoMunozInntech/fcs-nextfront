/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  actualizarFolio,
  asignaTicket,
  asignaTicketCallcenter,
  cerrarTicket,
  comentarTicket,
  detalleTicket,
  encargadoTicket,
  garantiaTicket,
  reasignaTicket,
} from "@/api/tickets";

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
      const response = await detalleTicket(id);
      console.log("getDetalleTicket", response);

      if (response && !response?.data?.isSuccess) {
        setDetalleTicket(response?.data[0]);
        setLoading(false);
      } else {
        setAlertInfo({
          severity: "warning",
          title: "Aviso",
          message: response.message || "Falla en servicio",
        });
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error("🚨 Error en detalleTicket:", error);

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
      const response = await encargadoTicket(id_pais as string);

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
      console.error("🚨 Error en getEncargado:", error);

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

  const getAsignaTicket = async (encargado: string, procede: string) => {
    setLoading(true);

    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await asignaTicket(id, encargado, procede);

      if (response.isSuccess) {
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
          message: response.message || "No se pudo asignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en asignaTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const getReasignaTicket = async (encargado: string, comentario: string) => {
    setLoading(true);

    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await reasignaTicket(id, encargado, comentario);

      if (response.isSuccess) {
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
          message: response.message || "No se pudo reasignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en reasignaTicket:", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message:
          error.response?.message || error.message || "Error desconocido",
      });
    } finally {
      setShowAlert(true);
      setLoading(false);
    }
  };

  const getAsignaTicketCallcenter = async (encargado: string) => {
    setLoading(true);
    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await asignaTicketCallcenter(id, encargado);
      if (response.isSuccess) {
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
          message: response.message || "No se pudo asignar el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en asignaTicketCallcenter:", error);

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

  const getGarantiaTicket = async (garantia: string) => {
    setLoading(true);
    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await garantiaTicket(id, garantia);

      if (response.isSuccess) {
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
          message: response.message || "No se pudo cambiar estatus del ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en garantiaTicket:", error);

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

  const getCerrarTicket = async (comentario: string) => {
    setLoading(true);
    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await cerrarTicket(id, comentario);

      if (response.isSuccess) {
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
          message: response.message || "No se pudo cerrar el ticket",
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

  const getComentarTicket = async (comentario: string) => {
    setLoading(true);
    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await comentarTicket(id, comentario);

      if (response.isSuccess) {
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
          message:
            response.message || "No se pudo agregar observación el ticket",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en comentarTicket:", error);

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

  const getActualizarFolio = async (folio: string) => {
    setLoading(true);
    const id = (dataDetalleTicket?.id as unknown as string) || "";
    try {
      const response = await actualizarFolio(id, folio);

      console.log(response.data?.isSuccess);

      if (response?.isSuccess) {
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
          message: response.message || "No se pudo actualizar el folio",
        });
      }
    } catch (error: any) {
      console.error("🚨 Error en actualizarFolio:", error);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        asignaTIcket={getAsignaTicket}
        garantiaTicket={getGarantiaTicket}
        cerrarTicket={getCerrarTicket}
        actualizarFolio={getActualizarFolio}
        comentarTicket={getComentarTicket}
        reasignaTicket={getReasignaTicket}
        asignaTicketCallcenter={getAsignaTicketCallcenter}
      />
    </>
  );
};

DetalleTicket.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DetalleTicket;
