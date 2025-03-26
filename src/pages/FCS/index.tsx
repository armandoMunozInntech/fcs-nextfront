"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Loader from "@/component/common/loader";
import FCSCont from "@/container/FCS/FCSCont";

interface MenuItemProps {
  label: string;
  options?: { label: string; action: () => void }[]; // Opciones internas (submenús)
  action?: () => void; // Acción directa si no tiene submenús
}

const FCS: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loader />;
  }

  // Si no hay sesión, redirige al usuario al inicio de sesión
  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  // Si hay sesión, muestra la página del dashboard
  return <FCSCont />;
};

FCS.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const menuItems: MenuItemProps[] = [
    {
      label: "Formatos y folios",
      action: () => router.push("/FCS"),
    },
    {
      label: "Reenvio Encuesta",
      action: () => router.push("/FCS/Reenvio-Encuesta"),
    },
    {
      label: "Reportes",
      options: [
        {
          label: "Bitacora de usuarios",
          action: () => router.push("/FCS/Reportes/Bitácora"),
        },
        {
          label: "Reporte Bestel",
          action: () => router.push("/FCS/Reportes/Bestel"),
        },
        {
          label: "Ejecución de servicios",
          action: () => router.push("/FCS/Reportes/Ejecucion-servicios"),
        },
        {
          label: "Reporte Garantía",
          action: () => router.push("/FCS/Reportes/Reporte-garantia"),
        },
        {
          label: "Materiales utilizados",
          action: () => router.push("/FCS/Reportes/Materiales-utilizados"),
        },
        {
          label: "Encuesta de calidad",
          action: () => router.push("/FCS/Reportes/Encuesta-calidad"),
        },
      ],
    },
    {
      label: "KPI",
      action: () => router.push("/FCS/KPI"),
    },
  ];
  return <DashboardLayout menuItems={menuItems}>{page}</DashboardLayout>;
};

export default FCS;
