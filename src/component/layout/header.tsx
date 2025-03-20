import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import flagMexico from "@/assets/images/flag-mexico.png";
import flagColombia from "@/assets/images/flag-colombia.png";
import flagArgentina from "@/assets/images/flag-argentina.png";
import flagChile from "@/assets/images/flag-chile.png";

interface HeaderProps {
  togglerDrawer: () => void;
  setSelectedFlag: (value: string) => void;
  selectedFlag: string;
}

type Country = {
  name: string;
  emoji: string;
};

const Header: React.FC<HeaderProps> = ({
  togglerDrawer,
  setSelectedFlag,
  selectedFlag,
}) => {
  const [menuAuth, setMenuAuth] = useState<null | HTMLElement>(null);
  const [menuFalg, setMenuFlag] = useState<null | HTMLElement>(null);
  const { data: session } = useSession();
  const open = Boolean(menuFalg);

  const handleClickFlag = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setMenuFlag(event.currentTarget);
  };

  const handleCloseFlag = (flag: string | null): void => {
    if (flag) {
      setSelectedFlag(flag);
    }
    setMenuFlag(null);
  };

  const countries: Country[] = [
    { name: "México", emoji: "mexico" },
    { name: "Colombia", emoji: "colombia" },
    { name: "Chile", emoji: "chile" },
    { name: "Argentina", emoji: "argentina" },
  ];

  const contrySelected = () => {
    switch (selectedFlag) {
      case "mexico":
        return (
          <Image src={flagMexico} alt={selectedFlag} width={30} height={30} />
        );
      case "chile":
        return (
          <Image src={flagChile} alt={selectedFlag} width={30} height={30} />
        );
      case "argentina":
        return (
          <Image
            src={flagArgentina}
            alt={selectedFlag}
            width={30}
            height={30}
          />
        );
      case "colombia":
        return (
          <Image src={flagColombia} alt={selectedFlag} width={30} height={30} />
        );

      default:
        break;
    }
  };
  const handleMenuAuth = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAuth(event.currentTarget);
  };

  const handleCloseAuth = () => {
    setMenuAuth(null);
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
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            togglerDrawer();
          }}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, pt: 1, lineHeight: 1 }}
        >
          Field Costumer Service
        </Typography>

        <Box component="div">
          {session?.user?.name || ""}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuAuth}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuAuth}
            open={Boolean(menuAuth)}
            onClose={handleCloseAuth}
          >
            <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
          </Menu>
          <Button
            variant="text"
            color="secondary"
            onClick={handleClickFlag}
            aria-controls={open ? "flag-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {contrySelected()}
          </Button>
          <Menu
            id="flag-menu"
            anchorEl={menuFalg}
            open={open}
            onClose={() => handleCloseFlag(null)}
          >
            {countries.map((country) => (
              <MenuItem
                key={country.name}
                onClick={() => handleCloseFlag(country.emoji)}
              >
                {country.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
