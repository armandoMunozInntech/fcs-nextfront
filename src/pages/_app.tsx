"use client";
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const calibre = localFont({
  src: [
    { path: "./Calibre/Calibre-Regular.woff2", weight: "400", style: "normal" },
    {
      path: "./Calibre/Calibre-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    { path: "./Calibre/Calibre-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "./Calibre/Calibre-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

const theme = createTheme({
  typography: { fontFamily: "Calibre, Arial, sans-serif" },
  palette: {
    primary: { main: "#fe5b1b", contrastText: "#ffffff" },
    secondary: { main: "#000000", contrastText: "#ffffff" },
  },
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {getLayout(
          <>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
              <link rel="icon" href="/logo_vertiv_principal.png" sizes="any" />
              <title>FCS</title>
            </Head>
            <CssBaseline />
            <Component {...pageProps} className={calibre.className} />
          </>
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MyApp;
