import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "@/styles/globals.css";
import Loader from "@/component/common/loader";
import localFont from "next/font/local";

const calibre = localFont({
  src: [
    {
      path: "./Calibre/Calibre-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Calibre/Calibre-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Calibre/Calibre-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Calibre/Calibre-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

const theme = createTheme({
  typography: { fontFamily: "Calibre, Arial" },
  palette: {
    primary: {
      main: "#fe5b1b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>FCS</title>
        </Head>
        {loading ? (
          <Loader />
        ) : (
          <Component {...pageProps} className={calibre.className} />
        )}
      </ThemeProvider>
    </>
  );
};

export default MyApp;
