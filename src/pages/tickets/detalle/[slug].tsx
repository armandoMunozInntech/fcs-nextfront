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
      const response = await api.post(
        "/api/tickets/detalleTicket",
        { id }
      );
      console.log(response.data);

      setDetalleTicket(response.data);
      setAlertInfo({
        severity: "success",
        title: "Exito: ",
        message: "Se ha cargado con exito",
      });
      setLoading(false);
      setShowAlert(true);

      return response;
    } catch (error) {
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Error desconocido",
      });
      setShowAlert(true);
      setLoading(false);
      return error;
    }
  };

  const getEncargado = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        "/api/tickets/encargadoTicket",
        { id_pais }
      );
      setAlertInfo({
        severity: "success",
        title: "Exito: ",
        message: "Se ha cargado con exito",
      });
      setEncargado(response.data);
      setLoading(false);
      setShowAlert(true);

      return response;
    } catch (error) {
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Error desconocido",
      });
      setShowAlert(true);
      setLoading(false);
      return error;
    }
  };

  const asignaTIcket = async (encargado: string, procede: string) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/api/tickets/asignaTicket",
        { id: dataDetalleTicket?.id, id_encargado: encargado, procede }
      );

      getDetalleTicket(slug as string);
      setAlertInfo({
        severity: "success",
        title: "Exito: ",
        message: "Se asignó con éxito",
      });
      setLoading(false);
      setShowAlert(true);

      return response;
    } catch (error) {
      console.log("error", error);

      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Error desconocido",
      });
      setShowAlert(true);
      setLoading(false);
      return error;
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
        asignaTIcket={asignaTIcket}
      />
      ;
    </>
  );
};

DetalleTicket.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DetalleTicket;
