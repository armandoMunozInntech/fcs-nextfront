import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Loader from "@/component/common/loader";

interface MenuItemProps {
  label: string;
  options?: { label: string; action: () => void }[]; // Opciones internas (submenús)
  action?: () => void; // Acción directa si no tiene submenús
}

const menuItems: MenuItemProps[] = [
  {
    label: "Formatos y folios",
    action: () => console.log("Formatos y folios"),
  },
  {
    label: "Reenvio Encuesta",
    options: [
      {
        label: "Reenvio Encuesta",
        action: () => console.log("Bitácora"),
      },
      { label: "Reportes", action: () => console.log("Bestel") },
    ],
  },
  {
    label: "Reportes",
    options: [
      {
        label: "Bitacora de usuarios",
        action: () => console.log("Bitácora"),
      },
      { label: "Reportes", action: () => console.log("Bestel") },
    ],
  },
  {
    label: "Reportes",
    options: [
      {
        label: "Bitacora de usuarios",
        action: () => console.log("Bitácora"),
      },
      { label: "Reportes", action: () => console.log("Bestel") },
    ],
  },
  {
    label: "Reportes",
    options: [
      {
        label: "Bitacora de usuarios",
        action: () => console.log("Bitácora"),
      },
      { label: "Reportes", action: () => console.log("Bestel") },
    ],
  },
  {
    label: "Reportes",
    options: [
      {
        label: "Bitacora de usuarios",
        action: () => console.log("Bitácora"),
      },
      { label: "Reportes", action: () => console.log("Bestel") },
    ],
  },
  {
    label: "KPI",
    action: () => console.log("KPI Clicked"),
  },
];

const Dashboard: NextPageWithLayout = () => {
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
  return (
    <Container sx={{ mt: 4, minWidth: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {session.user?.name || "Usuario"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tu correo: {session.user?.email}
      </Typography>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout menuItems={menuItems}>{page}</DashboardLayout>;
};

export default Dashboard;
