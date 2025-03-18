import React, { useState } from "react";
import { useRouter } from "next/router";
import LoginCont from "@/container/loginCont";
import AlertComp from "@/component/common/alert";
import { AlertProps } from "@mui/material";
import Loader from "@/component/common/loader";
import { signIn } from "next-auth/react";

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
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Evita la redirección automática
      });
      console.log("result", result);

      // Si el login falla, mostrar el mensaje de error en la alerta
      if (result?.error) {
        setAlertInfo({
          severity: "error",
          title: "Error",
          message: result.error || "Error desconocido",
        });
        setShowAlert(true);
      } else {
        setAlertInfo({
          severity: "success",
          title: "Éxito",
          message: "Inicio de sesión exitoso",
        });
        setShowAlert(true);
        router.push("/dashboard"); // Redirigir después del inicio de sesión exitoso
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Error desconocido",
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Login;
