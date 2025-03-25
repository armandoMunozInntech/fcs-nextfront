import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Box,
  Drawer,
  CssBaseline,
  Container,
  CircularProgress,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "./header";
import MenuLeft from "./menuLeft";

interface MenuItemProps {
  label: string;
  options?: { label: string; action: () => void }[]; // Opciones internas (submenús)
  action?: () => void; // Acción directa si no tiene submenús
}

interface DashboardLayoutProps {
  children: ReactNode;
  menuItems?: MenuItemProps[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  menuItems,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(isSmallScreen);
  const [selectedFlag, setSelectedFlag] = useState("mexico"); // México como predeterminado
  const drawerWidth = isSmallScreen ? "100%" : 240;

  const togglerDrawer = () => {
    setOpen(!open);
  };

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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        togglerDrawer={togglerDrawer}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
        menuItems={menuItems}
        setClose={setOpen}
      />
      <Collapse
        orientation="horizontal"
        in={open}
        sx={{
          transition: "ease-out",
        }}
      >
        <Drawer
          variant="persistent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "ease-out",
            },
          }}
          open={open}
        >
          <MenuLeft setClose={setOpen} />
        </Drawer>
      </Collapse>
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
