import React, { useRef, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OutputIcon from "@mui/icons-material/Output";
import Image from "next/image";
import flagMexico from "@/assets/images/flag-mexico.png";
import flagColombia from "@/assets/images/flag-colombia.png";
import flagArgentina from "@/assets/images/flag-argentina.png";
import flagChile from "@/assets/images/flag-chile.png";
import { signOut, useSession } from "next-auth/react";
import logoVertiv from "@/assets/logo_vertiv_principal.png";
import { useRouter } from "next/navigation";
import { useCloseOnClickOutside } from "@/utils/useCloseOnClickOutside";

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
  setSelectedFlag: (value: string) => void;
  selectedFlag: string;
  menuItems?: MenuItemProps[] | null; // Lista dinámica de menús
  setClose: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  togglerDrawer,
  setSelectedFlag,
  selectedFlag,
  menuItems,
  setClose,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { data: session } = useSession();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuAuth, setMenuAuth] = useState<null | HTMLElement>(null);
  const [menuFlag, setMenuFlag] = useState<null | HTMLElement>(null);
  const [menuDin, setMenuDin] = useState<boolean>(false);
  const openFlagMenu = Boolean(menuFlag);
  const [menuOptions, setMenuOptions] = useState<optionItemProps[] | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleFlagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuFlag(event.currentTarget);
  };

  const handleFlagClose = (flag: string | null) => {
    if (flag) setSelectedFlag(flag);
    setMenuFlag(null);
  };

  const handleMenuDinClick = () => {
    setMenuDin(!menuDin);
  };
  useCloseOnClickOutside(menuRef, () => {
    setMenuDin(false);
    setMenuOptions(null);
  });

  const countries = [
    { name: "México", emoji: "mexico" },
    { name: "Colombia", emoji: "colombia" },
    { name: "Chile", emoji: "chile" },
    { name: "Argentina", emoji: "argentina" },
  ];

  const flagImage = () => {
    switch (selectedFlag) {
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

  const menuOptionSM = () => {
    return (
      <Collapse in={!!menuOptions} unmountOnExit>
        <Grid2
          direction={isSmallScreen ? "column" : "row"}
          justifyContent="center"
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            alignItems: "center",
            maxWidth: { sm: "auto", lg: "100%" },
          }}
        >
          {menuOptions?.map((subItem: optionItemProps, subIndex: number) => (
            <Grid2 key={subIndex}>
              <Button
                variant="text"
                color="secondary"
                sx={{
                  width: "max-content",
                  borderTop: "solid 1px",
                  borderRadius: "0px",
                }}
                onClick={() => {
                  subItem.action();
                  setMenuOptions(null);
                  setMenuDin(false);
                }}
              >
                {subItem.label}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </Collapse>
    );
  };

  const MenuDinamico = () => {
    return (
      <Grid2
        direction="row"
        justifyContent="center"
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          alignItems: "center",
          maxWidth: { sm: "auto", lg: "100%" },
          mt: 0,
        }}
      >
        {menuItems?.map((item, index) => (
          <Button
            key={index}
            variant="text"
            color="secondary"
            sx={{ width: "max-content" }}
            onClick={() => {
              setMenuOptions(item.options || null);
              if (item.action) {
                item?.action();
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Grid2>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
        borderImage:
          "linear-gradient(to right,#fb9500 25%, #fe5b1b 50%, #b10081 75%, #0000e7 100%) 1",
        borderWidth: "3px",
        borderStyle: "solid",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
      }}
      ref={menuRef}
    >
      <Toolbar>
        <Grid2
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "stretch",
            minWidth: "100%",
          }}
        >
          <Grid2
            direction="row"
            sx={{
              justifyContent: "flex-start",
              width: "fit-content",
              display: "flex",
            }}
          >
            {/* Botón de menú lateral */}
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
            {/* Título */}
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                pt: 2,
                lineHeight: 1,
                width: "auto",
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
          </Grid2>
          {menuItems && (
            <Grid2>
              {/* Menú dinámico */}
              {isSmallScreen ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuDinClick}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Grid2
                  direction="row"
                  sx={{
                    display: "flex",
                    gap: 1,
                    pt: 1,
                    overflowX: "auto",
                    alignItems: "center",
                    maxWidth: { sm: "auto", lg: "100%" },
                    mt: 0,
                  }}
                >
                  <MenuDinamico />
                </Grid2>
              )}
            </Grid2>
          )}
          <Grid2 direction="row">
            {/* Información de sesión y bandera */}
            <Box>
              <Button
                size="large"
                aria-label="account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setMenuAuth(event.currentTarget)}
                color="inherit"
              >
                {!isSmallScreen && session?.user?.name ? (
                  <Typography variant="body1" textTransform="capitalize">
                    {session?.user?.name.toLocaleLowerCase()} &nbsp;
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
                <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
              </Menu>

              <Button
                variant="text"
                color="secondary"
                onClick={handleFlagClick}
                aria-controls={openFlagMenu ? "flag-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openFlagMenu ? "true" : undefined}
              >
                {flagImage()}
              </Button>
              <Menu
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
              </Menu>
            </Box>
          </Grid2>
          {isSmallScreen && (
            <Grid2
              size={12}
              direction={isSmallScreen ? "column" : "row"}
              sx={{
                display: "flex",
                gap: 1,
                pt: 1,
                overflowX: "auto",
                alignItems: "center",
                maxWidth: { sm: "auto", lg: "100%" },
              }}
            >
              <Collapse in={menuDin} unmountOnExit>
                <Grid2
                  size={12}
                  direction="row"
                  sx={{
                    display: "flex",
                    gap: 1,
                    pt: 1,
                    overflowX: "auto",
                    alignItems: "center",
                  }}
                >
                  <MenuDinamico />
                </Grid2>
              </Collapse>
            </Grid2>
          )}
          {menuOptions && (
            <Grid2
              size={12}
              direction={isSmallScreen ? "column" : "row"}
              justifyContent="center"
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                alignItems: "center",
                maxWidth: { sm: "auto", lg: "100%" },
              }}
            >
              {menuOptionSM()}
            </Grid2>
          )}
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
