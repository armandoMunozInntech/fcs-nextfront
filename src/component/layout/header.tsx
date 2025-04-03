import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OutputIcon from "@mui/icons-material/Output";
import Image from "next/image";
import flagMexico from "@/assets/images/flag-mexico.png";
import flagColombia from "@/assets/images/flag-colombia.png";
import flagArgentina from "@/assets/images/flag-argentina.png";
import flagChile from "@/assets/images/flag-chile.png";
import logoVertiv from "@/assets/logo_vertiv_principal.png";
import { useRouter } from "next/navigation";
import { LightMode, ModeNight } from "@mui/icons-material";
import { getCookie } from "cookies-next";

interface optionItemProps {
  label: string;
  action: () => void;
}
interface MenuItemProps {
  label: string;
  options?: optionItemProps[]; // Opciones internas (submenús)
  action?: () => void; // Acción directa si no tiene submenús
}

interface HeaderProps {
  togglerDrawer: () => void;
  // setSelectedFlag: (value: string) => void;
  // selectedFlag: string;
  menuItems?: MenuItemProps[] | null; // Lista dinámica de menús
  setClose: (value: boolean) => void;
  title: string;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  togglerDrawer,
  // setSelectedFlag,
  // selectedFlag,
  setClose,
  title,
  toggleDarkMode,
  darkMode,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuAuth, setMenuAuth] = useState<null | HTMLElement>(null);
  // const [menuFlag, setMenuFlag] = useState<null | HTMLElement>(null);
  // const openFlagMenu = Boolean(menuFlag);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [pais, setPais] = useState<string | null>(null);

  useEffect(() => {
    const paisCookie = getCookie("pais");
    if (paisCookie) {
      setPais(paisCookie.toString().toLowerCase());
    }
    const cookieName = getCookie("name");
    if (cookieName) {
      setName(cookieName.toString());
    }
  }, []);

  const logout = async () => {
    await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  // const handleFlagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setMenuFlag(event.currentTarget);
  // };

  // const handleFlagClose = (flag: string | null) => {
  //   if (flag) setSelectedFlag(flag);
  //   setMenuFlag(null);
  // };

  // const countries = [
  //   { name: "México", emoji: "mexico" },
  //   { name: "Colombia", emoji: "colombia" },
  //   { name: "Chile", emoji: "chile" },
  //   { name: "Argentina", emoji: "argentina" },
  // ];

  const flagImage = () => {
    // switch (selectedFlag) {
    switch (pais) {
      case "mexico":
        return <Image src={flagMexico} alt="mexico" width={30} height={30} />;
      case "colombia":
        return (
          <Image src={flagColombia} alt="colombia" width={30} height={30} />
        );
      case "argentina":
        return (
          <Image src={flagArgentina} alt="argentina" width={30} height={30} />
        );
      case "chile":
        return <Image src={flagChile} alt="chile" width={30} height={30} />;
      default:
        return null;
    }
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={[
        () => ({
          color: "#000000",
          backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderImage:
            "linear-gradient(to right, #fb9500 25%, #fe5b1b 50%, #b10081 75%, #0000e7 100%) 1",
          borderWidth: "3px",
          borderStyle: "solid",
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
        }),
        (theme) =>
          theme.applyStyles("dark", {
            backgroundColor: "black",
            color: "white",
          }),
      ]}
      ref={menuRef}
    >
      <Toolbar>
        {/* Botón de menú lateral */}
        <Box
          sx={{
            display: "grid",
            gridRow: "1",
            gridTemplateColumns: "repeat(3, 1fr)",
            width: "100%",
          }}
          alignItems="center"
        >
          <Box
            sx={{ gridColumn: "1" }}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={togglerDrawer}
              color="inherit"
            >
              <Image src={logoVertiv} alt="chile" width={20} height={20} />
            </IconButton>

            <Typography
              variant="h5"
              component="div"
              color="secondary"
              sx={{
                pt: 1,
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                if (isSmallScreen) {
                  setClose(false);
                }
                router.push("/dashboard");
              }}
            >
              {isSmallScreen ? "FCS" : "Field Customer Service"}
            </Typography>
          </Box>
          {/* Título */}
          <Typography
            variant={isSmallScreen ? "body1" : "h6"}
            component="p"
            color="primary"
            sx={{
              gridColumn: "2/3",
              display: "flex",
              justifyContent: "center",
              pt: 1,
              fontWeight: "bold",
              textAlign: "center",
            }}
            textTransform="uppercase"
          >
            {title}
          </Typography>

          {/* Información de sesión y bandera */}
          <Box
            sx={{ gridColumn: "3/3" }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              size="large"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setMenuAuth(event.currentTarget)}
              color="inherit"
            >
              {!isSmallScreen && name ? (
                <Typography
                  variant="body1"
                  textTransform="capitalize"
                  sx={{ pt: 1 }}
                >
                  {name}
                </Typography>
              ) : null}
              <OutputIcon />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={menuAuth}
              open={Boolean(menuAuth)}
              onClose={() => setMenuAuth(null)}
            >
              <MenuItem
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesión
              </MenuItem>
            </Menu>

            <Button
              variant="text"
              color="secondary"
              // onClick={handleFlagClick}
              // aria-controls={openFlagMenu ? "flag-menu" : undefined}
              // aria-haspopup="true"
              // aria-expanded={openFlagMenu ? "true" : undefined}
            >
              {flagImage()}
            </Button>
            {/* <Menu
              id="flag-menu"
              anchorEl={menuFlag}
              open={openFlagMenu}
              onClose={() => handleFlagClose(null)}
            >
              {countries.map((country) => (
                <MenuItem
                  key={country.name}
                  onClick={() => handleFlagClose(country.emoji)}
                >
                  {country.name}
                </MenuItem>
              ))}
            </Menu> */}
            <IconButton color="secondary" onClick={() => toggleDarkMode()}>
              {darkMode ? <LightMode /> : <ModeNight />}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
