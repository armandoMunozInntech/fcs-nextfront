import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, CircularProgress, Typography, Container } from "@mui/material";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mientras se carga la sesión
  if (status === "loading") {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
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
    <Container sx={{ mt: 4 }}>
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

export default Dashboard;
