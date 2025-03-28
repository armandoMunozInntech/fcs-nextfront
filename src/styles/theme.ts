import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#fe5b1b", contrastText: "#ffffff" },
    secondary: { main: "#000000", contrastText: "#ffffff" },
  },
  typography: { fontFamily: "Calibre, Arial, sans-serif" },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fe5b1b", contrastText: "#ffffff" },
    secondary: { main: "#ffffff", contrastText: "#000000" },
  },
  typography: { fontFamily: "Calibre, Arial, sans-serif" },
});
