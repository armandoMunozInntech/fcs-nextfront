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
      { label: "FCS Field Customer", link: "/FCS" },
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
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  return (
    <Box>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleToggle(item.label)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.children &&
                    (openSubMenu === item.label ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </ListItem>
              {item.children && (
                <Collapse
                  in={openSubMenu === item.label}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.label} disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => {
                            if (isSmallScreen) {
                              setClose(false);
                            }
                            router.push(child.link);
                          }}
                        >
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MenuLeft;
