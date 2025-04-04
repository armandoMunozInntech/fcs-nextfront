import React, { useState } from "react";
import { Container, Grid2, useTheme } from "@mui/material";
import IniciarSesion from "@/component/login/iniciarSesion";
import vertivBackground from "@/assets/vertivBackground.png";
import logoFCS from "@/assets/logoFCS.png";
import Image from "next/image";
import ForgotPswd from "@/component/login/forgotPswd";
import { LoginContProps } from "@/types/login";

const LoginCont: React.FC<LoginContProps> = ({
  onLogin,
  setAlertInfo,
  setShowAlert,
}) => {
  const theme = useTheme();
  const [forgotPswd, setForgotPswd] = useState(false);
  return (
    <Container
      component="main"
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        maxWidth: "100% !important", // Tamaño máximo para pantallas grandes
        [theme.breakpoints.down("md")]: {
          maxWidth: "80rem", // Tamaño máximo para tablets
        },
        [theme.breakpoints.down("sm")]: {
          maxWidth: "40rem", // Tamaño máximo para móviles
        },
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${vertivBackground.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        alignContent: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid2 container justifyContent="center">
        <Grid2
          size={{ xs: 11, md: 5, sm: 10, xl: 5 }}
          sx={{
            padding: 4,
            display: "Flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            marginLeft: "auto",
            marginRight: "auto",
            borderImage:
              "linear-gradient(to right, #fe5b1b 0%, #b10081 50%, #0000e7 100%) 1",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <Grid2
            display="flex"
            justifyContent="center"
            alignItems="center"
            size={12}
            marginBottom={3}
          >
            <Image
              src={logoFCS}
              style={{
                width: "auto",
                height: "50px",
              }}
              alt={""}
            />
          </Grid2>
          <Grid2 size={12} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            {forgotPswd ? (
              <ForgotPswd
                setForgotPswd={setForgotPswd}
                setAlertInfo={setAlertInfo}
                setShowAlert={setShowAlert}
              />
            ) : (
              <IniciarSesion onLogin={onLogin} setForgotPswd={setForgotPswd} />
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default LoginCont;
