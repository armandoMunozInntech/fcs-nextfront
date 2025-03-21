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

const menuItems = [
  {
    label: "FCS",
    icon: <HomeIcon />,
    children: [
      "FCS Field Customer",
      "SRC Refacciones",
      "Equipos",
      "Clientes",
      "EPP",
      "Portal Bestel",
      "Calendario Actividades",
    ],
  },
  {
    label: "Configuración",
    icon: <SettingsIcon />,
    children: ["Usuarios", "Notificaciones", "Datos"],
  },
  {
    label: "Tickets",
    icon: <TicketsIcon />,
  },
  {
    label: "VRT Store",
    icon: <PhoneIphone />,
  },
  {
    label: "Reenvio Correos",
    icon: <MailIcon />,
  },
  {
    label: "VRT Store 2",
    icon: <PhoneIphone />,
  },
];

const MenuLeft: React.FC = () => {
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
                      <ListItem key={child} disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          {/* <ListItemIcon>
                            <MailIcon />
                          </ListItemIcon> */}
                          <ListItemText primary={child} />
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
