import React from "react";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  ExpandLess,
  ExpandMore,
  Task,
} from "@mui/icons-material";
import { useRouter } from "next/router";

// Define el tipo para los elementos del menú
type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  link?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    label: "FCS",
    icon: <HomeIcon />,
    children: [
      {
        label: "FCS Field Customer",
        link: "/FCS",
        children: [
          { label: "Formatos y Folios", link: "/FCS/formatos-folios" },
          { label: "Reenvio Encuesta", link: "/FCS/reenvio-encuesta" },
          {
            label: "Reporte",
            children: [
              {
                label: "Bitacora de usuarios",
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
    icon: <Task />,
    link: "/tickets",
  },
];

interface MenuLeftProps {
  setClose: (value: boolean) => void;
}

const MenuLeft: React.FC<MenuLeftProps> = ({ setClose }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openSubMenus, setOpenSubMenus] = React.useState<string[]>([]);

  // Función para determinar si una ruta está activa
  const isActive = (link?: string) =>
    link ? router.pathname.startsWith(link) : false;

  // Función para alternar submenús
  const handleToggle = (label: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Renderizar elementos del menú
  const renderMenuItems = (items: MenuItem[], level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.label}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (item.children) {
                handleToggle(item.label);
              } else if (item.link) {
                if (isSmallScreen) setClose(false);
                router.push(item.link);
              }
            }}
            sx={{
              pl: level * 2,
              backgroundColor: isActive(item.link)
                ? "rgba(244, 98, 0, 0.3)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(244, 98, 0, 0.1)",
              },
            }}
          >
            {item.icon && level === 0 && (
              <ListItemIcon>{item.icon}</ListItemIcon>
            )}
            <ListItemText primary={item.label} />
            {item.children &&
              (openSubMenus.includes(item.label) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              ))}
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse
            in={openSubMenus.includes(item.label)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {renderMenuItems(item.children, level + 1)}
            </List>
          </Collapse>
        )}
        <Divider />
      </React.Fragment>
    ));

  return (
    <Box>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>{renderMenuItems(menuItems)}</List>
      </Box>
    </Box>
  );
};

export default MenuLeft;
