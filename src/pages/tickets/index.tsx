"use client";

import React, { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import TicketsCont from "@/container/tickets/ticketsCont";
import { AlertProps } from "@mui/material";
import AlertComp from "@/component/common/alert";
import Loader from "@/component/common/loader";
import api from "@/utils/api";

interface AlertCompProps {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

const Tickets: NextPageWithLayout = () => {
  const [dataTickets, setDataTickets] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
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

  const getTickets = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/tickets/ticketsList");
      setDataTickets(response.data);

      setLoading(false);

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
    getTickets();
    console.log("dataTickets", dataTickets);
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Si hay sesión, muestra la página del dashboard
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
      <TicketsCont dataTickets={dataTickets} />;
    </>
  );
};

Tickets.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tickets;
