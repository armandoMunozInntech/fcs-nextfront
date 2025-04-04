import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Drawer,
  CssBaseline,
  // Container,
  // CircularProgress,
  Collapse,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import Header from "./header";
import MenuLeft from "./menuLeft";
import { lightTheme, darkTheme } from "@/styles/theme";

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
  {
    label: "Tickets",
    link: "/tickets",
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [open, setOpen] = useState(!!!isSmallScreen);
  // const [selectedFlag, setSelectedFlag] = useState("mexico"); // México como predeterminado
  const drawerWidth = isSmallScreen ? "100%" : 240;
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const togglerDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // // Mientras se carga la sesión
  // if (status === "loading") {
  //   return (
  //     <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  // // Si no hay sesión, redirige al usuario al inicio de sesión
  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     router.push("/login");
  //   }
  //   return null;
  // }

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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <Header
          togglerDrawer={togglerDrawer}
          // selectedFlag={selectedFlag}
          // setSelectedFlag={setSelectedFlag}
          menuItems={menuItems}
          setClose={setOpen}
          title={currentTitle}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
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
                borderRight: "1px solid rgba(0, 0, 0, 0.6)",
              },
            }}
            open={open}
          >
            <MenuLeft setClose={setOpen} />
          </Drawer>
        </Collapse>
        <Box
          component="main"
          sx={{
            width: open
              ? isSmallScreen
                ? "0"
                : `calc(100% - ${drawerWidth}px)`
              : "100%",
            display: open && isSmallScreen ? "none" : "block",
            transition: "width 0.3s ease-out",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;
