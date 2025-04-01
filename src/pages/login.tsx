import React, { useState } from "react";
import { useRouter } from "next/router";
import LoginCont from "@/container/loginCont";
import AlertComp from "@/component/common/alert";
import { AlertProps } from "@mui/material";
import Loader from "@/component/common/loader";
import { sha256 } from "js-sha256";
import axios from "axios";

interface LoginValues {
  email: string;
  password: string;
}

interface AlertCompProps {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onLogin = async (values: LoginValues): Promise<void> => {
    setLoading(true);
    if (!values.email || !values.password) {
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Por favor, completa todos los campos.",
      });
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/login", {
        email: values.email,
        password: sha256.hex(values?.password || "").toLocaleUpperCase(),
      });

      router.push("/dashboard"); // Redirigir después del inicio de sesión exitoso
    } catch (error) {
      console.error("Error during login:", error);
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Error desconocido",
      });
      setShowAlert(true);
      setLoading(false);
    }
  };

  // Mientras se carga la sesión
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {showAlert && (
        <AlertComp
          severity={alertInfo.severity}
          title={alertInfo.title}
          message={alertInfo.message}
          show={showAlert}
          handleShow={setShowAlert}
        />
      )}
      <LoginCont
        onLogin={onLogin}
        setAlertInfo={setAlertInfo}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default Login;
