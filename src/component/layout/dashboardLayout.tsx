import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
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

interface DashboardLayoutProps {
  children: ReactNode;
}

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  link?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    label: "FCS",
    children: [
      {
        label: "FCS Field Customer",
        link: "/FCS",
        children: [
          { label: "Formatos y Folios", link: "/FCS/formatos-folios" },
          { label: "Reenvio de Encuesta", link: "/FCS/reenvio-encuesta" },
          {
            label: "Reporte",
            children: [
              {
                label: "Bitácora de usuarios",
                link: "/FCS/reportes/bitacora",
              },
              {
                label: "Reporte Bestel",
                link: "/FCS/reportes/Bestel",
              },
              {
                label: "Ejecución de servicios",
                link: "/FCS/reportes/Ejecucion-servicios",
              },
              {
                label: "Reporte Garantía",
                link: "/FCS/reportes/Reporte-garantia",
              },
              {
                label: "Materiales utilizados",
                link: "/FCS/reportes/Materiales-utilizados",
              },
              {
                label: "Encuesta de calidad",
                link: "/FCS/reportes/Encuesta-calidad",
              },
            ],
          },
        ],
      },
    ],
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(!!!isSmallScreen);
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

  const findTitleByPath = (
    items: MenuItem[],
    currentPath: string
  ): string | null => {
    for (const item of items) {
      if (item.children) {
        const childTitle = findTitleByPath(item.children, currentPath);
        if (childTitle) {
          return childTitle;
        }
      }
      if (item.link && currentPath.startsWith(item.link)) {
        return item.label;
      }
    }
    return null;
  };

  const currentTitle = findTitleByPath(menuItems, router.pathname) || "Inicio";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        togglerDrawer={togglerDrawer}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
        menuItems={menuItems}
        setClose={setOpen}
        title={currentTitle}
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
