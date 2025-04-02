"use client";

// import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
// import Loader from "@/component/common/loader";
import DetalleTicketCont from "@/container/tickets/detalleTicketCont";
import axios from "axios";
import { AlertProps } from "@mui/material";
import { useRouter } from "next/router";

interface AlertCompProps {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

const DetalleTicket: NextPageWithLayout = () => {
  const router = useRouter();
  const [dataDetalleTicket, setDetalleTicket] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // if (status === "loading") {
  //   return <Loader />;
  // }

  // // Si no hay sesión, redirige al usuario al inicio de sesión
  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     router.push("/login");
  //   }
  //   return null;
  // }
  const getDetalleTicket = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tickets/detalleTicket",
        { id: router.query.slug }
      );
      console.log("detalle", response.data);
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
      return true;
    }
  };

  useEffect(() => {
    getDetalleTicket();
    console.log("dataDetalleTicket", dataDetalleTicket);
  }, []);

  return <DetalleTicketCont dataDetalleTicket={dataDetalleTicket} />;
};

DetalleTicket.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DetalleTicket;
