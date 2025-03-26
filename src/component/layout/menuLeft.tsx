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
  Settings as SettingsIcon,
  Assignment as TicketsIcon,
  Mail as MailIcon,
  ExpandLess,
  ExpandMore,
  PhoneIphone,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "FCS",
    icon: <HomeIcon />,
    children: [
      {
        label: "FCS Field Customer",
        link: "/FCS",
        children: [
          { label: "Formatos y Folios", link: "/FCS/formatos-folios" },
          { label: "Reenvio Encuesta", link: "/FCS/Reenvio-encuesta" },
          {
            label: "Reporte",
            children: [
              {
                label: "Bitacora de usuarios",
                link: "/FCS/Reportes/Bitacora",
              },
              {
                label: "Reporte Bestel",
                link: "/FCS/Reportes/Bestel",
              },
              {
                label: "Ejecución de servicios",
                link: "/FCS/Reportes/Ejecucion-servicios",
              },
              {
                label: "Reporte Garantía",
                link: "/FCS/Reportes/Reporte-garantia",
              },
              {
                label: "Materiales utilizados",
                link: "/FCS/Reportes/Materiales-utilizados",
              },
              {
                label: "Encuesta de calidad",
                link: "/FCS/Reportes/Encuesta-calidad",
              },
            ],
          },
        ],
      },
      { label: "SRC Refacciones", link: "/FCS/SRC-Refacciones" },
      { label: "Equipos", link: "/FCS/Equipos" },
      { label: "Clientes", link: "/FCS/Equipos" },
      { label: "EPP", link: "/FCS/EPP" },
      { label: "Portal Bestel", link: "/FCS/Portal-Bestel" },
      { label: "Calendario Actividades", link: "/FCS/Calendario-Actividades" },
    ],
  },
  {
    label: "Configuración",
    icon: <SettingsIcon />,
    children: [
      { label: "Usuarios", link: "/Configuracion/Usuarios" },
      { label: "Notificaciones", link: "/Configuracion/Notificaciones" },
      { label: "Datos", link: "/Configuracion/Datos" },
    ],
  },
  {
    label: "Tickets",
    icon: <TicketsIcon />,
    link: "/Tickets",
  },
  {
    label: "VRT Store",
    icon: <PhoneIphone />,
    link: "/VRT-Store-upload",
  },
  {
    label: "Reenvio Correos",
    icon: <MailIcon />,
    link: "/Reenvio-correos",
  },
  {
    label: "VRT Store 2",
    icon: <PhoneIphone />,
    link: "/VRT-Store-download",
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

  const handleToggle = (label: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderMenuItems = (items: typeof menuItems, level = 0) =>
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
            sx={{ pl: level * 2 }}
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
              {renderMenuItems(item?.children, level + 1)}
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
