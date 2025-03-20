import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "./_app";
import Loader from "@/component/common/loader";

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
      <Button
        variant="contained"
        color="primary"
        onClick={() => signOut()}
        sx={{ mt: 2 }}
      >
        Cerrar sesión
      </Button>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
