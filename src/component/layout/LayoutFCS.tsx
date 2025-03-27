import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Tabs, Tab, Menu, MenuItem } from "@mui/material";

const TABS = [
  { label: "Formatos y folios", path: "/FCS/formatos-folios" },
  { label: "Reenvio encuesta", path: "/FCS/reenvio-encuesta" },
  { label: "Reportes", path: "/FCS/reportes" },
];

const REPORTES_MENU = [
  { label: "Bitácora de usuarios", path: "/FCS/reportes/bitacora" },
  { label: "Reporte Bestel", path: "/FCS/reportes/bestel" },
  {
    label: "Ejecución de servicios",
    path: "/FCS/reportes/ejecucion-servicios",
  },
  { label: "Reporte Garantía", path: "/FCS/reportes/reporte-garantia" },
  {
    label: "Materiales utilizados",
    path: "/FCS/reportes/materiales-utilizados",
  },
  { label: "Encuesta de calidad", path: "/FCS/reportes/encuesta-calidad" },
];

const TabsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Estado para controlar el menú flotante
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const selectedTab = TABS[newValue];

    if (selectedTab.label === "Reportes") {
      return; // No navegamos directamente, se maneja por el menú flotante
    }
    router.push(selectedTab.path); // Navegamos a la ruta del tab seleccionado
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleCloseMenu();
    router.push(path); // Navegamos a la ruta seleccionada en el menú
  };

  // Determinar el tab seleccionado según la ruta actual
  const currentIndex = TABS.findIndex((tab) => {
    if (tab.path === "/FCS/reportes") {
      return currentPath.startsWith("/FCS/reportes"); // Cualquier subruta de reportes pertenece a este tab
    }
    return currentPath === tab.path; // Comparar directamente para otras rutas
  });

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs principales */}
      <Tabs value={currentIndex} onChange={handleTabChange}>
        {TABS.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            onClick={
              tab.label === "Reportes"
                ? handleOpenMenu // Abrir el menú flotante para "Reportes"
                : undefined
            }
          />
        ))}
      </Tabs>

      {/* Menú flotante para "Reportes" */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {REPORTES_MENU.map((item) => (
          <MenuItem key={item.path} onClick={() => handleMenuClick(item.path)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Contenido del tab seleccionado */}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Box>
  );
};

export default TabsLayout;
