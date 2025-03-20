import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  Container,
  CircularProgress,
  Collapse,
} from "@mui/material";
import Header from "./header";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

interface DashboardLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState("mexico"); // México como predeterminado

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
  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        togglerDrawer={togglerDrawer}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
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
          {drawer}
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
