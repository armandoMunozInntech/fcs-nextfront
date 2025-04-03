import { Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";

const Dashboard: NextPageWithLayout = () => {
  // const { userData, setUserData } = useState();
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading") {
  //   return <Loader />;
  // }


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
