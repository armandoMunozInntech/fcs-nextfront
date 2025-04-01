import { useRouter } from "next/router";
import { Typography, Container } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Loader from "@/component/common/loader";

const Dashboard: NextPageWithLayout = () => {
  // const { userData, setUserData } = useState();
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading") {
  //   return <Loader />;
  // }

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/me", {
        credentials: "include", // Para incluir cookies en la solicitud
      });

      // if (!res.ok) {
      //   throw Error("No autenticado");
      // }
      // console.log("me dashboard", await res.json());

      // const user = await res.json();
      // setUserData(user);
      // console.log("👤 Usuario autenticado:", user);
      return true;
    } catch (error) {
      console.error("❌ Error obteniendo usuario:", error);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Si no hay sesión, redirige al usuario al inicio de sesión
  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     router.push("/login");
  //   }
  //   return null;
  // }

  // Si hay sesión, muestra la página del dashboard
  return (
    <Container sx={{ mt: 4, minWidth: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
